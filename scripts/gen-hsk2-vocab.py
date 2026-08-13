#!/usr/bin/env python3
"""Regenerate HSK2 vocab-data-hsk2.ts from Excel file with proper topic mapping."""
import openpyxl
from pathlib import Path

INPUT_XLSX = "/home/z/my-project/upload/HSK2 vocabularies.xlsx"
OUTPUT_TS = "/home/z/my-project/src/lib/vocab-data-hsk2.ts"

TOPIC_MAP = {
    "Công việc nhà máy": "cong_viec_nha_may", "Xã hội": "xa_hoi",
    "Hành động": "hanh_ong", "Giao tiếp": "giao_tiep", "Tình trạng": "tinh_trang",
    "Tâm lý": "tam_ly", "Đồ vật": "o_dung", "Ăn uống": "o_an", "Sự kiện": "su_kien",
    "Thời gian": "thoi_gian", "Liên từ": "ngu_phap", "Công việc": "cong_viec",
    "Địa điểm": "ia_iem", "Trừu tượng": "tru_tuong", "Quần áo": "quan_ao",
    "Giao dịch": "giao_dich", "Hoạt động": "hoat_dong", "Giáo từ": "giao_tu",
    "Trạng từ": "trang_tu", "Đại từ": "ai_tu_xung_ho", "Học tập": "hoc_tap",
    "Công nghệ": "cong_nghe", "Sức khỏe": "suc_khoe", "Sự cố": "su_co",
    "Nghệ thuật": "nghe_thuat", "Màu sắc": "mau_sac", "Môn học": "mon_hoc",
    "Vị giác": "vi_giac", "Thực phẩm": "thuc_pham", "Trạng thái": "trang_thai",
    "Gia vị": "gia_vi", "Động vật": "ong_vat", "Gia đình": "gia_inh",
}


def escape(s):
    if s is None: return ""
    return str(s).strip().replace("\\", "\\\\").replace('"', '\\"')


def main():
    wb = openpyxl.load_workbook(INPUT_XLSX, data_only=True)
    ws = wb["Từ vựng HSK2"]

    rows = []
    unknown = set()
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i == 0: continue
        if not row[2]: continue
        stt, topic_vi, han, pinyin, pos, meaning, example, example_pinyin, example_vi = row
        topic_id = TOPIC_MAP.get(topic_vi)
        if not topic_id:
            unknown.add(topic_vi)
            topic_id = "misc"
        rows.append({
            "id": len(rows) + 1,
            "han": escape(han), "pinyin": escape(pinyin), "meaning": escape(meaning),
            "pos": escape(pos) or "Danh từ",
            "example": escape(example) if example else escape(han) + "。",
            "examplePinyin": escape(example_pinyin) if example_pinyin else escape(pinyin) + "。",
            "exampleVi": escape(example_vi) if example_vi else escape(meaning) + "。",
            "topic": topic_id,
        })

    if unknown:
        print(f"WARNING: Unknown topics: {unknown}")

    topic_counts = {}
    for r in rows:
        topic_counts[r["topic"]] = topic_counts.get(r["topic"], 0) + 1
    print(f"HSK2: {len(rows)} từ, {len(topic_counts)} chủ đề")

    lines = [f"// HSK2 Vocabulary Data - {len(rows)} từ vựng HSK 2.0, {len(topic_counts)} chủ đề"]
    lines.append("")
    lines.append('import { VocabWord, TopicId } from "./vocab-data";')
    lines.append("")
    lines.append("export const VOCAB_HSK2: VocabWord[] = [")
    for r in rows:
        line = (
            f'  {{ id: {r["id"]}, han: "{r["han"]}", pinyin: "{r["pinyin"]}", '
            f'meaning: "{r["meaning"]}", pos: "{r["pos"]}", emoji: "", '
            f'example: "{r["example"]}", examplePinyin: "{r["examplePinyin"]}", '
            f'exampleVi: "{r["exampleVi"]}", topic: "{r["topic"]}" }},'
        )
        lines.append(line)
    lines.append("];")
    lines.append("")
    lines.append("export const TOTAL_WORDS_HSK2 = VOCAB_HSK2.length;")
    lines.append("")

    Path(OUTPUT_TS).write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote: {OUTPUT_TS}")


if __name__ == "__main__":
    main()
