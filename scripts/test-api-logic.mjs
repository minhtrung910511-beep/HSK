// Test if the API's Math.floor logic correctly saves floats to DB
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Simulate what the API does
  const bodyScore = 1266.3; // This is what the client sends
  const score = Math.floor(parseFloat(bodyScore) * 10) / 10;
  console.log(`Input: ${bodyScore}, After Math.floor: ${score}`);

  // Save to DB
  const created = await prisma.score.create({
    data: {
      userId: 'cmrvizfpc000wojsk37tzbehl',
      module: 'flashcard_review',
      score: score,
      detail: JSON.stringify({ test_logic: true, original: bodyScore }),
    },
  });
  console.log(`Saved to DB: ${created.score}`);

  // Read back
  const found = await prisma.score.findUnique({ where: { id: created.id } });
  console.log(`Read from DB: ${found.score}`);

  // Cleanup
  await prisma.score.delete({ where: { id: created.id } });
  console.log('Cleaned up test entry');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); process.exit(1); });
