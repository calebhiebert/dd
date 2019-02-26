const fs = require('fs');
const { Client } = require('pg');
const uuid = require('uuid/v4');
const { convertHtmlToDelta } = require('node-quill-converter');
const marked = require('marked');
const nanoid = require('nanoid');

// Load spells
const spells = JSON.parse(fs.readFileSync('./spells.json'));

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

  for (const spell of spells) {
    const html = marked(spell.desc);
    const delta = convertHtmlToDelta(html);

    const {
      name,
      range,
      components,
      material,
      ritual,
      duration,
      concentration,
      casting_time,
      level,
      level_int,
      school,
    } = spell;

    function bulletPoint(a, b) {
      return [
        { insert: `${a} - ` },
        { insert: `${b}`, attributes: { bold: true } },
        { insert: '\n', attributes: { list: 'bullet' } },
      ];
    }

    delta.ops.push({ insert: '\n' });
    delta.ops.push(...bulletPoint('Range', range));
    delta.ops.push(...bulletPoint('Components', components));
    delta.ops.push(...bulletPoint('Material', material));
    delta.ops.push(...bulletPoint('Ritual', ritual));
    delta.ops.push(...bulletPoint('Duration', duration));
    delta.ops.push(...bulletPoint('Concentration', concentration));
    delta.ops.push(...bulletPoint('Casting Time', casting_time));
    delta.ops.push(...bulletPoint('Level', level));

    const id = uuid();
    const tags = [`Level: ${level_int}`, `School: ${school}`];

    spell.class.split(', ').forEach((c) => tags.push(`Class: ${c}`));

    const res = await db.query(
      `INSERT INTO "Spells" ("Id", "Name", "CampaignId", "UserId", "Tags", "PlayerVisible", "Content") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, name, CAMPAIGN_ID, USER_ID, `{${tags.join(', ')}}`, true, delta]
    );

    console.log(++idx, '/', spells.length);
  }

  await db.end();
}

convert();
