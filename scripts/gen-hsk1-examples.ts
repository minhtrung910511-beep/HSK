import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import { VOCAB } from '../src/lib/vocab-data';

interface Result {
  id: number;
  pinyin: string;
  example: string;
  examplePinyin: string;
  exampleVi: string;
}

async function main() {
  // Lọc 147 từ mới (id > 279)
  const newWords = VOCAB.filter(w => w.id > 279);
  console.log(`Từ cần xử lý: ${newWords.length}`);

  const BATCH = 5;
  const results: Record<number, Result> = {};
  
  // Resume
  try {
    const saved = JSON.parse(fs.readFileSync('/tmp/hsk1_new_examples.json', 'utf-8'));
    Object.assign(results, saved);
    console.log(`Resumed: ${Object.keys(results).length}`);
  } catch {}

  const remaining = newWords.filter(w => !results[w.id]);
  console.log(`Remaining: ${remaining.length}`);

  const zai = await ZAI.create();

  for (let i = 0; i < remaining.length; i += BATCH) {
    const batch = remaining.slice(i, i + BATCH);
    console.log(`\n=== Batch ${Math.floor(i/BATCH)+1} (${i+1}-${i+batch.length}) ===`);

    const wordList = batch.map(w => `${w.id}. ${w.han} (hiện tại: ${w.pinyin} - ${w.meaning})`).join('\n');
    
    const prompt = `Bạn là chuyên gia tiếng Trung HSK. Cung cấp thông tin CHÍNH XÁC cho các từ sau:

YÊU CẦU:
1. pinyin: phiên âm chuẩn có dấu
2. example: 1 câu ví dụ tiếng Trung NGẮN (5-12 chữ)
3. examplePinyin: phiên âm câu ví dụ
4. exampleVi: dịch tiếng Việt

Trả về JSON array: [{"id":1,"pinyin":"...","example":"...","examplePinyin":"...","exampleVi":"..."}]

Từ:
${wordList}

Chỉ trả về JSON:`;

    try {
      const resp = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Bạn là chuyên gia tiếng Trung. Luôn trả về JSON hợp lệ.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
      });

      const text = resp.choices[0]?.message?.content || '';
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as Result[];
        for (const item of parsed) {
          if (item.id && item.example) {
            results[item.id] = item;
            console.log(`  ✓ ID ${item.id}: ${item.example.substring(0, 30)}`);
          }
        }
      }
    } catch (e: any) {
      if (e?.message?.includes('429')) {
        console.log('  Rate limit, đợi 15s...');
        await new Promise(r => setTimeout(r, 15000));
        i -= BATCH; // retry
        continue;
      }
      console.log('  Error:', e?.message?.substring(0, 50));
    }

    fs.writeFileSync('/tmp/hsk1_new_examples.json', JSON.stringify(results, null, 2));
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\n=== Done: ${Object.keys(results).length}/${newWords.length} ===`);
}

main().catch(e => { console.error(e); process.exit(1); });
