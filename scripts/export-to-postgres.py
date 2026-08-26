#!/usr/bin/env python3
"""
Export dữ liệu từ SQLite local sang PostgreSQL cho Vercel deploy.
Tạo file SQL insert statements để import vào PostgreSQL.

Cách dùng:
1. Chạy script: python3 scripts/export-to-postgres.py
2. File output: /home/z/my-project/download/migrate-to-postgres.sql
3. Import vào PostgreSQL: psql $DATABASE_URL -f migrate-to-postgres.sql
"""
import sqlite3
import json
from datetime import datetime

SQLITE_DB = "/home/z/my-project/db/custom.db"
OUTPUT_SQL = "/home/z/my-project/download/migrate-to-postgres.sql"


def escape_sql_string(s):
    """Escape string cho PostgreSQL."""
    if s is None:
        return "NULL"
    s = str(s)
    s = s.replace("'", "''")  # Escape single quotes
    return f"'{s}'"


def format_timestamp(ts):
    """Convert SQLite timestamp (ms) sang PostgreSQL timestamp."""
    if ts is None:
        return "NULL"
    try:
        if isinstance(ts, (int, float)):
            if ts > 1e12:
                dt = datetime.fromtimestamp(ts / 1000)
            else:
                dt = datetime.fromtimestamp(ts)
            ts_str = dt.strftime("%Y-%m-%d %H:%M:%S.%f")
            return "'{}'::timestamp".format(ts_str)
        else:
            dt = datetime.fromisoformat(str(ts).replace('Z', ''))
            ts_str = dt.strftime("%Y-%m-%d %H:%M:%S.%f")
            return "'{}'::timestamp".format(ts_str)
    except:
        return "NOW()"


def main():
    import os
    os.makedirs("/home/z/my-project/download", exist_ok=True)

    conn = sqlite3.connect(SQLITE_DB)
    c = conn.cursor()

    lines = [
        "-- Migration script: SQLite → PostgreSQL",
        "-- Generated for Vercel deploy",
        "-- Run: psql $DATABASE_URL -f migrate-to-postgres.sql",
        "",
        "-- Xóa dữ liệu cũ (nếu có)",
        "TRUNCATE \"Score\", \"Session\", \"User\" CASCADE;",
        "",
        "-- Users",
    ]

    # Export Users
    c.execute("SELECT id, username, passwordHash, displayName, createdAt, updatedAt FROM User")
    users = c.fetchall()
    lines.append(f"-- {len(users)} users")
    for u in users:
        lines.append(
            f'INSERT INTO "User" ("id", "username", "passwordHash", "displayName", "createdAt", "updatedAt") VALUES '
            f"({escape_sql_string(u[0])}, {escape_sql_string(u[1])}, {escape_sql_string(u[2])}, "
            f"{escape_sql_string(u[3])}, {format_timestamp(u[4])}, {format_timestamp(u[5])});"
        )

    # Export Sessions
    lines.extend(["", "-- Sessions"])
    c.execute("SELECT id, userId, token, expiresAt, createdAt FROM Session")
    sessions = c.fetchall()
    lines.append(f"-- {len(sessions)} sessions")
    for s in sessions:
        lines.append(
            f'INSERT INTO "Session" ("id", "userId", "token", "expiresAt", "createdAt") VALUES '
            f"({escape_sql_string(s[0])}, {escape_sql_string(s[1])}, {escape_sql_string(s[2])}, "
            f"{format_timestamp(s[3])}, {format_timestamp(s[4])});"
        )

    # Export Scores
    lines.extend(["", "-- Scores"])
    c.execute("SELECT id, userId, module, score, detail, createdAt FROM Score")
    scores = c.fetchall()
    lines.append(f"-- {len(scores)} scores")
    for s in scores:
        lines.append(
            f'INSERT INTO "Score" ("id", "userId", "module", "score", "detail", "createdAt") VALUES '
            f"({escape_sql_string(s[0])}, {escape_sql_string(s[1])}, {escape_sql_string(s[2])}, "
            f"{s[3]}, {escape_sql_string(s[4])}, {format_timestamp(s[5])});"
        )

    lines.extend([
        "",
        "-- Done!",
        f"-- Total: {len(users)} users, {len(sessions)} sessions, {len(scores)} scores",
    ])

    with open(OUTPUT_SQL, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✓ Exported to: {OUTPUT_SQL}")
    print(f"  Users: {len(users)}")
    print(f"  Sessions: {len(sessions)}")
    print(f"  Scores: {len(scores)}")
    print(f"\nCách import vào PostgreSQL:")
    print(f"  psql $DATABASE_URL -f {OUTPUT_SQL}")

    conn.close()


if __name__ == "__main__":
    main()
