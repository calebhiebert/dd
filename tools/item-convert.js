const fs = require('fs');
const { Client } = require('pg');
const uuid = require('uuid/v4');
const { convertHtmlToDelta } = require('node-quill-converter');
const marked = require('marked');
const nanoid = require('nanoid');

// Load spells
const magicitems = JSON.parse(fs.readFileSync('./magicitems.json'));

const CAMPAIGN_ID = 'ff126e57-cdc9-40cd-b9fd-f1f2f522ff64';
const USER_ID = 'google-oauth2|115793422235026993679';

const db = new Client({
  host: 'localhost',
  database: 'dd',
  user: 'dd',
  password: 'dd',
});

async function convert() {
  await db.connect();

  let idx = 0;

  for (const spell of magicitems) {
    const html = marked(spell.desc);
    const delta = convertHtmlToDelta(html);

    const { name, type, rarity } = spell;

    function bulletPoint(a, b) {
      return [
        { insert: `${a} - ` },
        { insert: `${b}`, attributes: { bold: true } },
        { insert: '\n', attributes: { list: 'bullet' } },
      ];
    }

    delta.ops.push({ insert: '\n' });
    delta.ops.push(...bulletPoint('Type', type));
    delta.ops.push(...bulletPoint('Rarity', rarity));

    const id = uuid();
    const tags = [type];

    const res = await db.query(
      `INSERT INTO "Items" ("Id", "Name", "CampaignId", "UserId", "Tags", "PlayerVisible", "Content", "Rarity", "Cost", "Weight") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        id,
        name.substring(0, 30),
        CAMPAIGN_ID,
        USER_ID,
        `{${tags.join(', ')}}`,
        true,
        delta,
        0,
        0,
        0,
      ]
    );

    console.log(++idx, '/', magicitems.length);
  }

  await db.end();
}

convert();
