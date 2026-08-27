"""Quick fetch Wikipedia images cho 50 từ HSK1"""
import json
import re
import urllib.request
import urllib.parse
import time

# Đọc vocab-data.ts
with open("/home/z/my-project/src/lib/vocab-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(
    r'han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)"',
    re.DOTALL
)
words = []
for m in pattern.finditer(content):
    words.append({"han": m.group(1), "pinyin": m.group(2), "meaning": m.group(3)})

print(f"Total words: {len(words)}")

results = {}
total_to_fetch = min(10, len(words))  # Fetch 80 từ đầu

for i, w in enumerate(words[:total_to_fetch]):
    meaning = w["meaning"]
    keyword = re.split(r'[,\/(]', meaning)[0].strip().replace(' ', '_')
    url = f"https://vi.wikipedia.org/wiki/{urllib.parse.quote(keyword)}"

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (HSK1 Vocab App)'})
        resp = urllib.request.urlopen(req, timeout=10)
        html = resp.read().decode('utf-8', errors='ignore')

        imgs = re.findall(r'src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+(?:250px|300px|320px)[^"]+\.(?:jpg|jpeg|png))"', html, re.IGNORECASE)
        if not imgs:
            imgs = re.findall(r'src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(?:jpg|jpeg|png))"', html, re.IGNORECASE)

        if imgs:
            img_url = "https:" + imgs[0]
            results[w["han"]] = img_url
            print(f"  [{i+1}/{total_to_fetch}] {w['han']} OK")
        else:
            results[w["han"]] = "none"
            print(f"  [{i+1}/{total_to_fetch}] {w['han']} --")
    except Exception as e:
        results[w["han"]] = "none"
        print(f"  [{i+1}/{total_to_fetch}] {w['han']} ERR: {str(e)[:40]}")

    time.sleep(3)

# Save
with open("/tmp/wiki_images_vi.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

with_img = sum(1 for v in results.values() if v and v != "none")
print(f"\n=== Done: {with_img}/{total_to_fetch} co anh ===")
