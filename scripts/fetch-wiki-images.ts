// Script: Fetch ảnh Wikipedia cho từ vựng HSK1
// Chạy: bun /home/z/my-project/scripts/fetch-wiki-images.ts
// Có thể chạy nhiều lần - tự resume từ chỗ đã dừng

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import { VOCAB } from '../src/lib/vocab-data';

const OUTPUT_FILE = '/tmp/wiki_images.json';
const BATCH_SIZE = 5; // 5 từ mỗi lần
const DELAY_MS = 3000; // 3s giữa mỗi từ

function loadExisting(): Record<string, string> {
  try {
    const raw = fs.readFileSync(OUTPUT_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function save(data: Record<string, string>) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
}

async function fetchImageForWord(zai: any, han: string): Promise<string | null> {
  try {
    const result = await zai.functions.invoke('page_reader', {
      url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(han)}`,
    });

    const html = result?.data?.html || '';
    // Tìm ảnh đầu tiên có kích thước 250px từ Wikimedia Commons
    const matches = html.match(/src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+(?:250px|300px)[^"]+\.jpg)"/);
    if (matches && matches[1]) {
      return 'https:' + matches[1];
    }
    // Thử tìm ảnh bất kỳ từ Wikimedia
    const matches2 = html.match(/src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+\.jpg)"/);
    if (matches2 && matches2[1]) {
      return 'https:' + matches2[1];
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function main() {
  console.log(`Tổng số từ HSK1: ${VOCAB.length}`);

  const existing = loadExisting();
  console.log(`Đã có ảnh: ${Object.keys(existing).length}`);

  // Lọc từ chưa có ảnh
  const remaining = VOCAB.filter(w => !existing[w.han]);
  console.log(`Còn ${remaining.length} từ cần fetch`);

  if (remaining.length === 0) {
    console.log('✅ Đã hoàn thành!');
    return;
  }

  const zai = await ZAI.create();
  let count = 0;

  for (let i = 0; i < remaining.length; i++) {
    const word = remaining[i];
    count++;

    console.log(`[${count}/${remaining.length}] Fetching: ${word.han} (${word.pinyin})...`);

    const imageUrl = await fetchImageForWord(zai, word.han);

    if (imageUrl) {
      existing[word.han] = imageUrl;
      console.log(`  ✅ ${imageUrl.substring(0, 80)}...`);
    } else {
      existing[word.han] = "none"; // Đánh dấu đã thử nhưng không có ảnh
      console.log(`  ❌ Không tìm thấy ảnh`);
    }

    // Save sau mỗi từ
    save(existing);

    // Delay
    if (i + 1 < remaining.length) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }

    // Nếu đã fetch BATCH_SIZE từ, dừng để tránh rate limit
    if (count >= BATCH_SIZE) {
      console.log(`\n⏸️ Đã fetch ${BATCH_SIZE} từ. Chạy lại script để tiếp tục.`);
      console.log(`Còn ${remaining.length - count} từ`);
      break;
    }
  }

  const withImage = Object.entries(existing).filter(([_, url]) => url && url !== "none").length;
  const total = Object.keys(existing).length;
  console.log(`\n=== TỔNG KẾT ===`);
  console.log(`Đã xử lý: ${total}/${VOCAB.length}`);
  console.log(`Có ảnh: ${withImage}`);
  console.log(`Không có ảnh: ${total - withImage}`);
}

main().catch(e => { console.error('Error:', e); process.exit(1); });
