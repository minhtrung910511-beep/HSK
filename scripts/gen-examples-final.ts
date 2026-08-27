import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

interface Result { id: number; pinyin: string; example: string; examplePinyin: string; exampleVi: string; }

async function main() {
  const VOCAB = (await import('../src/lib/vocab-data')).VOCAB;
  const newWords = VOCAB.filter(w => w.id > 279);
  console.log(`Cần xử lý: ${newWords.length}`);

  const BATCH = 5;
  const results: Record<number, Result> = {};
  try {
    Object.assign(results, JSON.parse(fs.readFileSync('/tmp/hsk1_examples_v2.json', 'utf-8')));
    console.log(`Resumed: ${Object.keys(results).length}`);
  } catch {}

  const remaining = newWords.filter(w => !results[w.id]);
  console.log(`Remaining: ${remaining.length}`);
  if (!remaining.length) { console.log('Done!'); return; }

  const zai = await ZAI.create();
  for (let i = 0; i < remaining.length; i += BATCH) {
    const batch = remaining.slice(i, i + BATCH);
    console.log(`\nBatch ${Math.floor(i/BATCH)+1} (${i+1}-${i+batch.length})`);
    const wl = batch.map(w => `${w.id}. ${w.han} (${w.pinyin} - ${w.meaning})`).join('\n');
    
    try {
      const r = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Bạn là chuyên gia tiếng Trung HSK. Trả về JSON hợp lệ.' },
          { role: 'user', content: `Cung cấp pinyin chuẩn + 1 câu ví dụ (5-12 chữ) + dịch TV cho:\n${wl}\n\nTrả về JSON: [{"id":1,"pinyin":"...","example":"...","examplePinyin":"...","exampleVi":"..."}]` },
        ],
        temperature: 0.3,
      });
      const text = r.choices[0]?.message?.content || '';
      const m = text.match(/\[[\s\S]*\]/);
      if (m) {
        for (const item of JSON.parse(m[0])) {
          if (item.id && item.example) { results[item.id] = item; console.log(`  ✓ ${item.id}: ${item.example.substring(0,30)}`); }
        }
      }
    } catch (e: any) {
      if (e?.message?.includes('429')) { console.log('  429, đợi 15s...'); await new Promise(r=>setTimeout(r,15000)); i -= BATCH; continue; }
      console.log('  Error:', e?.message?.substring(0,50));
    }
    fs.writeFileSync('/tmp/hsk1_examples_v2.json', JSON.stringify(results, null, 2));
    await new Promise(r => setTimeout(r, 3000));
  }
  console.log(`\nDone: ${Object.keys(results).length}/${newWords.length}`);
}
main().catch(e => { console.error(e); process.exit(1); });
