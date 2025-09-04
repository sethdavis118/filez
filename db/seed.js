import db from "#db/client";
import { createFile } from "./queries/files.js";
import { createFolder } from "./queries/folders.js";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  console.log("beginning loop");
  for (let i = 0; i < 3; i++) {
    const folderName = faker.company.name();
    const id = await createFolder(folderName);
    for (let j = 0; j < 5; j++) {
      await createFile(
        faker.system.commonFileName(),
        faker.number.int({ min: 15, max: 100 }),
        id
      );
    }
  }
  console.log("finished loop");
}
