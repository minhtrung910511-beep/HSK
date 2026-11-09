#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HSK1 Exam PDF Generator
======================
Tạo đề thi HSK (一级) định dạng chính thức bằng ReportLab.

Cấu trúc đề thi (40 câu):
  - Trang bìa
  - Phần 1: 听力 (Listening) - 20 câu (4 phần con)
  - Phần 2: 阅读 (Reading)  - 20 câu (4 phần con)

Từ vựng được load trực tiếp từ src/lib/vocab-data.ts (HSK1 thực tế).

Output:
  /home/z/my-project/download/de-thi-hsk1-H10901.pdf
  /home/z/my-project/download/de-thi-hsk1-H11005.pdf

Usage:
  python3 scripts/gen-hsk1-exam.py
"""

import os
import re
import sys
import random
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, black, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

# ---------------------------------------------------------------------------
# Paths & constants
# ---------------------------------------------------------------------------
PROJECT_ROOT = Path("/home/z/my-project")
VOCAB_TS = PROJECT_ROOT / "src/lib/vocab-data.ts"
OUT_DIR = PROJECT_ROOT / "download"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Font paths (task-specified). The NotoSansSC variable font does not load
# directly in ReportLab, so we fall back to a static CJK-capable font.
FONT_HANZI_PATH = "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"
FONT_HANZI_BOLD_PATH = "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"
FONT_PINYIN_CANDIDATES = [
    "/usr/share/fonts/truetype/chinese/NotoSansSC-Regular.ttf",          # task spec
    "/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf",        # static fallback
    "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf",   # last resort
]

PAGE_W, PAGE_H = A4                       # 595.27 x 841.89 pt
MARGIN = 2 * cm                          # ~56.7 pt
CONTENT_W = PAGE_W - 2 * MARGIN

# Colors
INK = HexColor("#1a1a1a")
LIGHT = HexColor("#888888")
LINE = HexColor("#333333")
BOX_BG = HexColor("#fafafa")
HEADER_BG = HexColor("#e8e8e8")
ACCENT = HexColor("#b22222")

random.seed(42)  # reproducible exams

# ---------------------------------------------------------------------------
# Font registration
# ---------------------------------------------------------------------------
def _register_fonts():
    """Register Chinese + pinyin fonts. Returns (hanzi_font, pinyin_font)."""
    if not os.path.exists(FONT_HANZI_PATH):
        raise FileNotFoundError(f"Hanzi font missing: {FONT_HANZI_PATH}")
    pdfmetrics.registerFont(TTFont("Hanzi", FONT_HANZI_PATH))
    if os.path.exists(FONT_HANZI_BOLD_PATH):
        pdfmetrics.registerFont(TTFont("HanziBold", FONT_HANZI_BOLD_PATH))
    else:
        pdfmetrics.registerFont(TTFont("HanziBold", FONT_HANZI_PATH))

    pinyin_path = None
    for p in FONT_PINYIN_CANDIDATES:
        if os.path.exists(p):
            try:
                pdfmetrics.registerFont(TTFont("Pinyin", p))
                pinyin_path = p
                break
            except Exception:
                continue
    if pinyin_path is None:
        raise FileNotFoundError("No pinyin-capable font found")
    pdfmetrics.registerFont(TTFont("PinyinBold", pinyin_path))
    return "Hanzi", "Pinyin"


# ---------------------------------------------------------------------------
# Vocabulary loader  (parse src/lib/vocab-data.ts)
# ---------------------------------------------------------------------------
_HAN_RE = re.compile(r'han:\s*"((?:[^"\\]|\\.)*)"')
_PIN_RE = re.compile(r'pinyin:\s*"((?:[^"\\]|\\.)*)"')
_MEAN_RE = re.compile(r'meaning:\s*"((?:[^"\\]|\\.)*)"')
_TOPIC_RE = re.compile(r'topic:\s*"([^"]+)"')
_POS_RE = re.compile(r'pos:\s*"([^"]+)"')
_EXAMPLE_RE = re.compile(r'example:\s*"((?:[^"\\]|\\.)*)"')


def load_vocab():
    """Return list of dicts with keys: han, pinyin, meaning, pos, topic, example."""
    if not VOCAB_TS.exists():
        raise FileNotFoundError(f"vocab file missing: {VOCAB_TS}")
    text = VOCAB_TS.read_text(encoding="utf-8")
    # Restrict to the VOCAB array only (TOPICS above has a different shape)
    marker = "export const VOCAB: VocabWord[] = ["
    idx = text.find(marker)
    if idx < 0:
        marker = "export const VOCAB"
        idx = text.find(marker)
    end = text.find("];", idx)
    block = text[idx:end] if idx >= 0 and end > idx else text

    items = []
    for m in re.finditer(r"\{\s*id:\s*\d+", block):
        start = m.start()
        close = block.find("}", start)
        rec = block[start:close + 1]
        han = _grab(_HAN_RE, rec)
        pin = _grab(_PIN_RE, rec)
        mean = _grab(_MEAN_RE, rec)
        topic = _grab(_TOPIC_RE, rec)
        pos = _grab(_POS_RE, rec)
        ex = _grab(_EXAMPLE_RE, rec)
        if han and pin:
            items.append({
                "han": _unescape(han), "pinyin": _unescape(pin),
                "meaning": _unescape(mean), "pos": pos or "",
                "topic": topic or "", "example": _unescape(ex),
            })
    return items


def _grab(rx, s):
    m = rx.search(s)
    return m.group(1) if m else ""


def _unescape(s):
    return s.replace('\\"', '"').replace("\\\\", "\\")


# ---------------------------------------------------------------------------
# Exam content builder
# ---------------------------------------------------------------------------
def _pick(words, predicate, n, used):
    """Pick n distinct words matching predicate, not already used."""
    pool = [w for w in words if predicate(w) and w["han"] not in used]
    random.shuffle(pool)
    chosen = pool[:n]
    for w in chosen:
        used.add(w["han"])
    # backfill from full pool if a topic is too small
    while len(chosen) < n:
        pool2 = [w for w in words if w["han"] not in used]
        random.shuffle(pool2)
        if not pool2:
            break
        chosen.append(pool2[0])
        used.add(pool2[0]["han"])
    return chosen


def _is_noun(w):     return "Danh từ" in w["pos"]
def _is_verb(w):     return "Động từ" in w["pos"]
def _is_short(w):    return len(w["han"]) <= 2 and not w["han"].endswith("！")


def build_exam(words, exam_code):
    """Build a 40-question exam dict from the HSK1 vocab pool."""
    used = set()
    exam = {"code": exam_code, "listening": {}, "reading": {}}

    # ---- Listening Part 1 (Q1-5): mark √/× from image -----------------------
    p1_words = _pick(words, lambda w: _is_noun(w) and _is_short(w), 5, used)
    exam["listening"]["p1"] = [
        {"n": i + 1, "word": w, "audio": f"这是{w['han']}。", "correct": "√"}
        for i, w in enumerate(p1_words)
    ]

    # ---- Listening Part 2 (Q6-10): choose 1 of 3 pictures -------------------
    p2_words = _pick(words, lambda w: _is_noun(w) and _is_short(w), 5, used)
    exam["listening"]["p2"] = []
    for i, w in enumerate(p2_words):
        distractors = _pick(words, lambda x: _is_noun(x) and _is_short(x) and x["han"] != w["han"], 2, used)
        opts = [w] + distractors
        random.shuffle(opts)
        exam["listening"]["p2"].append({
            "n": 6 + i, "answer": w,
            "audio": f"这是{w['han']}。",
            "options": opts,                 # 3 words (drawn as images A,B,C)
            "correct": "ABC"[opts.index(w)],
        })

    # ---- Listening Part 3 (Q11-15): choose 1 of 6 pictures ------------------
    p3_words = _pick(words, lambda w: _is_noun(w) and _is_short(w), 5, used)
    # shared pool of 6 images per question (HSK1 style: 6 imgs A-F then 5 Qs)
    p3_pool = _pick(words, lambda w: _is_noun(w) and _is_short(w), 6, used)
    exam["listening"]["p3"] = []
    for i, w in enumerate(p3_words):
        # rotate the 6-image pool so each question uses the same set but
        # different correct answer
        correct_idx = i % 6
        exam["listening"]["p3"].append({
            "n": 11 + i, "answer": w,
            "audio": f"他在{w['han']}。",
            "options": p3_pool,
            "correct": "ABCDEF"[correct_idx],
        })

    # ---- Listening Part 4 (Q16-20): choose correct answer A/B/C -------------
    # Each question is a short dialogue; options are short phrases.
    p4_templates = [
        ("你叫什么名字？", "我叫小明。", ["我叫小明。", "他叫小明。", "你好。"]),
        ("你几岁？", "我二十岁。", ["我二十岁。", "我很好。", "我是学生。"]),
        ("今天星期几？", "今天星期一。", ["今天星期一。", "今天很好。", "今天天气。"]),
        ("你喜欢吃什么？", "我喜欢吃苹果。", ["我喜欢吃苹果。", "我不喜欢。", "你是老师。"]),
        ("现在几点？", "现在八点。", ["现在八点。", "八个人。", "八块钱。"]),
    ]
    exam["listening"]["p4"] = []
    for i, (q, ans, opts) in enumerate(p4_templates):
        random.shuffle(opts)
        exam["listening"]["p4"].append({
            "n": 16 + i, "question": q, "answer": ans,
            "options": opts, "correct": "ABC"[opts.index(ans)],
        })

    # ---- Reading Part 1 (Q21-25): mark √/× for vocab+image -----------------
    r1_words = _pick(words, lambda w: _is_noun(w) and _is_short(w), 5, used)
    exam["reading"]["p1"] = [
        {"n": 21 + i, "word": w, "correct": "√"} for i, w in enumerate(r1_words)
    ]

    # ---- Reading Part 2 (Q26-30): match sentence with image (6 imgs A-F) ----
    r2_pool = _pick(words, lambda w: _is_noun(w) and _is_short(w), 6, used)
    r2_questions = []
    for i, w in enumerate(r2_pool[:5]):
        r2_questions.append({
            "n": 26 + i,
            "sentence": f"这是{w['han']}。",
            "pinyin": f"zhè shì {w['pinyin']}.",
            "answer_idx": i,
        })
    exam["reading"]["p2"] = {"images": r2_pool, "questions": r2_questions}

    # ---- Reading Part 3 (Q31-35): match question with answer ----------------
    r3_pairs = [
        ("你叫什么名字？", "nǐ jiào shénme míngzi?", "我叫李明。", "wǒ jiào lǐ míng."),
        ("你今年多大？",   "nǐ jīnnián duō dà?",   "我二十岁。",   "wǒ èrshí suì."),
        ("你是哪国人？",   "nǐ shì nǎ guó rén?",   "我是中国人。", "wǒ shì zhōngguó rén."),
        ("你家有几口人？", "nǐ jiā yǒu jǐ kǒu rén?", "我家有三口人。", "wǒ jiā yǒu sān kǒu rén."),
        ("现在几点？",     "xiànzài jǐ diǎn?",     "现在八点。",   "xiànzài bā diǎn."),
        ("你喜欢喝什么？", "nǐ xǐhuān hē shénme?", "我喜欢喝茶。", "wǒ xǐhuān hē chá."),
    ]
    random.shuffle(r3_pairs)
    questions = r3_pairs[:5]
    answers = r3_pairs[:]
    # shuffle answers independently and record correct letter
    ans_shuffled = answers[:]
    random.shuffle(ans_shuffled)
    exam["reading"]["p3"] = {
        "questions": [
            {"n": 31 + i, "han": q[0], "pinyin": q[1], "answer_han": q[2],
             "answer_pinyin": q[3],
             "correct": "ABCDEF"[ans_shuffled.index(q)]}
            for i, q in enumerate(questions)
        ],
        "answers": [{"han": a[2], "pinyin": a[3]} for a in ans_shuffled],
    }

    # ---- Reading Part 4 (Q36-40): fill in the blank ------------------------
    blanks = [
        ("我{0}学生。",     "是", ["是", "的", "了"]),
        ("这是{0}的书。",   "我", ["我", "你", "他"]),
        ("他{0}喝水。",     "喜欢", ["喜欢", "是", "的"]),
        ("今天{0}很好。",   "天气", ["天气", "名字", "水果"]),
        ("她{0}北京人。",   "是", ["是", "了", "在"]),
    ]
    exam["reading"]["p4"] = []
    for i, (tmpl, ans, opts) in enumerate(blanks):
        opts2 = opts[:]
        random.shuffle(opts2)
        # build display sentence with blank
        display = tmpl.replace("{0}", "（　　）")
        exam["reading"]["p4"].append({
            "n": 36 + i, "template": display, "answer": ans,
            "options": opts2, "correct": "ABC"[opts2.index(ans)],
        })

    return exam


# ---------------------------------------------------------------------------
# PDF rendering helpers
# ---------------------------------------------------------------------------
class ExamPDF:
    def __init__(self, path, exam):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle(f"HSK1 Exam {exam['code']}")
        self.exam = exam
        self.y = PAGE_H - MARGIN
        self.page = 1

    # ---- low-level --------------------------------------------------------
    def _ensure(self, h):
        if self.y - h < MARGIN + 20:
            self._footer()
            self.c.showPage()
            self.page += 1
            self.y = PAGE_H - MARGIN

    def _footer(self):
        self.c.setFont("Pinyin", 8)
        self.c.setFillColor(LIGHT)
        code = self.exam["code"]
        self.c.drawString(MARGIN, MARGIN - 18, f"HSK（一级）  {code}")
        self.c.drawRightString(PAGE_W - MARGIN, MARGIN - 18, f"第 {self.page} 页")
        self.c.setFillColor(INK)

    def _gap(self, h):
        self._ensure(h)
        self.y -= h

    def _hz(self, s, x, y, size=11, bold=False, color=INK, align="left"):
        f = "HanziBold" if bold else "Hanzi"
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        if align == "center":
            self.c.drawCentredString(x, y, s)
        elif align == "right":
            self.c.drawRightString(x, y, s)
        else:
            self.c.drawString(x, y, s)
        self.c.setFillColor(INK)

    def _py(self, s, x, y, size=9, color=LIGHT, align="left"):
        self.c.setFont("Pinyin", size)
        self.c.setFillColor(color)
        if align == "center":
            self.c.drawCentredString(x, y, s)
        elif align == "right":
            self.c.drawRightString(x, y, s)
        else:
            self.c.drawString(x, y, s)
        self.c.setFillColor(INK)

    # ---- image placeholder ------------------------------------------------
    def _draw_image_box(self, x, y, w, h, word, label=""):
        """Draw a bordered box representing the picture for `word`."""
        self.c.setStrokeColor(LINE)
        self.c.setLineWidth(0.6)
        self.c.setFillColor(BOX_BG)
        self.c.rect(x, y, w, h, fill=1, stroke=1)
        # hanzi centered (large)
        self._hz(word["han"], x + w / 2, y + h / 2 - 6, size=18, align="center")
        # pinyin small below
        if word.get("pinyin"):
            self._py(word["pinyin"], x + w / 2, y + 6, size=7, align="center")
        if label:
            self.c.setFont("Pinyin", 8)
            self.c.setFillColor(INK)
            self.c.drawCentredString(x + w / 2, y - 10, label)

    # ---- section headings -------------------------------------------------
    def _section_title(self, text, sub=""):
        self._gap(8)
        self._ensure(22)
        self.c.setFont("HanziBold", 13)
        self.c.setFillColor(INK)
        self.c.drawString(MARGIN, self.y, text)
        self.y -= 16
        if sub:
            self._py(sub, MARGIN, self.y + 4, size=8)
            self.y -= 12

    def _example_line(self, hanzi, pinyin):
        """例如 example line: e.g. 例如: √ ★ correct mark."""
        self._ensure(20)
        self.c.setFont("Hanzi", 9)
        self.c.setFillColor(LIGHT)
        self.c.drawString(MARGIN, self.y, "例如：")
        self.c.setFillColor(INK)
        self._hz(hanzi, MARGIN + 36, self.y, size=10)
        self._py(pinyin, MARGIN + 36, self.y - 10, size=7)
        self.y -= 24

    # ---- cover page -------------------------------------------------------
    def draw_cover(self):
        c = self.c
        # top banner (logo placeholder)
        bw, bh = 4 * cm, 1.6 * cm
        bx = (PAGE_W - bw) / 2
        by = PAGE_H - MARGIN - bh
        c.setFillColor(ACCENT)
        c.rect(bx, by, bw, bh, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("HanziBold", 16)
        c.drawCentredString(PAGE_W / 2, by + bh / 2 - 6, "汉语水平考试")
        c.setFont("Pinyin", 8)
        c.drawCentredString(PAGE_W / 2, by - 12, "HÀNYǔ SHUǏPÍNG KǍOSHÌ  ·  HSK")

        # title
        self.y = by - 60
        self._hz("新汉语水平考试", PAGE_W / 2, self.y, size=20, bold=True, align="center")
        self.y -= 28
        self._hz("HSK（一级）", PAGE_W / 2, self.y, size=20, bold=True, align="center")
        self.y -= 24
        self._py("Xīn hànyǔ shuǐpíng kǎoshì  HSK (yī jí)",
                PAGE_W / 2, self.y, size=10, align="center")

        # exam code box
        self.y -= 50
        cw, chh = 6 * cm, 1.4 * cm
        cx = (PAGE_W - cw) / 2
        c.setStrokeColor(INK)
        c.setLineWidth(1.2)
        c.rect(cx, self.y - chh, cw, chh, fill=0, stroke=1)
        c.setFont("Hanzi", 11)
        c.drawString(cx + 12, self.y - chh + 8, "试卷编号")
        c.setFont("Pinyin", 8)
        c.drawString(cx + 12, self.y - chh + 0, "shìjuàn biānhào")
        c.setFont("HanziBold", 14)
        c.drawRightString(cx + cw - 12, self.y - chh / 2 - 4, self.exam["code"])

        # notes block
        self.y -= chh + 50
        notes = [
            ("一、HSK（一级）分两部分：",
             "1. Hànyǔ shuǐpíng kǎoshì (yī jí) fēn liǎng bùfèn:"),
            ("　听力（20题，约15分钟） 阅读（20题，17分钟）",
             "　tīnglì (20 tí, yuē 15 fēnzhōng)  yuèdú (20 tí, 17 fēnzhōng)"),
            ("二、听力结束后，有3分钟填写答题卡。",
             "2. Tīnglì jiéshù hòu, yǒu 3 fēnzhōng tiánxiě dátíkǎ."),
            ("三、全部考试约40分钟（含考生填写个人信息时间5分钟）。",
             "3. Quánbù kǎoshì yuē 40 fēnzhōng "
             "(hán kǎoshēng tiánxiě gèrén xìnxī shíjiān 5 fēnzhōng)."),
        ]
        for han, py in notes:
            self._ensure(28)
            self._hz(han, MARGIN, self.y, size=10.5)
            self.y -= 13
            self._py(py, MARGIN + 14, self.y, size=7.5)
            self.y -= 18

        # bottom signature
        self.y = MARGIN + 60
        self._hz("中国  北京", PAGE_W / 2, self.y, size=11, align="center")
        self.y -= 15
        self._hz("国家汉办 / 孔子学院总部  编制",
                PAGE_W / 2, self.y, size=11, align="center")
        self.y -= 13
        self._py("Guójiā Hànbàn / Kǒngzǐ Xuéyuàn Zǒngbù  biānzhì",
                PAGE_W / 2, self.y, size=8, align="center")

        self._footer()
        c.showPage()
        self.page += 1
        self.y = PAGE_H - MARGIN

    # =====================================================================
    # LISTENING SECTION
    # =====================================================================
    def draw_listening_header(self):
        self._ensure(40)
        self.c.setFillColor(HEADER_BG)
        self.c.rect(MARGIN, self.y - 22, CONTENT_W, 22, fill=1, stroke=0)
        self.c.setFillColor(INK)
        self._hz("一、听力", MARGIN + 8, self.y - 16, size=14, bold=True)
        self._py("dì yī bùfèn: tīnglì", MARGIN + 8 + 70, self.y - 16, size=8)
        self._hz("（20题，约15分钟）", PAGE_W - MARGIN - 110, self.y - 16,
                 size=10, align="right")
        self.y -= 32

    # Part 1 ----------------------------------------------------------------
    def draw_listen_part1(self):
        self._section_title("第一部分", "dì yī bùfèn · Part 1")
        self._gap(2)
        # instruction
        self._hz("例如：", MARGIN, self.y, size=10)
        # example image + check/x column
        ex_x = MARGIN + 40
        self._draw_image_box(ex_x, self.y - 50, 50, 50, {"han": "苹果", "pinyin": "píngguǒ"})
        self._hz("√", ex_x + 70, self.y - 20, size=16, color=ACCENT)
        self._hz("×", ex_x + 100, self.y - 20, size=16)
        self.y -= 70
        # instruction text
        self._hz("请听录音，判断对错。对的打“√”，错的打“×”。",
                 MARGIN, self.y, size=10)
        self._py("qǐng tīng lùyīn, pànduàn duì cuò.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 24

        # 5 questions: image | √ column | × column
        col_w = (CONTENT_W - 70) / 2  # two columns of question blocks
        for i, q in enumerate(self.exam["listening"]["p1"]):
            col = i % 2
            row = i // 2
            if col == 0:
                self._ensure(70)
                row_y = self.y
            x = MARGIN + col * (col_w + 10)
            y_top = row_y - 4
            # number
            self._hz(f"{q['n']}.", x, y_top, size=10)
            # image box
            img_w = 44
            self._draw_image_box(x + 20, y_top - 46, img_w, 46, q["word"])
            # √ / × boxes
            cx = x + 80
            self._hz("√", cx, y_top - 10, size=13)
            self._hz("（　）", cx + 16, y_top - 10, size=11)
            self._hz("×", cx, y_top - 28, size=13)
            self._hz("（　）", cx + 16, y_top - 28, size=11)
            if col == 1:
                self.y = row_y - 56

        self.y -= 10

    # Part 2 ----------------------------------------------------------------
    def draw_listen_part2(self):
        self._section_title("第二部分", "dì èr bùfèn · Part 2")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        self._draw_image_box(MARGIN + 40, self.y - 46, 44, 46, {"han": "水", "pinyin": "shuǐ"})
        self._py("A", MARGIN + 40 + 22, self.y - 56, size=8, align="center")
        self._draw_image_box(MARGIN + 110, self.y - 46, 44, 46, {"han": "茶", "pinyin": "chá"})
        self._py("B", MARGIN + 110 + 22, self.y - 56, size=8, align="center")
        self._hz("正确答案：A", MARGIN + 180, self.y - 20, size=9, color=LIGHT)
        self.y -= 70
        self._hz("请听录音，选出与所听内容一致的图片。",
                 MARGIN, self.y, size=10)
        self._py("qǐng tīng lùyīn, xuǎnchū yǔ suǒ tīng nèiróng yīzhì de túpiàn.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 24

        for q in self.exam["listening"]["p2"]:
            self._ensure(70)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            bx = MARGIN + 30
            for j, w in enumerate(q["options"]):
                self._draw_image_box(bx, self.y - 46, 48, 46, w)
                self._py("ABC"[j], bx + 24, self.y - 56, size=8, align="center")
                bx += 60
            self.y -= 66

    # Part 3 ----------------------------------------------------------------
    def draw_listen_part3(self):
        self._section_title("第三部分", "dì sān bùfèn · Part 3")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        # 6 example images small
        ex_pool = self.exam["listening"]["p3"][0]["options"]
        bx = MARGIN + 40
        for j, w in enumerate(ex_pool):
            self._draw_image_box(bx, self.y - 40, 38, 40, w)
            self._py("ABCDEF"[j], bx + 19, self.y - 50, size=7.5, align="center")
            bx += 44
        self.y -= 64
        self._hz("请听对话，选出与对话内容一致的图片。",
                 MARGIN, self.y, size=10)
        self._py("qǐng tīng duìhuà, xuǎnchū yǔ duìhuà nèiróng yīzhì de túpiàn.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 22

        for q in self.exam["listening"]["p3"]:
            self._ensure(22)
            self._hz(f"{q['n']}.  A B C D E F", MARGIN, self.y, size=10)
            self._py("（　　）", MARGIN + 130, self.y - 1, size=10)
            self.y -= 18

    # Part 4 ----------------------------------------------------------------
    def draw_listen_part4(self):
        self._section_title("第四部分", "dì sì bùfèn · Part 4")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        self._py("nǐ shì xuésheng ma?  A. shì  B. bú shì  C. bù zhīdào",
                 MARGIN + 40, self.y, size=8)
        self._hz("正确答案：A", MARGIN + 40, self.y - 12, size=9, color=LIGHT)
        self.y -= 30
        self._hz("请听问句，选出正确的答语。",
                 MARGIN, self.y, size=10)
        self._py("qǐng tīng wènjù, xuǎnchū zhèngquè de dáyǔ.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 22

        for q in self.exam["listening"]["p4"]:
            self._ensure(26)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            x = MARGIN + 30
            for j, opt in enumerate(q["options"]):
                self._py(f"{'ABC'[j]}.", x, self.y - 1, size=9, color=INK)
                self._hz(opt, x + 16, self.y, size=10)
                x += 16 + self._text_w(opt, "Hanzi", 10) + 18
            self.y -= 22

    # =====================================================================
    # READING SECTION
    # =====================================================================
    def draw_reading_header(self):
        self._gap(10)
        self._ensure(40)
        self.c.setFillColor(HEADER_BG)
        self.c.rect(MARGIN, self.y - 22, CONTENT_W, 22, fill=1, stroke=0)
        self.c.setFillColor(INK)
        self._hz("二、阅读", MARGIN + 8, self.y - 16, size=14, bold=True)
        self._py("dì èr bùfèn: yuèdú", MARGIN + 8 + 70, self.y - 16, size=8)
        self._hz("（20题，17分钟）", PAGE_W - MARGIN - 110, self.y - 16,
                 size=10, align="right")
        self.y -= 32

    # Reading Part 1: image | word | √ | × ----------------------------------
    def draw_read_part1(self):
        self._section_title("第一部分", "dì yī bùfèn · Part 1")
        self._gap(2)
        # example row header
        self._hz("例如：", MARGIN, self.y, size=10)
        self._draw_image_box(MARGIN + 40, self.y - 44, 40, 44,
                            {"han": "书", "pinyin": "shū"})
        self._hz("书", MARGIN + 100, self.y - 16, size=12)
        self._py("shū", MARGIN + 100, self.y - 28, size=8)
        self._hz("√（　）", MARGIN + 200, self.y - 16, size=11)
        self._hz("×（　）", MARGIN + 260, self.y - 16, size=11)
        self.y -= 56
        self._hz("判断图片与词语是否一致。",
                 MARGIN, self.y, size=10)
        self._py("pànduàn túpiàn yǔ cíyǔ shìfǒu yīzhì.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 22

        # 5 rows as a table
        for q in self.exam["reading"]["p1"]:
            self._ensure(52)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            self._draw_image_box(MARGIN + 30, self.y - 44, 40, 44, q["word"])
            self._hz(q["word"]["han"], MARGIN + 90, self.y - 16, size=12)
            self._py(q["word"]["pinyin"], MARGIN + 90, self.y - 28, size=8)
            self._hz("√（　）", MARGIN + 200, self.y - 16, size=11)
            self._hz("×（　）", MARGIN + 260, self.y - 16, size=11)
            self.y -= 52

    # Reading Part 2: 5 sentences + 6 images A-F ---------------------------
    def draw_read_part2(self):
        self._section_title("第二部分", "dì èr bùfèn · Part 2")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        self._hz("这是苹果。", MARGIN + 40, self.y, size=10)
        self._py("zhè shì píngguǒ.", MARGIN + 40, self.y - 11, size=7.5)
        self._hz("正确答案：A", MARGIN + 200, self.y, size=9, color=LIGHT)
        self.y -= 26
        self._hz("根据句子内容，选出合适的图片。",
                 MARGIN, self.y, size=10)
        self._py("gēnjù jùzi nèiróng, xuǎnchū héshì de túpiàn.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 24

        # 6 images row A-F
        data = self.exam["reading"]["p2"]
        self._ensure(70)
        img_w = (CONTENT_W - 5 * 6) / 6
        bx = MARGIN
        for j, w in enumerate(data["images"]):
            self._draw_image_box(bx, self.y - img_w, img_w, img_w, w)
            self._py("ABCDEF"[j], bx + img_w / 2, self.y - img_w - 12,
                    size=9, align="center")
            bx += img_w + 6
        self.y -= img_w + 22

        # 5 sentences
        for q in data["questions"]:
            self._ensure(28)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            self._hz(q["sentence"], MARGIN + 30, self.y, size=10.5)
            self._py(q["pinyin"], MARGIN + 30, self.y - 11, size=7.5)
            self._hz("（　　）", MARGIN + 200, self.y, size=11)
            self.y -= 26

    # Reading Part 3: 5 questions + 6 answers A-F ---------------------------
    def draw_read_part3(self):
        self._section_title("第三部分", "dì sān bùfèn · Part 3")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        self._hz("你好吗？ — A. 我很好。", MARGIN + 40, self.y, size=10)
        self._py("nǐ hǎo ma?  —  A. wǒ hěn hǎo.", MARGIN + 40, self.y - 11, size=7.5)
        self.y -= 26
        self._hz("根据问句选出正确的答语。",
                 MARGIN, self.y, size=10)
        self._py("gēnjù wènjù xuǎnchū zhèngquè de dáyǔ.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 22

        data = self.exam["reading"]["p3"]
        # two-column layout: questions left, answers right
        left_w = CONTENT_W * 0.55
        right_x = MARGIN + left_w + 14
        # answers list
        ans_y = self.y
        for j, a in enumerate(data["answers"]):
            self._ensure(24)
            self._py(f"{ 'ABCDEF'[j] }.", right_x, ans_y, size=9, color=INK)
            self._hz(a["han"], right_x + 18, ans_y, size=10)
            self._py(a["pinyin"], right_x + 18, ans_y - 10, size=7.5)
            ans_y -= 30
        # questions
        for q in data["questions"]:
            self._ensure(28)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            self._hz(q["han"], MARGIN + 30, self.y, size=10)
            self._py(q["pinyin"], MARGIN + 30, self.y - 10, size=7.5)
            self._hz("（　）", MARGIN + left_w - 30, self.y, size=10)
            self.y -= 28

    # Reading Part 4: fill in the blank -------------------------------------
    def draw_read_part4(self):
        self._section_title("第四部分", "dì sì bùfèn · Part 4")
        self._gap(2)
        self._hz("例如：", MARGIN, self.y, size=10)
        self._hz("我（　　）学生。", MARGIN + 40, self.y, size=10)
        self._py("wǒ (　　) xuésheng.", MARGIN + 40, self.y - 11, size=7.5)
        self._hz("A. 是  B. 的  C. 了   正确答案：A",
                 MARGIN + 40, self.y - 24, size=9, color=LIGHT)
        self.y -= 44
        self._hz("选择正确的词填空。",
                 MARGIN, self.y, size=10)
        self._py("xuǎnzé zhèngquè de cí tiánkòng.",
                 MARGIN, self.y - 11, size=7.5)
        self.y -= 22

        # 5 questions
        for q in self.exam["reading"]["p4"]:
            self._ensure(30)
            self._hz(f"{q['n']}.", MARGIN, self.y, size=10)
            self._hz(q["template"], MARGIN + 30, self.y, size=10.5)
            self.y -= 16
            x = MARGIN + 30
            for j, opt in enumerate(q["options"]):
                self._py(f"{'ABC'[j]}.", x, self.y, size=9, color=INK)
                self._hz(opt, x + 16, self.y + 1, size=10)
                x += 16 + self._text_w(opt, "Hanzi", 10) + 16
            self.y -= 22

    # ---- text width helper ------------------------------------------------
    def _text_w(self, s, font, size):
        try:
            return pdfmetrics.stringWidth(s, font, size)
        except Exception:
            return len(s) * size * 0.5

    # =====================================================================
    # Driver
    # =====================================================================
    def render(self):
        self.draw_cover()
        self.draw_listening_header()
        self.draw_listen_part1()
        self.draw_listen_part2()
        self.draw_listen_part3()
        self.draw_listen_part4()
        # reading starts on fresh page
        self._footer()
        self.c.showPage()
        self.page += 1
        self.y = PAGE_H - MARGIN
        self.draw_reading_header()
        self.draw_read_part1()
        self.draw_read_part2()
        self.draw_read_part3()
        self.draw_read_part4()
        self._footer()
        self.c.save()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    _register_fonts()
    words = load_vocab()
    print(f"[info] Loaded {len(words)} HSK1 vocabulary entries from vocab-data.ts")

    # Two exams with different random seeds so content differs
    for idx, code in enumerate([("H10901", 1001), ("H11005", 2005)]):
        code_str, seed = code
        random.seed(seed)
        exam = build_exam(words, code_str)
        out_path = OUT_DIR / f"de-thi-hsk1-{code_str}.pdf"
        ExamPDF(str(out_path), exam).render()
        print(f"[ok] wrote {out_path}  ({out_path.stat().st_size} bytes)")

    print("[done] HSK1 exam PDFs generated.")


if __name__ == "__main__":
    main()
