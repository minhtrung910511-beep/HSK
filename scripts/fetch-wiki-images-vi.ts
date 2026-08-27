// Script: Fetch ảnh Wikipedia cho từ vựng HSK1 - dùng Wikipedia tiếng Việt
// Chạy: bun /home/z/my-project/scripts/fetch-wiki-images-vi.ts

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import { VOCAB } from '../src/lib/vocab-data';

const OUTPUT_FILE = '/tmp/wiki_images_vi.json';
const BATCH_SIZE = 15;
const DELAY_MS = 1500;

function loadExisting(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function save(data: Record<string, string>) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
}

// Chuyển nghĩa TV thành URL Wikipedia tiếng Việt
function meaningToUrl(meaning: string): string {
  // Lấy từ đầu tiên trước dấu phẩy/dấu chéo
  let keyword = meaning.split(/[,\/\(]/)[0].trim();
  // Xóa dấu cách thừa
  keyword = keyword.replace(/\s+/g, '_');
  // Encode
  return `https://vi.wikipedia.org/wiki/${encodeURIComponent(keyword)}`;
}

async function fetchImageForWord(zai: any, meaning: string): Promise<string | null> {
  try {
    const url = meaningToUrl(meaning);
    const result = await zai.functions.invoke('page_reader', { url });

    const html = result?.data?.html || '';
    // Tìm ảnh 250px hoặc 300px
    const matches = html.match(/src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+(?:250px|300px|320px)[^"]+\.(?:jpg|jpeg|png))"/i);
    if (matches && matches[1]) {
      return 'https:' + matches[1];
    }
    // Thử ảnh bất kỳ
    const matches2 = html.match(/src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+\.(?:jpg|jpeg|png))"/i);
    if (matches2 && matches2[1]) {
      return 'https:' + matches2[1];
    }
    return null;
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Tổng số từ HSK1: ${VOCAB.length}`);

  const existing = loadExisting();
  const existingCount = Object.keys(existing).length;
  console.log(`Đã xử lý: ${existingCount}`);

  const remaining = VOCAB.filter(w => !existing[w.han]);
  console.log(`Còn ${remaining.length} từ cần fetch`);

  if (remaining.length === 0) {
    console.log('✅ Đã hoàn thành!');
    const withImg = Object.entries(existing).filter(([_, u]) => u && u !== 'none').length;
    console.log(`Có ảnh: ${withImg}/${VOCAB.length}`);
    return;
  }

  const zai = await ZAI.create();
  let count = 0;

  for (let i = 0; i < remaining.length; i++) {
    const word = remaining[i];
    count++;

    console.log(`[${count}/${remaining.length}] ${word.han} → tìm "${word.meaning}"...`);

    const imageUrl = await fetchImageForWord(zai, word.meaning);

    if (imageUrl) {
      existing[word.han] = imageUrl;
      console.log(`  ✅ Found!`);
    } else {
      existing[word.han] = 'none';
      console.log(`  ❌ No image`);
    }

    save(existing);

    if (i + 1 < remaining.length) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }

    if (count >= BATCH_SIZE) {
      console.log(`\n⏸️ Batch limit (${BATCH_SIZE}). Còn ${remaining.length - count} từ.`);
      break;
    }
  }

  const withImg = Object.entries(existing).filter(([_, u]) => u && u !== 'none').length;
  const total = Object.keys(existing).length;
  console.log(`\n=== TỔNG KẾT ===`);
  console.log(`Đã xử lý: ${total}/${VOCAB.length}`);
  console.log(`Có ảnh: ${withImg}`);
}

main().catch(e => { console.error('Error:', e); process.exit(1); });
