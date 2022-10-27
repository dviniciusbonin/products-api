import { createReadStream } from 'fs';
import { pipeline, Transform } from 'stream';
import { promisify } from 'util';
import * as csvtojson from 'csvtojson';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const pipelineAsync = promisify(pipeline);
  const readableStream = createReadStream('products.csv', {
    encoding: 'utf-8',
  });

  const transform = async (chunk, enconding, cb) => {
    const data = JSON.parse(chunk);
    console.log({ data });
    await prisma.product.create({
      data: {
        ...data,
        days_to_expiration: parseInt(data.days_to_expiration),
      },
    });
    cb();
  };

  const writableMapToDB = new Transform({
    transform,
  });

  await pipelineAsync(
    readableStream,
    csvtojson({
      delimiter: ',',
      trim: true,
      noheader: false,
      headers: ['name', 'days_to_expiration'],
    }),
    writableMapToDB,
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
