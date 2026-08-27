"""Fetch images from Openverse API (free, CC0 licensed)"""
import json, re, urllib.request, urllib.parse, time, sys, os

VOCAB_FILE = "/home/z/my-project/src/lib/vocab-data.ts"
OUTPUT_FILE = "/tmp/openverse_images.json"

def load_existing():
    try: return json.load(open(OUTPUT_FILE, "r", encoding="utf-8"))
    except: return {}

def save(data):
    json.dump(data, open(OUTPUT_FILE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

def fetch_image(keyword):
    """Search Openverse for image, return thumbnail URL"""
    url = f"https://api.openverse.org/v1/images/?q={urllib.parse.quote(keyword)}&license=cc0&license=cc-by&license=cc-by-sa&page_size=3&mature=false"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'HSK1VocabApp/1.0'})
        resp = urllib.request.urlopen(req, timeout=10)
        data = json.loads(resp.read())
        results = data.get('results', [])
        if results:
            # Get thumbnail (smaller, faster loading)
            thumb = results[0].get('thumbnail', '')
            if thumb:
                return thumb
            # Fallback to url
            img_url = results[0].get('url', '')
            if img_url:
                return img_url
        return None
    except Exception as e:
        return None

# Read vocab
with open(VOCAB_FILE, "r", encoding="utf-8") as f:
    content = f.read()

full_pattern = re.compile(r'han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)"[^}]*?topic:\s*"([^"]+)"', re.DOTALL)
words = []
for m in full_pattern.finditer(content):
    words.append({"han": m.group(1), "pinyin": m.group(2), "meaning": m.group(3), "topic": m.group(4)})

# Only concrete nouns
concrete_topics = ["objects", "food", "body", "places", "family", "people"]
concrete = [w for w in words if w["topic"] in concrete_topics]
print(f"Concrete words: {len(concrete)}")

existing = load_existing()
print(f"Already done: {len(existing)}, with images: {sum(1 for v in existing.values() if v and v != 'none')}")

remaining = [w for w in concrete if w["han"] not in existing]
print(f"Remaining: {len(remaining)}")

BATCH = int(sys.argv[1]) if len(sys.argv) > 1 else 20

for i, w in enumerate(remaining[:BATCH]):
    meaning = w["meaning"]
    # Use first word of meaning as search keyword
    keyword = re.split(r'[,\/(]', meaning)[0].strip()
    
    img_url = fetch_image(keyword)
    
    if img_url:
        existing[w["han"]] = img_url
        print(f"  [{i+1}/{BATCH}] {w['han']} ({keyword}) OK: {img_url[:60]}...")
    else:
        existing[w["han"]] = "none"
        print(f"  [{i+1}/{BATCH}] {w['han']} ({keyword}) --")
    
    save(existing)
    time.sleep(1)  # 1s per word - Openverse is fast

ok = sum(1 for v in existing.values() if v and v != "none")
print(f"\n=== {len(existing)}/{len(concrete)} done, {ok} images ===")
