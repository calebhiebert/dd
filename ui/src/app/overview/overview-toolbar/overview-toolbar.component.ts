import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OverviewService } from 'src/app/overview.service';

@Component({
  selector: 'dd-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.css'],
})
export class OverviewToolbarComponent implements OnInit {
  public sortGroup: FormGroup;
  public viewModeControl: FormControl;

  constructor(private overviewService: OverviewService) {}

  ngOnInit() {
    this.sortGroup = new FormGroup({
      mode: new FormControl(0),
      direction: new FormControl(0),
    });

    this.viewModeControl = new FormControl(null);

    // Subscribe to changes in sorting params
    this.sortGroup.valueChanges.subscribe((sortVal) => {
      this.overviewService.setSorting(sortVal.mode, sortVal.direction);
    });

    this.viewModeControl.valueChanges.subscribe((vm) => {
      this.overviewService.setViewMode(vm);
    });

    setTimeout(() => {
      this.overviewService.loadPreferences();
      this.sortGroup.patchValue({
        mode: this.overviewService.preferences.sortMode || 0,
        direction: this.overviewService.preferences.sortDirection || 0,
      });
      this.viewModeControl.setValue(this.overviewService.preferences.viewMode);
    }, 1);
  }
}
