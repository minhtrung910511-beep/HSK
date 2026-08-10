#!/usr/bin/env python3
"""Restore 147 từ mới + 40 chủ đề từ file Excel"""
import openpyxl, re, shutil, sys

VOCAB_FILE = "/home/z/my-project/src/lib/vocab-data.ts"
EXCEL_FILE = "/home/z/my-project/upload/Phú Tổng hợp từ vựng lớp HK1.xlsx"

try:
    wb = openpyxl.load_workbook(EXCEL_FILE, data_only=True)
    ws = wb["Từ vựng"]
except:
    print("Cannot read Excel file")
    sys.exit(1)

excel_words = []
current_topic = "Chào hỏi"
current_lesson = "Mở đầu"
for row in ws.iter_rows(min_row=2, values_only=True):
    stt, han, pinyin, meaning, topic, lesson = row[0], row[1], row[2], row[3], row[4], row[5]
    if topic: current_topic = str(topic).strip()
    if lesson: current_lesson = str(lesson).strip()
    if han and str(han).strip() and pinyin and meaning:
        excel_words.append({"han": str(han).strip(), "pinyin": str(pinyin).strip(), "meaning": str(meaning).strip(), "topic": current_topic, "lesson": current_lesson})

import unicodedata as ud
def make_id(name):
    nfkd = ud.normalize('NFKD', name)
    a = ''.join(c for c in nfkd if not ud.combining(c))
    a = a.replace(' ', '_').replace('&', 'and').replace('(', '').replace(')', '').replace('/', '_')
    return re.sub(r'[^a-zA-Z0-9_]', '', a).lower()

topic_map = {}
for w in excel_words:
    if w["topic"] not in topic_map:
        topic_map[w["topic"]] = make_id(w["topic"])

with open(VOCAB_FILE, "r", encoding="utf-8") as f:
    content = f.read()

existing_han = set(re.findall(r'han:\s*"([^"]+)"', content))
existing_ids = [int(m.group(1)) for m in re.finditer(r'\{\s*id:\s*(\d+)', content)]
max_id = max(existing_ids) if existing_ids else 279

def normalize(s): return re.sub(r'\s+', '', s.lower())
for w in excel_words:
    if w["han"] in existing_han:
        new_tid = topic_map.get(w["topic"], "misc")
        pattern = re.compile(r'(han:\s*"' + re.escape(w["han"]) + r'",[^}]*?topic:\s*")([^"]+)(")', re.DOTALL)
        m = pattern.search(content)
        if m and m.group(2) != new_tid:
            content = content[:m.start()] + m.group(1) + new_tid + m.group(3) + content[m.end():]
        pattern2 = re.compile(r'(han:\s*"' + re.escape(w["han"]) + r'",\s*pinyin:\s*")([^"]+)(",\s*meaning:\s*")([^"]+)(")')
        m2 = pattern2.search(content)
        if m2 and (normalize(w["pinyin"]) != normalize(m2.group(2)) or normalize(w["meaning"]) != normalize(m2.group(4))):
            content = content[:m2.start()] + m2.group(1) + w["pinyin"] + m2.group(3) + w["meaning"] + m2.group(5) + content[m2.end():]

new_words = [w for w in excel_words if w["han"] not in existing_han]

def assign_pos(han, meaning):
    if any(v in han for v in ["看","听","说","写","读","做","来","去","坐","站","走","住","喜欢","想","爱","买","卖","工作","学习","教","认识","知道","会","能","吃","喝","问","答","叫","帮","介绍","打","接","送","带","拿","放","找","用","开","关","停","等","换","修","洗","穿","戴","脱","骑","准备","开始","结束","发现","解决","告诉","回答","觉得","希望","同意","拒绝","决定","记得","忘记","收拾","打扫","安排","参加","影响","发生","出现","变化","提高","降低","增加","减少","继续","停止","完成","成功","失败","上班","下班","加班","休息","上课","下课"]): return "Động từ"
    elif any(v in han for v in ["好","坏","大","小","多","少","高","热","冷","新","旧","漂亮","贵","便宜","快","慢","干净","脏","高兴","难过","累","饿","饱","渴","聪明","容易","难","对","错","深","浅","厚","薄","宽","窄","浓","淡","红","绿","黄","黑","白","蓝"]): return "Tính từ"
    elif any(v in han for v in ["吗","呢","的","了","吧","啊"]): return "Trợ từ"
    return "Danh từ"

lines = ["", "  // ===== TỪ VỰNG BỔ SUNG TỪ FILE PHÚ (40 chủ đề) ====="]
current_t = None
for i, w in enumerate(new_words):
    new_id = max_id + 1 + i
    if w["topic"] != current_t:
        lines.append(f"  // --- {w['topic']} ---")
        current_t = w["topic"]
    esc = lambda s: s.replace('\\','\\\\').replace('"','\\"')
    tid = topic_map.get(w["topic"], "misc")
    pos = assign_pos(w["han"], w["meaning"])
    line = f'  {{ id: {new_id}, han: "{esc(w["han"])}", pinyin: "{esc(w["pinyin"])}", meaning: "{esc(w["meaning"])}", pos: "{pos}", emoji: "", example: "{esc(w["han"])}。", examplePinyin: "{esc(w["pinyin"])}。", exampleVi: "{esc(w["meaning"])}。", topic: "{tid}" }},'
    lines.append(line)

new_block = "\n".join(lines)
insert = re.compile(r'(\n\];\s*\n\s*\n// ===== Helpers)', re.MULTILINE)
m = insert.search(content)
if m:
    content = content[:m.start()] + new_block + m.group(1) + content[m.end():]

# Fix unescaped quotes
flines = content.split('\n')
fixed = []
for line in flines:
    if 'meaning: "' in line:
        idx = line.index('meaning: "') + 9
        rest = line[idx:]
        for i2, c in enumerate(rest):
            if c == '"' and (i2 == 0 or rest[i2-1] != '\\'):
                after = rest[i2+1:]
                if '"' in after.split(',')[0]:
                    val = rest[:i2]
                    fv = val.replace('"', '\\"').replace('\\\\"', '\\"')
                    line = line[:idx] + fv + rest[i2:]
                break
    fixed.append(line)
content = '\n'.join(fixed)

# Fix getTopic
content = content.replace('TOPICS.find(t => t.id === id)!', 'TOPICS.find(t => t.id === id) || TOPICS[0]')

# Add 40 topics if missing
topics_start = content.find("export const TOPICS: Topic[] = [")
topics_end = content.find("];", topics_start) + 2 if topics_start >= 0 else -1
if topics_start >= 0:
    existing_topics = re.findall(r'\{ id: "([^"]+)"', content[topics_start:topics_end])
    if len(existing_topics) < 40:
        topics_data = [
            ("chao_hoi","Chào hỏi","\U0001F44B","from-rose-400 to-pink-400"),
            ("giao_tiep","Giao tiếp","\U0001F4AC","from-pink-400 to-rose-400"),
            ("ai_tu_xung_ho","Đại từ xưng hô","\U0001F9D1","from-amber-400 to-orange-400"),
            ("tu_e_hoi","Từ để hỏi","\u2753","from-orange-400 to-amber-400"),
            ("thong_tin_ca_nhan","Thông tin cá nhân","\U0001FAAA","from-yellow-400 to-amber-400"),
            ("gioi_thieu_ban_than","Giới thiệu bản thân","\U0001F64B","from-amber-400 to-yellow-400"),
            ("gia_inh","Gia đình","\U0001F468\u200D\U0001F469\u200D\U0001F467","from-orange-400 to-red-400"),
            ("moi_quan_he","Mối quan hệ","\U0001F91D","from-red-400 to-orange-400"),
            ("nghe_nghiep","Nghề nghiệp","\U0001F4BC","from-lime-400 to-green-400"),
            ("so_luong","Số lượng","\U0001F522","from-green-400 to-lime-400"),
            ("luong_tu","Lượng từ","\U0001F4CA","from-emerald-400 to-teal-400"),
            ("thoi_gian","Thời gian","\U0001F550","from-teal-400 to-emerald-400"),
            ("thoi_gian_tuoi_tac","Thời gian (Tuổi tác)","\U0001F382","from-cyan-400 to-teal-400"),
            ("o_dung","Đồ dùng","\U0001F392","from-sky-400 to-cyan-400"),
            ("nha_cua","Nhà cửa","\U0001F3E0","from-blue-400 to-sky-400"),
            ("cong_nghe","Công nghệ","\U0001F4BB","from-indigo-400 to-blue-400"),
            ("quan_ao","Quần áo","\U0001F455","from-violet-400 to-indigo-400"),
            ("o_an","Đồ ăn","\U0001F35A","from-purple-400 to-violet-400"),
            ("o_uong","Đồ uống","\U0001F964","from-fuchsia-400 to-purple-400"),
            ("trai_cay","Trái cây","\U0001F34E","from-pink-400 to-fuchsia-400"),
            ("co_the","Cơ thể","\U0001F9E0","from-rose-400 to-pink-400"),
            ("suc_khoe","Sức khỏe","\U0001F3E5","from-amber-400 to-rose-400"),
            ("hanh_ong","Hành động","\U0001F3C3","from-yellow-400 to-amber-400"),
            ("cong_viec","Công việc","\U0001F4BC","from-lime-400 to-yellow-400"),
            ("hoc_tap","Học tập","\U0001F4DA","from-green-400 to-lime-400"),
            ("truong_hoc","Trường học","\U0001F3EB","from-emerald-400 to-green-400"),
            ("ia_iem","Địa điểm","\U0001F4CD","from-teal-400 to-emerald-400"),
            ("vi_tri","Vị trí","\U0001F9ED","from-cyan-400 to-teal-400"),
            ("quoc_gia","Quốc gia","\U0001F30D","from-sky-400 to-cyan-400"),
            ("phuong_tien_and_di_chuyen","Phương tiện & Di chuyển","\U0001F697","from-blue-400 to-sky-400"),
            ("mieu_ta","Miêu tả","\u2728","from-indigo-400 to-blue-400"),
            ("cam_xuc","Cảm xúc","\U0001F60A","from-violet-400 to-indigo-400"),
            ("thoi_tiet","Thời tiết","\U0001F324\uFE0F","from-purple-400 to-violet-400"),
            ("tien_bac","Tiền bạc","\U0001F4B0","from-fuchsia-400 to-purple-400"),
            ("mua_sam","Mua sắm","\U0001F6D2","from-pink-400 to-fuchsia-400"),
            ("ngu_phap","Ngữ pháp","\U0001F4DD","from-slate-400 to-gray-400"),
            ("ngon_ngu","Ngôn ngữ","\U0001F524","from-gray-400 to-slate-400"),
            ("giai_tri","Giải trí","\U0001F3AE","from-rose-400 to-amber-400"),
            ("the_thao","Thể thao","\u26BD","from-orange-400 to-yellow-400"),
            ("ong_vat","Động vật","\U0001F431","from-green-400 to-emerald-400"),
        ]
        # TopicId type
        type_start = content.index("export type TopicId =")
        type_end = content.index(";\n\nexport interface Topic")
        new_type = "export type TopicId =\n" + "\n".join([f'  | "{tid}"' for tid, _, _, _ in topics_data]) + '\n  | "misc"'
        content = content[:type_start] + new_type + content[type_end:]
        # TOPICS array
        tlines = ["export const TOPICS: Topic[] = ["]
        for tid, name, emoji, color in topics_data:
            tlines.append(f'  {{ id: "{tid}", name: "{name}", emoji: "{emoji}", color: "{color}", description: "" }},')
        tlines.append("];")
        content = content[:topics_start] + "\n".join(tlines) + content[topics_end:]

with open(VOCAB_FILE, "w", encoding="utf-8") as f:
    f.write(content)

total = len(re.findall(r'\{\s*id:\s*\d+', content))
print(f"Restored: {total} words, {len(new_words)} new, topics updated")
