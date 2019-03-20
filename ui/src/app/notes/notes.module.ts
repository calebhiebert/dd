import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteViewMiniComponent } from './note-view-mini/note-view-mini.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomViewsModule } from '../custom-views/custom-views.module';
import { NoteManagerComponent } from './note-manager/note-manager.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';

@NgModule({
  entryComponents: [NoteViewMiniComponent],
  declarations: [NoteListComponent, NoteViewMiniComponent, NoteManagerComponent, NoteListItemComponent],
  exports: [NoteViewMiniComponent, NoteListComponent],
  imports: [NotesRoutingModule, CommonModule, CustomControlsModule, ReactiveFormsModule, CustomViewsModule],
})
export class NotesModule {}
