// Script: Sinh câu ví dụ cho HSK2 bằng LLM
// Chạy: bun /home/z/my-project/scripts/generate-hsk2-examples.ts

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import { VOCAB_HSK2 } from '../src/lib/vocab-data-hsk2';

interface ExampleData {
  pinyin: string;
  example: string;
  examplePinyin: string;
  exampleVi: string;
}

async function generateExamplesForBatch(
  zai: any,
  words: typeof VOCAB_HSK2
): Promise<Map<number, ExampleData>> {
  const results = new Map<number, ExampleData>();

  const wordList = words.map(w => `${w.id}. ${w.han} (pinyin hiện tại: ${w.pinyin} - ${w.meaning})`).join('\n');

  const prompt = `Bạn là chuyên gia tiếng Trung HSK. Hãy cung cấp thông tin CHÍNH XÁC cho các từ vựng HSK2 sau.

YÊU CẦU cho mỗi từ:
1. pinyin: phiên âm chuẩn có dấu (vd: chǎnpǐn)
2. example: 1 câu ví dụ tiếng Trung NGẮN GỌN, THỰC TẾ (5-12 chữ)
3. examplePinyin: phiên âm câu ví dụ (có dấu, cách chữ bằng space)
4. exampleVi: dịch sang tiếng Việt tự nhiên

QUY TẮC:
- Pinyin phải CHUẨN thanh điệu
- Câu ví dụ phải dùng từ đó trong ngữ cảnh thực tế
- Trả về JSON array, mỗi phần tử có: id, pinyin, example, examplePinyin, exampleVi

Danh sách ${words.length} từ:
${wordList}

Trả về CHỈ JSON array:`;

  console.log(`  Gửi prompt cho ${words.length} từ...`);

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
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error(`  Lần ${attempt}: Không tìm thấy JSON`);
        if (attempt < 3) {
          await new Promise(r => setTimeout(r, attempt * 5000));
          continue;
        }
        return results;
      }

      const parsed = JSON.parse(jsonMatch[0]) as Array<{
        id: number; pinyin: string; example: string; examplePinyin: string; exampleVi: string;
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
        console.log(`  Lần ${attempt}: Rate limit (429)`);
        if (attempt < 3) {
          const waitTime = attempt * 15000;
          console.log(`  Đợi ${waitTime / 1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }
        return results;
      }
      console.error(`  Lần ${attempt}:`, e?.message);
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
  console.log(`Tổng số từ HSK2: ${VOCAB_HSK2.length}`);

  const BATCH_SIZE = 3;
  const allResults = new Map<number, ExampleData>();

  // Resume
  const intermediatePath = '/tmp/hsk2_examples_partial.json';
  if (fs.existsSync(intermediatePath)) {
    try {
      const saved = JSON.parse(fs.readFileSync(intermediatePath, 'utf-8'));
      for (const id of Object.keys(saved)) {
        allResults.set(parseInt(id), saved[id]);
      }
      console.log(`Resumed ${allResults.size} results`);
    } catch (e) {}
  }

  const remaining = VOCAB_HSK2.filter(w => !allResults.has(w.id));
  console.log(`Còn ${remaining.length} từ cần xử lý`);

  const zai = await ZAI.create();

  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const batch = remaining.slice(i, i + BATCH_SIZE);
    console.log(`\n=== Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(remaining.length / BATCH_SIZE)} (từ ${i + 1}-${i + batch.length}) ===`);

    const batchResults = await generateExamplesForBatch(zai, batch);

    for (const [id, data] of batchResults) {
      allResults.set(id, data);
    }

    // Save intermediate
    const intermediateObj: Record<string, ExampleData> = {};
    for (const [id, data] of allResults) {
      intermediateObj[id] = data;
    }
    fs.writeFileSync(intermediatePath, JSON.stringify(intermediateObj, null, 2));

    if (i + BATCH_SIZE < remaining.length) {
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n=== TỔNG KẾT ===`);
  console.log(`Đã sinh ví dụ cho ${allResults.size}/${VOCAB_HSK2.length} từ`);
}

main().catch(e => { console.error('Error:', e); process.exit(1); });
