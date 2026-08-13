#!/usr/bin/env python3
"""Auto-restore vocab from Excel on dev server restart."""
import subprocess, sys, os

scripts = [
    "/home/z/my-project/scripts/gen-hsk1-vocab-v2.py",
    "/home/z/my-project/scripts/gen-hsk2-vocab.py",
]

for script in scripts:
    if not os.path.exists(script):
        print(f"[restore-vocab] Script not found: {script}, skipping")
        continue
    result = subprocess.run([sys.executable, script], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"[restore-vocab] STDERR:", result.stderr, file=sys.stderr)
