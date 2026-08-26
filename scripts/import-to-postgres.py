#!/usr/bin/env python3
"""
Import data from SQLite local DB to PostgreSQL (Neon).
Reads from SQLite and inserts directly into PostgreSQL using psycopg2.
"""
import sqlite3
import psycopg2
from datetime import datetime
import os

SQLITE_DB = "/home/z/my-project/db/custom.db"
PG_URL = os.environ.get("DATABASE_URL", "")

if not PG_URL or not PG_URL.startswith("postgresql"):
    PG_URL = "postgresql://neondb_owner:npg_QT6BbpaNq2Rs@ep-crimson-sky-az5f35av-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

def convert_ts(ts):
    if ts is None:
        return None
    try:
        if isinstance(ts, (int, float)):
            if ts > 1e12:
                return datetime.fromtimestamp(ts / 1000)
            return datetime.fromtimestamp(ts)
        return datetime.fromisoformat(str(ts).replace('Z', ''))
    except:
        return datetime.now()

def main():
    # Connect to SQLite
    sconn = sqlite3.connect(SQLITE_DB)
    sc = sconn.cursor()

    # Connect to PostgreSQL
    print(f"Connecting to PostgreSQL...")
    pconn = psycopg2.connect(PG_URL)
    pc = pconn.cursor()

    # Clear existing data (in case of re-run)
    print("Clearing existing data...")
    pc.execute('TRUNCATE "Score", "Session", "User" CASCADE;')
    pconn.commit()

    # Import Users
    sc.execute("SELECT id, username, passwordHash, displayName, createdAt, updatedAt FROM User")
    users = sc.fetchall()
    print(f"Importing {len(users)} users...")
    for u in users:
        pc.execute(
            'INSERT INTO "User" ("id", "username", "passwordHash", "displayName", "createdAt", "updatedAt") VALUES (%s, %s, %s, %s, %s, %s)',
            (u[0], u[1], u[2], u[3], convert_ts(u[4]), convert_ts(u[5]))
        )
    pconn.commit()
    print(f"  ✓ {len(users)} users imported")

    # Import Sessions
    sc.execute("SELECT id, userId, token, expiresAt, createdAt FROM Session")
    sessions = sc.fetchall()
    print(f"Importing {len(sessions)} sessions...")
    for s in sessions:
        pc.execute(
            'INSERT INTO "Session" ("id", "userId", "token", "expiresAt", "createdAt") VALUES (%s, %s, %s, %s, %s)',
            (s[0], s[1], s[2], convert_ts(s[3]), convert_ts(s[4]))
        )
    pconn.commit()
    print(f"  ✓ {len(sessions)} sessions imported")

    # Import Scores
    sc.execute("SELECT id, userId, module, score, detail, createdAt FROM Score")
    scores = sc.fetchall()
    print(f"Importing {len(scores)} scores...")
    for s in scores:
        pc.execute(
            'INSERT INTO "Score" ("id", "userId", "module", "score", "detail", "createdAt") VALUES (%s, %s, %s, %s, %s, %s)',
            (s[0], s[1], s[2], float(s[3]), s[4], convert_ts(s[5]))
        )
    pconn.commit()
    print(f"  ✓ {len(scores)} scores imported")

    # Verify
    pc.execute('SELECT COUNT(*) FROM "User"')
    u_count = pc.fetchone()[0]
    pc.execute('SELECT COUNT(*) FROM "Session"')
    s_count = pc.fetchone()[0]
    pc.execute('SELECT COUNT(*) FROM "Score"')
    sc_count = pc.fetchone()[0]

    print(f"\n✅ Migration complete!")
    print(f"  PostgreSQL now has: {u_count} users, {s_count} sessions, {sc_count} scores")

    # Show top users
    pc.execute("""
        SELECT "displayName", COUNT(*) as plays, SUM(score) as total
        FROM "Score" s JOIN "User" u ON s."userId" = u.id
        GROUP BY "userId" ORDER BY total DESC LIMIT 5
    """)
    print("\nTop 5 users:")
    for r in pc.fetchall():
        print(f"  {r[0]}: {r[1]} plays, {float(r[2]):.1f} pts")

    sconn.close()
    pconn.close()

if __name__ == "__main__":
    main()
