const fs = require('fs');
const { Client } = require('pg');
const uuid = require('uuid/v4');
const { convertHtmlToDelta } = require('node-quill-converter');
const marked = require('marked');

// Load spells
const items = JSON.parse(fs.readFileSync('./magicitems.json'));

const CONCEPT_TYPE_ID = 'e2e8442f-88b2-4658-9b05-73cdde2c4609';
const USER_ID = 'google-oauth2|115793422235026993679';

const db = new Client({
  host: 'localhost',
  database: 'dd',
  user: 'dd',
  password: 'dd',
});

function getDelta(md) {
  return convertHtmlToDelta(marked(md));
}

async function convert() {
  await db.connect();

  let idx = 0;

  for (const item of items) {
    const {
      name,
      desc,
      type,
      rarity,
    } = item;

    const id = uuid();
    const tags = [type, rarity];
    const fields = [];

    if (type) {
      fields.push({
        Name: 'Type',
        value: type,
      })
    }

    if (rarity) {
      fields.push({
        Name: 'Rarity',
        value: rarity,
      })
    }

    if (item['requires-attunement']) {
      fields.push({
        Name: 'Requires Attunement',
        value: item['requires-attunement'],
      })
    }

    const res = await db.query(
      `INSERT INTO "Concepts" ("Id", "Name", "Content", "UserId", "Fields", "Tags", "ConceptTypeId") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, name.substring(0, 30), getDelta(desc), USER_ID, JSON.stringify(fields), `{${tags.join(', ')}}`, CONCEPT_TYPE_ID]
    );

    console.log(++idx, '/', items.length);
  }

  await db.end();
}

convert();
