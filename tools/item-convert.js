const fs = require('fs');
const { Client } = require('pg');
const uuid = require('uuid/v4');
const { convertHtmlToDelta } = require('node-quill-converter');
const marked = require('marked');
const Chance = require('chance');

// Load spells
const magicitems = JSON.parse(fs.readFileSync('./magicitems.json'));

const CAMPAIGN_ID = '6745f9ca-77c5-4abb-aa1c-b1e04e83dd8f';
const USER_ID = 'google-oauth2|115793422235026993679';

const db = new Client({
	host: 'localhost',
	database: 'dd',
	user: 'dd',
	password: 'dd',
});

const chance = new Chance();

function getRarity(rarityString) {
	if (rarityString === null || rarityString === undefined) {
		return 0;
	}

	rarityString = rarityString.toLowerCase();

	if (rarityString.indexOf('artifact') !== -1) {
		return 5;
	} else if (rarityString.indexOf('legendary') !== -1) {
		return 4;
	} else if (rarityString.indexOf('very rare') !== -1) {
		return 3;
	} else if (rarityString.indexOf('rare') !== -1) {
		return 2;
	} else if (rarityString.indexOf('uncommon') !== -1) {
		return 1;
	} else {
		return 0;
	}
}

async function convert() {
	await db.connect();

	let idx = 0;
	let tblCol = 0;

	const renderer = new marked.Renderer();

	renderer.table = (header, body) => {
		return `<ul>${body}</ul>`;
	};

	renderer.tablerow = (content) => {
		return `<li>${content}</li>`;
	};

	renderer.tablecell = (content) => {
		if (tblCol++ % 2 === 0) {
			return content + ' - ';
		} else {
			return `<b>${content}</b>`;
		}
	};

	for (const spell of magicitems) {
		const html = marked(spell.desc, {
			renderer: renderer,
		});
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
		const rr = getRarity(rarity);

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
				rr,
				Math.round(
					Math.pow(rr + 1, rr + 1) * 10 * chance.floating({ min: 0.5, max: 4 })
				),
				0,
			]
		);

		console.log(++idx, '/', magicitems.length);
	}

	await db.end();
}

convert();
