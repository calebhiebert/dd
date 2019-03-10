const fs = require('fs');
const { Client } = require('pg');
const uuid = require('uuid/v4');
const { convertHtmlToDelta } = require('node-quill-converter');
const marked = require('marked');

// Load spells
const spells = JSON.parse(fs.readFileSync('./spells.json'));

const CONCEPT_TYPE_ID = '9fb01c87-0b93-4611-bf46-5fc6494e1db2';
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

function getComponents(cmp) {
  return cmp.split(',').map(c => c.trim().toUpperCase());
}

function getClass(clss) {
  return clss.split(',').map(c => c.trim());
}

async function convert() {
  await db.connect();

  let idx = 0;

  for (const spell of spells) {
    const {
      name,
      desc,
      higher_level,
      page,
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
      archetype,
      circles,
      domains,
      oaths,
      patrons
    } = spell;

    const id = uuid();
    const tags = [`Level: ${level_int}`, `School: ${school}`];
    const fields = [];

    if (higher_level) {
      fields.push({
        Name: 'Higher Level',
        value: getDelta(higher_level),
      })
    }

    if (range) {
      fields.push({
        Name: 'Range',
        value: range,
      })
    }

    if (components) {
      fields.push({
        Name: 'Components',
        value: getComponents(components),
      })
    }

    if (material) {
      fields.push({
        Name: 'Material',
        value: material,
      })
    }

    if (ritual) {
      fields.push({
        Name: 'Ritual',
        value: ritual,
      })
    }

    if (duration) {
      fields.push({
        Name: 'Duration',
        value: duration,
      })
    }

    if (concentration) {
      fields.push({
        Name: 'Concentration',
        value: concentration === 'yes' ? true : false,
      })
    }

    if (archetype) {
      fields.push({
        Name: 'Archetype',
        value: archetype,
      })
    }

    if (circles) {
      fields.push({
        Name: 'Circles',
        value: circles,
      })
    }

    if (domains) {
      fields.push({
        Name: 'Domains',
        value: domains,
      })
    }

    if (oaths) {
      fields.push({
        Name: 'Oaths',
        value: oaths,
      })
    }

    if (patrons) {
      fields.push({
        Name: 'Patrons',
        value: patrons,
      })
    }

    if (casting_time) {
      fields.push({
        Name: 'Casting Time',
        value: casting_time,
      })
    }

    if (spell.class) {
      fields.push({
        Name: 'Class',
        value: getClass(spell.class)
      })
    }

    const res = await db.query(
      `INSERT INTO "Concepts" ("Id", "Name", "Content", "UserId", "Fields", "Tags", "ConceptTypeId") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, name, getDelta(desc), USER_ID, JSON.stringify(fields), `{${tags.join(', ')}}`, CONCEPT_TYPE_ID]
    );

    console.log(++idx, '/', spells.length);
  }

  await db.end();
}

convert();
