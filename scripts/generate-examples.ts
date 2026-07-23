// Script: Dùng LLM để sinh pinyin + câu ví dụ cho các từ vựng
// Chạy: bun /home/z/my-project/scripts/generate-examples.ts

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

interface VocabWord {
  id: number;
  han: string;
  pinyin: string;
  meaning: string;
  pos: string;
  emoji: string;
  example: string;
  examplePinyin: string;
  exampleVi: string;
  topic: string;
}

// Đọc file vocab-data.ts để extract tất cả từ
function readVocab(): VocabWord[] {
  const content = fs.readFileSync('/home/z/my-project/src/lib/vocab-data.ts', 'utf-8');
  // Pattern: { id: X, han: "Y", pinyin: "Z", meaning: "W", pos: "...", emoji: "...", example: "...", examplePinyin: "...", exampleVi: "...", topic: "..." }
  const pattern = /\{\s*id:\s*(\d+),\s*han:\s*"([^"]+)",\s*pinyin:\s*"([^"]+)",\s*meaning:\s*"([^"]+)",\s*pos:\s*"([^"]+)",\s*emoji:\s*"([^"]*)",\s*example:\s*"([^"]+)",\s*examplePinyin:\s*"([^"]+)",\s*exampleVi:\s*"([^"]+)",\s*topic:\s*"([^"]+)"\s*\}/g;
  const words: VocabWord[] = [];
  let m;
  while ((m = pattern.exec(content)) !== null) {
    words.push({
      id: parseInt(m[1]),
      han: m[2],
      pinyin: m[3],
      meaning: m[4],
      pos: m[5],
      emoji: m[6],
      example: m[7],
      examplePinyin: m[8],
      exampleVi: m[9],
      topic: m[10],
    });
  }
  return words;
}

async function generateExamplesForBatch(
  zai: any,
  words: VocabWord[]
): Promise<Map<number, { pinyin: string; example: string; examplePinyin: string; exampleVi: string }>> {
  const results = new Map<number, { pinyin: string; example: string; examplePinyin: string; exampleVi: string }>();

  // Tạo prompt với danh sách từ
  const wordList = words.map(w => `${w.id}. ${w.han} (hiện tại: ${w.pinyin} - ${w.meaning})`).join('\n');

  const prompt = `Bạn là chuyên gia tiếng Trung. Hãy cung cấp thông tin CHÍNH XÁC cho các từ vựng HSK1 sau.

YÊU CẦU cho mỗi từ:
1. pinyin: phiên âm chuẩn có dấu (vd: nǐ hǎo)
2. example: 1 câu ví dụ tiếng Trung NGẮN GỌN, THỰC TẾ (5-12 chữ)
3. examplePinyin: phiên âm câu ví dụ (có dấu, cách chữ bằng space)
4. exampleVi: dịch sang tiếng Việt tự nhiên

QUY TẮC:
- Pinyin phải CHUẨN (vd: "a" có thể là ā, á, ǎ, à, a - chọn đúng thanh điệu)
- Câu ví dụ phải dùng từ đó trong ngữ cảnh thực tế
- Đừng copy câu ví dụ cũ nếu nó quá đơn điệu (chỉ là "từ + 。")
- Trả về JSON array, mỗi phần tử có: id, pinyin, example, examplePinyin, exampleVi

Danh sách ${words.length} từ:
${wordList}

Trả về CHỈ JSON array, không kèm giải thích:`;

  console.log(`  Gửi prompt cho ${words.length} từ...`);

  // Retry 3 lần với delay tăng dần
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Bạn là chuyên gia tiếng Trung HSK. Luôn trả về JSON hợp lệ.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
      });

      const text = response.choices[0]?.message?.content || '';

      // Extract JSON từ response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error(`  Lần ${attempt}: Không tìm thấy JSON trong response`);
        console.error('  Response (first 300):', text.substring(0, 300));
        if (attempt < 3) {
          console.log(`  Đợi ${attempt * 5}s rồi thử lại...`);
          await new Promise(r => setTimeout(r, attempt * 5000));
          continue;
        }
        return results;
      }

      const parsed = JSON.parse(jsonMatch[0]) as Array<{
        id: number;
        pinyin: string;
        example: string;
        examplePinyin: string;
        exampleVi: string;
      }>;

      for (const item of parsed) {
        if (item.id && item.pinyin && item.example && item.examplePinyin && item.exampleVi) {
          results.set(item.id, {
            pinyin: item.pinyin.trim(),
            example: item.example.trim(),
            examplePinyin: item.examplePinyin.trim(),
            exampleVi: item.exampleVi.trim(),
          });
        }
      }

      console.log(`  Đã nhận ${results.size}/${words.length} kết quả`);
      return results;
    } catch (e: any) {
      const is429 = e?.message?.includes('429') || e?.message?.includes('Too many requests');
      if (is429) {
        console.log(`  Lần ${attempt}: Bị rate limit (429)`);
        if (attempt < 3) {
          const waitTime = attempt * 15000; // 15s, 30s
          console.log(`  Đợi ${waitTime / 1000}s rồi thử lại...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }
        console.error('  Hết lượt retry, bỏ qua batch này');
        return results;
      }
      console.error(`  Lần ${attempt}: Lỗi khác:`, e?.message || e);
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, 3000));
        continue;
      }
      return results;
    }
  }

  return results;
}

async function main() {
  console.log('Đọc vocab-data.ts...');
  const allWords = readVocab();
  console.log(`Tổng số từ: ${allWords.length}`);

  // Lọc các từ cần cập nhật:
  // - Câu ví dụ hiện tại quá ngắn (chỉ là "từ + 。")
  // - Hoặc examplePinyin chỉ là "pinyin + ."
  const wordsToUpdate = allWords.filter(w => {
    const ex = w.example.trim();
    const pinyin = w.examplePinyin.trim();
    // Câu ví dụ chỉ có từ + 。 (vd: "叫。")
    const isTrivialExample = ex === `${w.han}。` || ex === `${w.han} ` || (ex.length <= w.han.length + 2 && ex.startsWith(w.han));
    // Pinyin ví dụ chỉ là pinyin từ + .
    const isTrivialPinyin = pinyin === `${w.pinyin}.` || pinyin === `${w.pinyin} .`;
    return isTrivialExample || isTrivialPinyin;
  });

  console.log(`Cần cập nhật: ${wordsToUpdate.length} từ`);
  console.log('Ví dụ từ cần cập nhật:');
  wordsToUpdate.slice(0, 5).forEach(w => {
    console.log(`  ${w.han} | pinyin: ${w.pinyin} | ex: "${w.example}" | exp: "${w.examplePinyin}" | exv: "${w.exampleVi}"`);
  });

  // Save list để review
  fs.writeFileSync('/tmp/words_to_update.json', JSON.stringify(wordsToUpdate, null, 2));

  const zai = await ZAI.create();

  // Chia thành batch 3 từ/batch để tránh timeout
  const BATCH_SIZE = 3;
  const allResults = new Map<number, { pinyin: string; example: string; examplePinyin: string; exampleVi: string }>();

  // Resume từ batch đã làm (nếu có)
  const intermediatePath = `/tmp/vocab_examples_partial.json`;
  if (fs.existsSync(intermediatePath)) {
    try {
      const saved = JSON.parse(fs.readFileSync(intermediatePath, 'utf-8'));
      for (const id of Object.keys(saved)) {
        allResults.set(parseInt(id), saved[id]);
      }
      console.log(`Resumed ${allResults.size} results từ lần trước`);
    } catch (e) {
      console.log('Không thể resume, bắt đầu lại');
    }
  }

  // Lọc ra các từ chưa có kết quả
  const remaining = wordsToUpdate.filter(w => !allResults.has(w.id));
  console.log(`Còn ${remaining.length} từ cần xử lý`);

  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const batch = remaining.slice(i, i + BATCH_SIZE);
    console.log(`\n=== Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(remaining.length / BATCH_SIZE)} (từ ${i + 1}-${i + batch.length}) ===`);

    const batchResults = await generateExamplesForBatch(zai, batch);

    // Merge results
    for (const [id, data] of batchResults) {
      allResults.set(id, data);
    }

    // Lưu intermediate results
    const intermediateObj: Record<string, any> = {};
    for (const [id, data] of allResults) {
      intermediateObj[id] = data;
    }
    fs.writeFileSync(intermediatePath, JSON.stringify(intermediateObj, null, 2));

    // Delay để tránh rate limit
    if (i + BATCH_SIZE < remaining.length) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n=== TỔNG KẾT ===`);
  console.log(`Đã sinh ví dụ cho ${allResults.size}/${wordsToUpdate.length} từ`);
  console.log(`Kết quả lưu tại: /tmp/vocab_examples_partial.json`);
}

main().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
