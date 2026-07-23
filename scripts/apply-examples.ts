// Script: Apply examples từ /tmp/vocab_examples_partial.json vào vocab-data.ts
import fs from 'fs';

interface ExampleData {
  pinyin: string;
  example: string;
  examplePinyin: string;
  exampleVi: string;
}

function main() {
  console.log('Đọc ví dụ từ /tmp/vocab_examples_partial.json...');
  const examples: Record<string, ExampleData> = JSON.parse(
    fs.readFileSync('/tmp/vocab_examples_partial.json', 'utf-8')
  );
  console.log(`Có ${Object.keys(examples).length} từ cần cập nhật`);

  console.log('Đọc vocab-data.ts...');
  const content = fs.readFileSync('/home/z/my-project/src/lib/vocab-data.ts', 'utf-8');

  let updatedCount = 0;
  let newContent = content;

  for (const [idStr, data] of Object.entries(examples)) {
    const id = parseInt(idStr);
    // Tìm entry có id này
    // Pattern: { id: X, han: "Y", pinyin: "OLD_PINYIN", meaning: "W", pos: "P", emoji: "E", example: "OLD_EX", examplePinyin: "OLD_EXP", exampleVi: "OLD_EXV", topic: "T" }
    const idPattern = new RegExp(
      `(\\{\\s*id:\\s*${id},\\s*han:\\s*"[^"]+",\\s*pinyin:\\s*")([^"]+)(",\\s*meaning:\\s*"[^"]+",\\s*pos:\\s*"[^"]+",\\s*emoji:\\s*"[^"]*",\\s*example:\\s*")([^"]*)(",\\s*examplePinyin:\\s*")([^"]*)(",\\s*exampleVi:\\s*")([^"]*)(",\\s*topic:\\s*")`,
      's'
    );

    const match = newContent.match(idPattern);
    if (!match) {
      console.log(`  ✗ Không tìm thấy từ id ${id}`);
      continue;
    }

    // Escape các giá trị mới
    const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

    const newPinyin = escape(data.pinyin);
    const newExample = escape(data.example);
    const newExamplePinyin = escape(data.examplePinyin);
    const newExampleVi = escape(data.exampleVi);

    // Thay thế
    const oldFull = match[0];
    const newFull = oldFull
      .replace(`pinyin: "${match[2]}"`, `pinyin: "${newPinyin}"`)
      .replace(`example: "${match[4]}"`, `example: "${newExample}"`)
      .replace(`examplePinyin: "${match[6]}"`, `examplePinyin: "${newExamplePinyin}"`)
      .replace(`exampleVi: "${match[8]}"`, `exampleVi: "${newExampleVi}"`);

    newContent = newContent.replace(oldFull, newFull);
    updatedCount++;
    console.log(`  ✓ ID ${id}: ${data.example}`);
  }

  // Ghi lại
  fs.writeFileSync('/home/z/my-project/src/lib/vocab-data.ts', newContent);
  console.log(`\n=== Đã cập nhật ${updatedCount}/${Object.keys(examples).length} từ ===`);
}

main();
