import { Component, OnInit } from '@angular/core';
import { SpellService } from 'src/app/spell.service';

@Component({
  selector: 'dd-spell-manager',
  templateUrl: './spell-manager.component.html',
  styleUrls: ['./spell-manager.component.css'],
})
export class SpellManagerComponent implements OnInit {
  constructor(private spellService: SpellService) {}

  ngOnInit() {}
}
