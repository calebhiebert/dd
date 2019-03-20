import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteViewMiniComponent } from './note-view-mini/note-view-mini.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomViewsModule } from '../custom-views/custom-views.module';

@NgModule({
  entryComponents: [NoteViewMiniComponent],
  declarations: [NoteEditorComponent, NoteFormComponent, NoteListComponent, NoteViewMiniComponent],
  exports: [NoteViewMiniComponent, NoteListComponent, NoteEditorComponent],
  imports: [CommonModule, CustomControlsModule, ReactiveFormsModule, CustomViewsModule],
})
export class NotesModule {}
