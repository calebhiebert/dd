import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SketchpadRoutingModule } from './sketchpad-routing.module';
import { SketchpadComponent } from './sketchpad/sketchpad.component';

@NgModule({
  declarations: [SketchpadComponent],
  imports: [
    CommonModule,
    SketchpadRoutingModule
  ]
})
export class SketchpadModule { }
