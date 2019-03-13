const { Client } = require('pg');
const uuid = require('uuid/v4');

const db = new Client({
  host: 'localhost',
  database: 'dd',
  user: 'dd',
  password: 'dd',
});

async function patch() {
  await db.connect();

  let idx = 0;

  const { rows } = await db.query(`SELECT * FROM "Concepts"`);

  for (const row of rows) {
    const history = await db.query(`SELECT * FROM "ConceptHistories" WHERE "ConceptId" = '${row.Id}'`);

    if (history.rows.length === 0) {
      // Create History
      await db.query(
        `
      INSERT INTO "ConceptHistories"
        ("Id", "UserId", "DateTime", "ActionType", "ActionSource", "ConceptId", "Name", "Content", "ImageId", "Fields", "Tags", "ConceptTypeId")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          uuid(),
          row.UserId,
          new Date().toUTCString(),
          0,
          0,
          row.Id,
          row.Name,
          JSON.stringify(row.Content),
          row.ImageId,
          JSON.stringify(row.Fields),
          row.Tags,
          row.ConceptTypeId,
        ]
      );
    }

    console.log(++idx, '/', rows.length);
  }

  await db.end();
}

patch();
