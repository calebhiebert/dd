import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OverviewService } from 'src/app/overview.service';
import { IOverviewState } from 'src/app/overview-state.service';

@Component({
  selector: 'dd-overview-toolbar',
  templateUrl: './overview-toolbar.component.html',
  styleUrls: ['./overview-toolbar.component.css'],
})
export class OverviewToolbarComponent implements OnInit {
  public sortGroup: FormGroup;
  public viewModeControl: FormControl;

  @Input()
  public state?: IOverviewState;

  constructor(private overviewService: OverviewService) {}

  ngOnInit() {
    this.sortGroup = new FormGroup({
      mode: new FormControl(0),
      direction: new FormControl(0),
    });

    this.viewModeControl = new FormControl(this.overviewService.viewMode);

    this.viewModeControl.valueChanges.subscribe((vm) => {
      this.overviewService.setViewMode(vm);
    });
  }

  public toggleReorderable() {
    this.overviewService.toggleReorderable();
  }

  public get reorderable() {
    return this.overviewService.reorderable;
  }
}
