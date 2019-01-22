import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OverviewService } from 'src/app/overview.service';

@Component({
  selector: 'dd-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.css']
})
export class OverviewToolbarComponent implements OnInit {
  public sortGroup: FormGroup;

  constructor(private overviewService: OverviewService) {}

  ngOnInit() {
    this.sortGroup = new FormGroup({
      mode: new FormControl(0),
      direction: new FormControl(1)
    });

    // Subscribe to changes in sorting params
    this.sortGroup.valueChanges.subscribe(sortVal => {
      this.overviewService.setSorting(sortVal.mode, sortVal.direction);
    });

    this.overviewService.loadPreferences();
  }
}
