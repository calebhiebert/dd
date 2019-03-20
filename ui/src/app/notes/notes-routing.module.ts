import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteManagerComponent } from './note-manager/note-manager.component';

const routes: Routes = [
  {
    path: '',
    component: NoteManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
