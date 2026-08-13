#!/usr/bin/env python3
"""
Regenerate HSK1 vocab-data.ts VOCAB array from the 426-word Excel file.
Preserves the TOPICS list and type definitions at the top of the file.
"""
import openpyxl
import re
from pathlib import Path

INPUT_XLSX = "/home/z/my-project/upload/tu-vung-hsk1-mau_426-tu_dich-nghia-cau-chinh-xac.xlsx"
OUTPUT_TS = "/home/z/my-project/src/lib/vocab-data.ts"

TOPIC_MAP = {
    "Chào hỏi": "chao_hoi", "Giao tiếp": "giao_tiep", "Đại từ xưng hô": "ai_tu_xung_ho",
    "Từ để hỏi": "tu_e_hoi", "Thông tin cá nhân": "thong_tin_ca_nhan",
    "Giới thiệu bản thân": "gioi_thieu_ban_than", "Gia đình": "gia_inh",
    "Mối quan hệ": "moi_quan_he", "Nghề nghiệp": "nghe_nghiep",
    "Số lượng": "so_luong", "Lượng từ": "luong_tu", "Thời gian": "thoi_gian",
    "Phương tiện & Di chuyển": "phuong_tien_and_di_chuyen", "Đồ dùng": "o_dung",
    "Nhà cửa": "nha_cua", "Công nghệ": "cong_nghe", "Quần áo": "quan_ao",
    "Đồ ăn": "o_an", "Đồ uống": "o_uong", "Trái cây": "trai_cay",
    "Cơ thể": "co_the", "Sức khỏe": "suc_khoe", "Hành động": "hanh_ong",
    "Công việc": "cong_viec", "Học tập": "hoc_tap", "Trường học": "truong_hoc",
    "Địa điểm": "ia_iem", "Vị trí": "vi_tri", "Quốc gia": "quoc_gia",
    "Miêu tả": "mieu_ta", "Cảm xúc": "cam_xuc", "Thời tiết": "thoi_tiet",
    "Tiền bạc": "tien_bac", "Mua sắm": "mua_sam", "Ngữ pháp": "ngu_phap",
    "Ngôn ngữ": "ngon_ngu", "Giải trí": "giai_tri", "Thể thao": "the_thao",
    "Động vật": "ong_vat",
}

TOPIC_TO_POS = {
    "ai_tu_xung_ho": "Đại từ", "tu_e_hoi": "Đại từ", "luong_tu": "Lượng từ",
    "so_luong": "Số từ", "ngu_phap": "Trợ từ", "hanh_ong": "Động từ",
    "giao_tiep": "Động từ", "chao_hoi": "Thán từ", "cam_xuc": "Tính từ",
    "mieu_ta": "Tính từ", "thoi_tiet": "Tính từ", "suc_khoe": "Danh từ",
    "thoi_gian": "Danh từ", "tien_bac": "Danh từ", "o_dung": "Danh từ",
    "o_an": "Danh từ", "o_uong": "Danh từ", "trai_cay": "Danh từ",
    "co_the": "Danh từ", "cong_viec": "Danh từ", "nghe_nghiep": "Danh từ",
    "nha_cua": "Danh từ", "quan_ao": "Danh từ", "ia_iem": "Danh từ",
    "vi_tri": "Danh từ", "quoc_gia": "Danh từ", "ong_vat": "Danh từ",
    "phuong_tien_and_di_chuyen": "Danh từ", "hoc_tap": "Động từ",
    "truong_hoc": "Danh từ", "cong_nghe": "Danh từ", "mua_sam": "Động từ",
    "giai_tri": "Danh từ", "the_thao": "Danh từ", "ngon_ngu": "Danh từ",
    "thong_tin_ca_nhan": "Danh từ", "gioi_thieu_ban_than": "Động từ",
    "gia_inh": "Danh từ", "moi_quan_he": "Danh từ",
}


def escape(s):
    if s is None: return ""
    return str(s).strip().replace("\\", "\\\\").replace('"', '\\"')


def extract_radical(bộ_str):
    if not bộ_str: return ""
    s = str(bộ_str).strip()
    first = re.split(r"[\s+]", s, maxsplit=1)[0]
    return first if first else s


def main():
    wb = openpyxl.load_workbook(INPUT_XLSX, data_only=True)
    ws = wb["Từ vựng HSK1"]

    rows = []
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i == 0: continue
        if not row[1]: continue
        stt, han, bộ, gợi_nhớ, pinyin, nghĩa, chủ_đề, ví_dụ, ví_dụ_pinyin, ví_dụ_nghĩa = row
        topic_id = TOPIC_MAP.get(chủ_đề, "misc")
        pos = TOPIC_TO_POS.get(topic_id, "Danh từ")
        radical = extract_radical(bộ)
        rows.append({
            "id": len(rows) + 1,
            "han": escape(han), "pinyin": escape(pinyin), "meaning": escape(nghĩa),
            "pos": pos, "radical": escape(radical), "emoji": "",
            "example": escape(ví_dụ) if ví_dụ else f"{escape(han)}。",
            "examplePinyin": escape(ví_dụ_pinyin) if ví_dụ_pinyin else f"{escape(pinyin)}。",
            "exampleVi": escape(ví_dụ_nghĩa) if ví_dụ_nghĩa else f"{escape(nghĩa)}。",
            "topic": topic_id,
        })

    topic_counts = {}
    for r in rows:
        topic_counts[r["topic"]] = topic_counts.get(r["topic"], 0) + 1
    print(f"HSK1: {len(rows)} từ, {len(topic_counts)} chủ đề")

    existing = Path(OUTPUT_TS).read_text(encoding="utf-8")
    marker = "export const VOCAB: VocabWord[] = ["
    idx = existing.find(marker)
    end_idx = existing.find("];", idx)
    after_array = existing[end_idx + 2:]
    head = existing[:idx]

    vocab_lines = ["export const VOCAB: VocabWord[] = ["]
    for r in rows:
        radical_part = f' radical: "{r["radical"]}",' if r["radical"] else ""
        line = (
            f'  {{ id: {r["id"]}, han: "{r["han"]}", pinyin: "{r["pinyin"]}", '
            f'meaning: "{r["meaning"]}", pos: "{r["pos"]}",{radical_part} emoji: "", '
            f'example: "{r["example"]}", examplePinyin: "{r["examplePinyin"]}", '
            f'exampleVi: "{r["exampleVi"]}", topic: "{r["topic"]}" }},'
        )
        vocab_lines.append(line)
    vocab_lines.append("];")

    new_content = head + "\n".join(vocab_lines) + after_array
    Path(OUTPUT_TS).write_text(new_content, encoding="utf-8")
    print(f"Wrote: {OUTPUT_TS} ({len(new_content)} bytes)")


if __name__ == "__main__":
    main()
