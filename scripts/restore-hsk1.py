"""Restore 147 từ mới + cập nhật mismatches từ file Excel"""
import openpyxl, re, json

VOCAB_FILE = "/home/z/my-project/src/lib/vocab-data.ts"
EXCEL_FILE = "/home/z/my-project/upload/Phú Tổng hợp từ vựng lớp HK1.xlsx"

# Đọc Excel
wb = openpyxl.load_workbook(EXCEL_FILE, data_only=True)
ws = wb["Từ vựng"]
excel_words = []
current_lesson = "Mở đầu"
for row in ws.iter_rows(min_row=2, values_only=True):
    stt, han, pinyin, meaning, lesson = row[0], row[1], row[2], row[3], row[4]
    if lesson: current_lesson = str(lesson).strip()
    if han and str(han).strip() and pinyin and meaning:
        excel_words.append({"han": str(han).strip(), "pinyin": str(pinyin).strip(), "meaning": str(meaning).strip(), "lesson": current_lesson})

# Đọc vocab-data.ts
with open(VOCAB_FILE, "r", encoding="utf-8") as f:
    content = f.read()

existing_han = set()
for m in re.finditer(r'han:\s*"([^"]+)"', content):
    existing_han.add(m.group(1))
existing_ids = [int(m.group(1)) for m in re.finditer(r'\{\s*id:\s*(\d+)', content)]
max_id = max(existing_ids) if existing_ids else 279

# Cập nhật mismatches
def normalize(s): return re.sub(r'\s+', '', s.lower())
mismatches = 0
for w in excel_words:
    if w["han"] in existing_han:
        pattern = re.compile(r'(han:\s*"' + re.escape(w["han"]) + r'",\s*pinyin:\s*")([^"]+)(",\s*meaning:\s*")([^"]+)(")')
        m = pattern.search(content)
        if m and (normalize(w["pinyin"]) != normalize(m.group(2)) or normalize(w["meaning"]) != normalize(m.group(4))):
            content = content[:m.start()] + m.group(1) + w["pinyin"] + m.group(3) + w["meaning"] + m.group(5) + content[m.end():]
            mismatches += 1

# Tìm từ mới
new_words = [w for w in excel_words if w["han"] not in existing_han]

# Auto topic + pos
def assign_topic(han, meaning):
    m = meaning.lower()
    if any(v in han for v in ["警察","老师","学生","医生","经理","秘书","组长","部长","助理","厂长","员工","人员","干部","副理","副经理","协理","总经理","董事长"]): return "people"
    if any(v in han for v in ["爷爷","奶奶","外公","外婆","叔叔","阿姨","哥哥","姐姐","弟弟","妹妹","爸爸","妈妈","儿子","女儿","家庭","家人"]): return "family"
    if any(v in m for v in ["chào","tạm biệt","cảm ơn","xin lỗi","nghỉ","giải lao","hết giờ","vào học"]): return "greetings"
    if any(v in m for v in ["năm","tháng","tuần","ngày","giờ","phút","sáng","chiều","tối","thời gian","mùa","nghỉ phép"]): return "time"
    if any(v in han for v in ["年","月","日","天","星期","周","今天","明天","昨天","现在","时候","点","分","上午","下午","晚上","早上","春","夏","秋","冬","钟","时"]): return "time"
    if any(v in m for v in ["bàn","ghế","cốc","máy tính","tivi","điện thoại","xe","bút","quần áo","ô","đồng hồ","tiền","vé","giấy","sách","nhà","cửa","phòng","bảng","cổ áo"]): return "objects"
    if any(v in han for v in ["桌子","椅子","杯子","电脑","电视","电话","车","笔","衣服","伞","表","钱","票","纸","书","水果","门","房间","黑板"]): return "objects"
    if any(v in m for v in ["ăn","uống","cơm","nước","trà","thịt","cá","rau","trái cây","trứng","sữa","bánh","mì","gạo","đường","muối","món"]): return "food"
    if any(v in han for v in ["吃","喝","饭","水","茶","咖啡","肉","鱼","菜","果","蛋","奶","饼","面","米","糖","盐","汤","粥","酒","汁"]): return "food"
    if any(v in m for v in ["đầu","mắt","miệng","mũi","tai","tay","chân","răng","lưng","bụng","tim","máu","da","tóc","mặt"]): return "body"
    if any(v in han for v in ["头","眼","嘴","鼻","耳","手","脚","牙","背","肚","心","血","皮","发","脸","颈","肩","胸"]): return "body"
    if any(v in m for v in ["tốt","xấu","đẹp","to","lớn","nhỏ","nhiều","ít","cao","nóng","lạnh","mới","cũ","rẻ","đắt","nhanh","chậm","sạch","vui","buồn","khỏe","đau","mệt","đói","no","khát","ngon","thông minh","khó","dễ","xa","gần","sâu","bất lực"]): return "adjectives"
    if any(v in m for v in ["trường","bệnh viện","cửa hàng","nhà hàng","khách sạn","sân bay","công viên","bảo tàng","thư viện","rạp","ngân hàng","bưu điện","chợ","siêu thị","cửa","cổng","ngoài","trong","trên","dưới","trước","sau","trái","phải","đường","phố","khu"]): return "places"
    if any(v in han for v in ["学校","医院","商店","饭店","酒店","机场","站","公园","博物馆","图书馆","电影院","银行","邮局","市场","超市","里","外","上","下","前","后","左","右","中","东","西","南","北","路","街","门口","门外"]): return "places"
    if any(v in han for v in ["我","你","他","她","这","那","谁","什么","哪","怎么","为什么","别人","大家","自己","互相","这些","那些"]): return "pronouns"
    if han in ["的","了","吗","呢","吧","啊","汉语","中文","汉字","字","词","语法"] or any(v in m for v in ["trợ từ","ngữ khí"]): return "misc"
    return "verbs"

def assign_pos(han, meaning):
    if any(v in han for v in ["看","听","说","写","读","做","来","去","坐","站","走","住","喜欢","想","爱","买","卖","工作","学习","教","认识","知道","会","能","吃","喝","问","答","叫","帮","介绍","打","接","送","带","拿","放","找","用","开","关","停","等","换","修","洗","穿","戴","脱","骑","准备","开始","结束","发现","解决","告诉","回答","觉得","希望","同意","拒绝","决定","记得","忘记","收拾","打扫","安排","参加","影响","发生","出现","变化","提高","降低","增加","减少","继续","停止","完成","成功","失败","上班","下班","加班","休息"]): return "Động từ"
    elif any(v in han for v in ["好","坏","大","小","多","少","高","热","冷","新","旧","漂亮","贵","便宜","快","慢","干净","脏","高兴","难过","累","饿","饱","渴","聪明","容易","难","对","错","深","浅","厚","薄","宽","窄","浓","淡","红","绿","黄","黑","白","蓝"]): return "Tính từ"
    elif any(v in han for v in ["我","你","他","她","这","那","谁","什么","哪","怎么","为什么","别人","大家","自己","互相","这些","那些"]): return "Đại từ"
    elif any(v in han for v in ["一","二","三","四","五","六","七","八","九","十","百","千","万","零","两","几","多少"]): return "Số từ"
    elif any(v in han for v in ["个","口","块","岁","点","分","件","本","张","条","把","双","只","种","次"]): return "Lượng từ"
    elif any(v in han for v in ["吗","呢","的","了","吧","啊"]): return "Trợ từ"
    return "Danh từ"

# Thêm từ mới
lines = ["", "  // ===== TỪ VỰNG BỔ SUNG TỪ FILE PHÚ (HK1) ====="]
current_lesson = None
for i, w in enumerate(new_words):
    new_id = max_id + 1 + i
    if w["lesson"] != current_lesson:
        lines.append(f"  // --- {w['lesson']} ---")
        current_lesson = w["lesson"]
    esc = lambda s: s.replace('\\','\\\\').replace('"','\\"')
    topic = assign_topic(w["han"], w["meaning"])
    pos = assign_pos(w["han"], w["meaning"])
    line = f'  {{ id: {new_id}, han: "{esc(w["han"])}", pinyin: "{esc(w["pinyin"])}", meaning: "{esc(w["meaning"])}", pos: "{pos}", emoji: "", example: "{esc(w["han"])}。", examplePinyin: "{esc(w["pinyin"])}。", exampleVi: "{esc(w["meaning"])}。", topic: "{topic}" }},'
    lines.append(line)

new_block = "\n".join(lines)
insert = re.compile(r'(\n\];\s*\n\s*\n// ===== Helpers)', re.MULTILINE)
m = insert.search(content)
if m:
    content = content[:m.start()] + new_block + m.group(1) + content[m.end():]

with open(VOCAB_FILE, "w", encoding="utf-8") as f:
    f.write(content)

# Backup
import shutil
shutil.copy(VOCAB_FILE, VOCAB_FILE + ".bak")

total = len(re.findall(r'\{\s*id:\s*\d+', content))
print(f"Mismatches updated: {mismatches}")
print(f"New words added: {len(new_words)}")
print(f"Total: {total} words")
print(f"Backup created: {VOCAB_FILE}.bak")
