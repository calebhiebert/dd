import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SketchpadComponent } from './sketchpad/sketchpad.component';

const routes: Routes = [{
  path: '',
  component: SketchpadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SketchpadRoutingModule { }
