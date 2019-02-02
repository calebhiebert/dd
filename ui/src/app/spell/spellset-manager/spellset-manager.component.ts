import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dd-spellset-manager',
  templateUrl: './spellset-manager.component.html',
  styleUrls: ['./spellset-manager.component.css'],
})
export class SpellsetManagerComponent implements OnInit {
  @Input()
  public editable = false;

  constructor() {}

  ngOnInit() {}
}
