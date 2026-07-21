#!/bin/bash
# Auto-test quiz - dùng ref=eN (với dấu = giữa ref và eN)

extract_ref() {
  # Format: - button "text" [ref e4]  (char '=' between ref and e4)
  echo "$1" | grep "$2" | grep -oE 'ref=e[0-9]+' | head -1 | sed 's/ref=//'
}

# Click Quiz tab
SNAP=$(agent-browser snapshot -i 2>&1)
QUIZ_REF=$(extract_ref "$SNAP" '^- button "Quiz"')
echo "Quiz tab ref: @$QUIZ_REF"
[ -n "$QUIZ_REF" ] && agent-browser click "@$QUIZ_REF" 2>&1 | tail -1
sleep 1

# Click "Bắt đầu quiz"
SNAP=$(agent-browser snapshot -i 2>&1)
START_REF=$(extract_ref "$SNAP" "Bắt đầu quiz")
echo "Start button ref: @$START_REF"
[ -n "$START_REF" ] && agent-browser click "@$START_REF" 2>&1 | tail -1
sleep 1

# Run quiz auto
for i in {1..25}; do
  SNAP=$(agent-browser snapshot -i 2>&1)
  
  if echo "$SNAP" | grep -q "Xem kết quả"; then
    REF=$(extract_ref "$SNAP" "Xem kết quả")
    echo "Step $i: Click Xem kết quả @$REF"
    [ -n "$REF" ] && agent-browser click "@$REF" 2>&1 | tail -1
    sleep 1
    break
  fi
  
  if echo "$SNAP" | grep -q "Câu tiếp theo"; then
    REF=$(extract_ref "$SNAP" "Câu tiếp theo")
    echo "Step $i: Click Câu tiếp theo @$REF"
    [ -n "$REF" ] && agent-browser click "@$REF" 2>&1 | tail -1
    sleep 1
    continue
  fi
  
  LINE=$(echo "$SNAP" | grep -E '^- button "' | grep -v -E "Trang chủ|Flashcard|Quiz|Ghép cặp|Open|Notifications|Bắt đầu|Làm lại|Chơi lại|Về trang" | head -1)
  REF=$(echo "$LINE" | grep -oE 'ref=e[0-9]+' | head -1 | sed 's/ref=//')
  if [ -n "$REF" ]; then
    echo "Step $i: Click answer @$REF"
    agent-browser click "@$REF" 2>&1 | tail -1
    sleep 1
  else
    echo "Step $i: No button found"
    break
  fi
done

echo ""
echo "=== Final snapshot ==="
agent-browser snapshot -i 2>&1 | head -25
echo ""
echo "=== Errors ==="
agent-browser errors 2>&1 | tail -10
