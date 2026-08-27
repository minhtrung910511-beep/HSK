import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Test create with float
  const created = await prisma.score.create({
    data: {
      userId: 'cmrvizfpc000wojsk37tzbehl',
      module: 'flashcard_review',
      score: 1266.3,
      detail: JSON.stringify({ test_direct_prisma: true }),
    }
  });
  console.log('Created score:', created.score, 'type:', typeof created.score);
  
  // Read it back
  const found = await prisma.score.findUnique({ where: { id: created.id } });
  console.log('Found score:', found.score, 'type:', typeof found.score);
  
  // Cleanup
  await prisma.score.delete({ where: { id: created.id } });
}
main().then(() => prisma.$disconnect()).catch(e => { console.error(e); process.exit(1); });
