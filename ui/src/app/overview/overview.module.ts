import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewEntityComponent } from './overview-entity/overview-entity.component';
import { OverviewToolbarComponent } from './overview-toolbar/overview-toolbar.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OverviewComponent, OverviewEntityComponent, OverviewToolbarComponent],
  imports: [CommonModule, OverviewRoutingModule, CustomControlsModule, ReactiveFormsModule, FormsModule],
})
export class OverviewModule {}
