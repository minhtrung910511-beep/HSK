"""Export vocab-data.ts sang Excel với 9 cột theo yêu cầu"""
import re
import sys
import os

XLSX_SKILL_DIR = "/home/z/my-project/skills/xlsx"
for sub in [XLSX_SKILL_DIR, os.path.join(XLSX_SKILL_DIR, "templates")]:
    if sub not in sys.path:
        sys.path.insert(0, sub)

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ===== Đọc vocab-data.ts =====
with open("/home/z/my-project/src/lib/vocab-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Parse TOPICS để lấy map id → name
topic_pattern = re.compile(
    r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"',
    re.DOTALL
)
topic_map = {}
for m in topic_pattern.finditer(content):
    topic_map[m.group(1)] = m.group(2)

# Parse VOCAB entries
vocab_pattern = re.compile(
    r'\{\s*id:\s*(\d+),\s*han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)",\s*pos:\s*"([^"]+)",\s*emoji:\s*"([^"]*)",\s*example:\s*"([^"]+)",\s*examplePinyin:\s*"([^"]+)",\s*exampleVi:\s*"([^"]+)",\s*topic:\s*"([^"]+)"\s*\}',
    re.DOTALL
)

words = []
for m in vocab_pattern.finditer(content):
    words.append({
        "id": int(m.group(1)),
        "han": m.group(2),
        "pinyin": m.group(3),
        "meaning": m.group(4),
        "pos": m.group(5),
        "emoji": m.group(6),
        "example": m.group(7),
        "examplePinyin": m.group(8),
        "exampleVi": m.group(9),
        "topic": m.group(10),
    })

# Sắp xếp theo topic (theo thứ tự trong TOPICS) rồi theo id
topic_order = list(topic_map.keys())
def sort_key(w):
    try:
        topic_idx = topic_order.index(w["topic"])
    except ValueError:
        topic_idx = 999
    return (topic_idx, w["id"])

words.sort(key=sort_key)

print(f"Tổng số từ: {len(words)}")
print(f"Số chủ đề: {len(topic_map)}")

# ===== Tạo Excel =====
wb = Workbook()
ws = wb.active
ws.title = "Từ vựng HSK1"

# Styles
header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
header_fill = PatternFill(start_color="7C3AED", end_color="7C3AED", fill_type="solid")
header_align = Alignment(horizontal="center", vertical="center", wrap_text=True)

cell_font = Font(name="Calibri", size=11)
cell_align = Alignment(horizontal="left", vertical="top", wrap_text=True)
center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)

thin_border = Border(
    left=Side(style="thin", color="E5E7EB"),
    right=Side(style="thin", color="E5E7EB"),
    top=Side(style="thin", color="E5E7EB"),
    bottom=Side(style="thin", color="E5E7EB"),
)

# Highlight cho top 3 từ mỗi chủ đề (nhẹ)
topic_colors = {
    "greetings": "FEE2E2",
    "pronouns": "FFEDD5",
    "family": "FED7AA",
    "numbers": "FEF3C7",
    "time": "D9F99D",
    "objects": "A7F3D0",
    "food": "BAE6FD",
    "body": "CFFAFE",
    "verbs": "BFDBFE",
    "adjectives": "DDD6FE",
    "places": "FBCFE8",
    "people": "C7D2FE",
    "misc": "E5E7EB",
}

# ===== Header =====
headers = [
    "STT",
    "Chủ đề",
    "Hán tự",
    "Pinyin",
    "Loại từ",
    "Nghĩa",
    "Ví dụ (Hán tự)",
    "Pinyin câu ví dụ",
    "Nghĩa câu ví dụ",
]
for col_idx, header in enumerate(headers, 1):
    cell = ws.cell(row=1, column=col_idx, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = header_align
    cell.border = thin_border

# ===== Data rows =====
for row_idx, w in enumerate(words, 2):
    topic_name = topic_map.get(w["topic"], w["topic"])
    row_data = [
        row_idx - 1,  # STT
        topic_name,
        w["han"],
        w["pinyin"],
        w["pos"],
        w["meaning"],
        w["example"],
        w["examplePinyin"],
        w["exampleVi"],
    ]
    
    # Màu nền nhẹ theo chủ đề
    bg_color = topic_colors.get(w["topic"], "FFFFFF")
    row_fill = PatternFill(start_color=bg_color, end_color=bg_color, fill_type="solid")
    
    for col_idx, value in enumerate(row_data, 1):
        cell = ws.cell(row=row_idx, column=col_idx, value=value)
        cell.font = cell_font
        cell.border = thin_border
        
        # Căn giữa cho STT, Hán tự, Pinyin, Loại từ
        if col_idx in [1, 3, 4, 5]:
            cell.alignment = center_align
        else:
            cell.alignment = cell_align
        
        # Bold cho Hán tự
        if col_idx == 3:
            cell.font = Font(name="Calibri", size=14, bold=True)
        
        # Italic cho pinyin
        if col_idx in [4, 8]:
            cell.font = Font(name="Calibri", size=11, italic=True)
        
        # Background color theo topic
        cell.fill = row_fill

# ===== Column widths =====
col_widths = {
    1: 6,    # STT
    2: 16,   # Chủ đề
    3: 14,   # Hán tự
    4: 18,   # Pinyin
    5: 14,   # Loại từ
    6: 28,   # Nghĩa
    7: 32,   # Ví dụ Hán
    8: 36,   # Pinyin ví dụ
    9: 36,   # Nghĩa ví dụ
}
for col_idx, width in col_widths.items():
    ws.column_dimensions[get_column_letter(col_idx)].width = width

# ===== Row heights =====
ws.row_dimensions[1].height = 32  # Header
for row_idx in range(2, len(words) + 2):
    ws.row_dimensions[row_idx].height = 36

# ===== Freeze pane =====
ws.freeze_panes = "A2"  # Freeze header

# ===== Auto filter =====
ws.auto_filter.ref = f"A1:I{len(words) + 1}"

# ===== Workbook metadata =====
wb.properties.creator = "Z.ai"
wb.properties.title = "Từ vựng HSK1 - Tổng hợp"
wb.properties.description = f"{len(words)} từ vựng HSK1 với pinyin, nghĩa, ví dụ - {len(topic_map)} chủ đề"

# ===== Save =====
output_path = "/home/z/my-project/download/tu-vung-hsk1.xlsx"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
wb.save(output_path)
print(f"\n✅ Đã lưu: {output_path}")
print(f"   {len(words)} dòng × {len(headers)} cột")
print(f"   File size: {os.path.getsize(output_path) / 1024:.1f} KB")
