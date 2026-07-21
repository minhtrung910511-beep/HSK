#!/bin/bash
# Auto-test matching - click 6 pairs to complete

extract_ref() {
  echo "$1" | grep "$2" | grep -oE 'ref e[0-9]+' | head -1 | sed 's/ref=//'
}

# Click Matching tab
SNAP=$(agent-browser snapshot -i 2>&1)
TAB_REF=$(extract_ref "$SNAP" '^- button "Ghép cặp"')
echo "Ghép cặp tab ref: @$TAB_REF"
[ -n "$TAB_REF" ] && agent-browser click "@$TAB_REF" 2>&1 | tail -1
sleep 1

# Click "Bắt đầu ghép cặp"
SNAP=$(agent-browser snapshot -i 2>&1)
START_REF=$(extract_ref "$SNAP" "Bắt đầu ghép cặp")
echo "Start ref: @$START_REF"
[ -n "$START_REF" ] && agent-browser click "@$START_REF" 2>&1 | tail -1
sleep 1

# Lấy snapshot để biết 12 ô (6 han + 6 vi)
SNAP=$(agent-browser snapshot -i 2>&1)
echo "$SNAP" | head -20

# Lấy ref của tất cả các nút ô (12 ô)
CELLS_REFS=$(echo "$SNAP" | grep -E '^- button' | grep -v -E "Trang chủ|Flashcard|Quiz|Ghép cặp|Open|Notifications|Bắt đầu|Làm lại|Chơi lại|Về trang" | grep -oE 'ref e[0-9]+' | sed 's/ref=//')
echo "Cell refs: $CELLS_REFS"

# Lấy text của từng ô
echo "--- Cells info ---"
echo "$SNAP" | grep -E '^- button' | grep -v -E "Trang chủ|Flashcard|Quiz|Ghép cặp|Open|Notifications|Bắt đầu|Làm lại|Chơi lại|Về trang"
