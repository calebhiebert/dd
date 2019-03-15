const { Client } = require('pg');

const db = new Client({
  host: 'localhost',
  database: 'dd',
  user: 'dd',
  password: 'dd',
});

async function patch() {
  await db.connect();

  let idx = 0;

  const { rows } = await db.query(`SELECT * FROM "Entities"`);

  for (const row of rows) {
    row.Fields = [];

    for (const attr of row.Attributes || []) {
      row.Fields.push({ Name: attr.Name, Value: attr.Data });
    }

    await db.query(`UPDATE "Entities" SET "Fields" = $1 WHERE "Entities"."Id" = $2`, [JSON.stringify(row.Fields), row.Id]);

    console.log(++idx, '/', rows.length);
  }

  await db.end();
}

patch();
