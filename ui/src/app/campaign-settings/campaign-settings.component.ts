import { Component, OnInit } from '@angular/core';
import { EntityAttribute } from '../entity';
import { AttributeType } from '../attributes';

@Component({
  selector: 'dd-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.css'],
})
export class CampaignSettingsComponent implements OnInit {
  public attributes: EntityAttribute[] = [
    {
      name: 'AC',
      description: 'Armor',
      imageId: 'armor-upgrade',
      type: AttributeType.NUMBER,
      required: true,
      min: 0,
      max: 30,
    },

    {
      name: 'RE',
      description: 'Reflex',
      type: AttributeType.NUMBER,
      required: true,
      min: 0,
      max: 30,
    },
    {
      name: 'CH',
      description: 'Charisma',
      imageId: 'uncertainty',
      type: AttributeType.NUMBER,
      required: true,
      min: 0,
      max: 30,
    },
    {
      name: 'Class',
      description: 'The class of your character',
      imageId: 'uncertainty',
      type: AttributeType.ENUM,
      required: true,
      options: ['Barbarian', 'Aes Sedai', 'Construct'],
    },
    {
      name: 'Faction',
      description: 'Which faction your character belongs to',
      imageId: 'uncertainty',
      type: AttributeType.STRING,
      required: true,
      min: 3,
      max: 30,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
