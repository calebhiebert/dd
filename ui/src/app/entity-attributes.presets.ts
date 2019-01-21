import { IEntityAttribute, EntityAttributeClass } from './entity.service';
import { AttributeType } from './attributes';

export const DND_5E: IEntityAttribute[] = [
  {
    name: 'AC',
    description: 'Armor Class',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MAJOR,
    required: true,
    min: 0
  },
  {
    name: 'Init',
    description: 'Initiative',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MAJOR,
    required: true,
    min: 0
  },
  {
    name: 'Speed',
    description: 'Speed',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MAJOR,
    required: true,
    min: 0
  },
  {
    name: 'Strength',
    description: 'Strength',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Dexterity',
    description: 'Dexterity',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Constitution',
    description: 'Constitution',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Intelligence',
    description: 'Intelligence',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Wisdom',
    description: 'Wisdom',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Charisma',
    description: 'Charisma',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.NORMAL,
    required: true,
    min: 0
  },
  {
    name: 'Acrobatics',
    description: 'Acrobatics',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Animal Handling',
    description: 'Animal Handling',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Arcana',
    description: 'Arcana',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Athletics',
    description: 'Athletics',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Deception',
    description: 'Deception',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'History',
    description: 'History',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Insight',
    description: 'Insight',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Intimidation',
    description: 'Intimidation',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Investigation',
    description: 'Investigation',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Medicine',
    description: 'Medicine',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Nature',
    description: 'Nature',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Perception',
    description: 'Perception',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Performance',
    description: 'Performance',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Persuasion',
    description: 'Persuasion',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Religion',
    description: 'Religion',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Sleight of Hand',
    description: 'Sleight of Hand',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Stealth',
    description: 'Stealth',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  },
  {
    name: 'Survival',
    description: 'Survival',
    type: AttributeType.NUMBER,
    class: EntityAttributeClass.MINOR,
    required: false,
    min: 0
  }
];