#!/bin/bash
# Auto-restore vocab data nếu bị revert
VOCAB_FILE="/home/z/my-project/src/lib/vocab-data.ts"
WORD_COUNT=$(grep -c "id:" "$VOCAB_FILE" 2>/dev/null || echo "0")

if [ "$WORD_COUNT" -lt 400 ]; then
    echo "[$(date)] Vocab data bị revert ($WORD_COUNT từ). Đang restore..."
    cd /home/z/my-project
    python3 scripts/restore-vocab.py 2>/dev/null || true
    echo "[$(date)] Restore done."
fi
