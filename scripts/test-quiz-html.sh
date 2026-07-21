#!/bin/bash
# Auto quiz test - skip volume button (🔊) và các nút khác

for i in {1..30}; do
  SNAP=$(agent-browser snapshot -i 2>&1)

  if echo "$SNAP" | grep -qE "Xuất sắc|Tốt lắm|Cố lên|Cần luyện thêm"; then
    echo "Step $i: REACHED RESULT"
    break
  fi

  NEXT_LINE=$(echo "$SNAP" | grep -E "Câu tiếp theo|Xem kết quả" | head -1)
  if [ -n "$NEXT_LINE" ]; then
    REF_FULL=$(echo "$NEXT_LINE" | grep -oE 'ref.[a-z][0-9]+' | head -1)
    REF=$(echo "$REF_FULL" | sed 's/ref.//')
    echo "Step $i: Click next @$REF"
    [ -n "$REF" ] && agent-browser click "@$REF" 2>&1 | tail -1
    sleep 1
    continue
  fi

  # Tìm button answer - skip nav, action, và volume button (chỉ có icon 🔊)
  LINE=$(echo "$SNAP" | grep -E '^[[:space:]]*- button "' | grep -v -E "Trang chủ|Flashcard|Quiz|Ghép cặp|Open|Notifications|Bắt đầu|Làm lại|Chơi lại|Về trang|Câu tiếp|Xem kết" | grep -v '🔊' | head -1)
  REF_FULL=$(echo "$LINE" | grep -oE 'ref.[a-z][0-9]+' | head -1)
  REF=$(echo "$REF_FULL" | sed 's/ref.//')
  if [ -n "$REF" ]; then
    echo "Step $i: Answer @$REF"
    agent-browser click "@$REF" 2>&1 | tail -1
    sleep 1
  else
    echo "Step $i: No answer button"
    break
  fi
done

echo ""
echo "=== Final ==="
agent-browser snapshot -i 2>&1 | head -12
echo ""
echo "=== Errors ==="
agent-browser errors 2>&1 | tail -5
