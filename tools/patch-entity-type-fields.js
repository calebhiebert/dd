const { Client } = require('pg');

const db = new Client({
  host: 'localhost',
  database: 'dd',
  user: 'dd',
  password: 'dd',
});

function translateAttributeTypeToFieldType(attributeType) {
  switch (attributeType) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 5;
    case 4:
      return 4;
  }
}

function translateAttributeToField(attribute) {
  const field = {};

  field.Name = attribute.Name;
  field.Description = attribute.Description;
  field.ImageId = attribute.ImageId;
  field.DefaultValue = attribute.DefaultValue;
  field.Type = translateAttributeTypeToFieldType(attribute.Type);
  field.Class = attribute.Class;

  const opt = {};
  opt.Required = attribute.Required;

  switch (attribute.Type) {
    case 0:
      opt.MaxLength = attribute.Max;
      opt.MinLength = attribute.Min;
      break;
    case 1:
      opt.Max = attribute.Max;
      opt.Min = attribute.Min;
      break;
    case 2:
    case 4:
      opt.Choices = attribute.Options;
      break;
  }

  field.Options = opt;
  return field;
}

async function patch() {
  await db.connect();

  let idx = 0;

  const { rows } = await db.query(`SELECT * FROM "EntityPresets"`);

  for (const row of rows) {
    const attributes = row.Attributes;
    const fields = [];

    for (const attr of attributes) {
      fields.push(translateAttributeToField(attr));
    }

    await db.query(`UPDATE "EntityPresets" SET "Fields" = $1 WHERE "EntityPresets"."Id" = $2;`, [JSON.stringify(fields), row.Id]);

    console.log(++idx, '/', rows.length);
  }

  await db.end();
}

patch();
