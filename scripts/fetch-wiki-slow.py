"""Fetch Wikipedia images - 10s per word, with resume"""
import json, re, urllib.request, urllib.parse, time, sys, os

VOCAB_FILE = "/home/z/my-project/src/lib/vocab-data.ts"
OUTPUT_FILE = "/tmp/wiki_images_final.json"

def load_existing():
    try:
        return json.load(open(OUTPUT_FILE, "r", encoding="utf-8"))
    except:
        return {}

def save(data):
    json.dump(data, open(OUTPUT_FILE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

# Read vocab
with open(VOCAB_FILE, "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)"', re.DOTALL)
words = []
for m in pattern.finditer(content):
    words.append({"han": m.group(1), "pinyin": m.group(2), "meaning": m.group(3)})

print(f"Total words: {len(words)}")

existing = load_existing()
print(f"Already processed: {len(existing)}")

remaining = [w for w in words if w["han"] not in existing]
print(f"Remaining: {len(remaining)}")

if not remaining:
    with_img = sum(1 for v in existing.values() if v and v != "none")
    print(f"Done! {with_img}/{len(words)} have images")
    sys.exit(0)

BATCH = int(sys.argv[1]) if len(sys.argv) > 1 else 10  # Default 10 words per run

for i, w in enumerate(remaining[:BATCH]):
    meaning = w["meaning"]
    keyword = re.split(r'[,\/(]', meaning)[0].strip().replace(' ', '_')
    url = f"https://vi.wikipedia.org/wiki/{urllib.parse.quote(keyword)}"
    
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html',
            'Accept-Language': 'vi,en;q=0.9',
        })
        resp = urllib.request.urlopen(req, timeout=10)
        html = resp.read().decode('utf-8', errors='ignore')
        
        # Find article images (250px+ from Wikimedia Commons)
        imgs = re.findall(r'src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+(?:250px|300px|320px|400px)[^"]+\.(?:jpg|jpeg|png))"', html, re.IGNORECASE)
        if not imgs:
            imgs = re.findall(r'src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(?:jpg|jpeg|png))"', html, re.IGNORECASE)
        
        # Filter out icons/logos (small images)
        good_imgs = [img for img in imgs if not any(x in img.lower() for x in ['logo', 'icon', 'symbol', 'disambig', 'wiktionary', 'question_book', 'semi-protection'])]
        
        if good_imgs:
            img_url = "https:" + good_imgs[0]
            existing[w["han"]] = img_url
            print(f"  [{i+1}/{BATCH}] {w['han']} -> {w['meaning'][:20]} OK")
        else:
            existing[w["han"]] = "none"
            print(f"  [{i+1}/{BATCH}] {w['han']} -> {w['meaning'][:20]} --")
    except Exception as e:
        existing[w["han"]] = "none"
        print(f"  [{i+1}/{BATCH}] {w['han']} -> {w['meaning'][:20]} ERR: {str(e)[:30]}")
    
    save(existing)
    time.sleep(10)  # 10 seconds per word

with_img = sum(1 for v in existing.values() if v and v != "none")
total = len(existing)
print(f"\n=== Progress: {total}/{len(words)} processed, {with_img} with images ===")
