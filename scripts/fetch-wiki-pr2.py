"""Fetch Wikipedia images using z-ai page_reader with file output"""
import json, re, subprocess, sys, time, os

VOCAB_FILE = "/home/z/my-project/src/lib/vocab-data.ts"
OUTPUT_FILE = "/tmp/wiki_images_final.json"
TMP_FILE = "/tmp/wiki_pr_tmp.json"

def load_existing():
    try: return json.load(open(OUTPUT_FILE, "r", encoding="utf-8"))
    except: return {}

def save(data):
    json.dump(data, open(OUTPUT_FILE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

with open(VOCAB_FILE, "r", encoding="utf-8") as f:
    content = f.read()
pattern = re.compile(r'han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)"', re.DOTALL)
words = []
for m in pattern.finditer(content):
    words.append({"han": m.group(1), "pinyin": m.group(2), "meaning": m.group(3)})

print(f"Total: {len(words)}")
existing = load_existing()
ok_count = sum(1 for v in existing.values() if v and v != "none")
print(f"Done: {len(existing)}, Images: {ok_count}")

remaining = [w for w in words if w["han"] not in existing]
print(f"Remaining: {len(remaining)}")

BATCH = int(sys.argv[1]) if len(sys.argv) > 1 else 10

for i, w in enumerate(remaining[:BATCH]):
    meaning = w["meaning"]
    keyword = re.split(r'[,\/(]', meaning)[0].strip()
    keyword_url = keyword.replace(' ', '_')
    
    found = False
    for lang in ['vi', 'en']:
        url = f"https://{lang}.wikipedia.org/wiki/{keyword_url}"
        
        # Use -o flag to save to file
        result = subprocess.run(
            ['z-ai', 'function', '-n', 'page_reader', '-a', json.dumps({"url": url}), '-o', TMP_FILE],
            capture_output=True, text=True, timeout=30
        )
        
        if os.path.exists(TMP_FILE):
            try:
                data = json.load(open(TMP_FILE, 'r', encoding='utf-8'))
                html = data.get('data', {}).get('html', '')
                
                # Find images - filter out icons/logos
                imgs = re.findall(r'src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(?:jpg|jpeg|png))"', html, re.IGNORECASE)
                good = [img for img in imgs if not any(x in img.lower() for x in [
                    'logo', 'icon', 'symbol', 'disambig', 'wiktionary', 'question_book',
                    'semi-protection', 'crystal', 'closewindow', 'tick', 'ambox'
                ])]
                
                if good:
                    img_url = "https:" + good[0]
                    existing[w["han"]] = img_url
                    print(f"  [{i+1}/{BATCH}] {w['han']} ({lang}) OK")
                    found = True
                    break
            except:
                pass
            finally:
                try: os.remove(TMP_FILE)
                except: pass
    
    if not found:
        existing[w["han"]] = "none"
        print(f"  [{i+1}/{BATCH}] {w['han']} --")
    
    save(existing)
    time.sleep(2)

ok = sum(1 for v in existing.values() if v and v != "none")
print(f"\n=== {len(existing)}/{len(words)} done, {ok} images ===")
