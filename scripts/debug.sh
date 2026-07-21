#!/bin/bash
# Debug version

for i in 1; do
  SNAP=$(agent-browser snapshot -i 2>&1)

  echo "=== SNAP length: ${#SNAP} ==="
  echo "=== First 5 button lines ==="
  echo "$SNAP" | grep -E '^[[:space:]]*- button' | head -5
  echo ""
  echo "=== Filter attempt ==="
  RESULT=$(echo "$SNAP" | grep -E '^[[:space:]]*- button' | grep -v -E "Trang chủ|Flashcard|Quiz|Ghép cặp|Open|Notifications|Bắt đầu|Làm lại|Chơi lại|Về trang|Câu tiếp|Xem kết" | head -1)
  echo "Result: [$RESULT]"
  REF=$(echo "$RESULT" | grep -oE 'ref e[0-9]+' | head -1 | sed 's/ref=//')
  echo "REF: [$REF]"
done
