import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SelectorPopupComponent } from './selector-popup/selector-popup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillComponent } from './quill/quill.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CurrencyInputComponent } from './dynform/currency-input/currency-input.component';
import { DynamicFieldComponent } from './dynform/dynamic-field/dynamic-field.component';
import { DynamicFieldHorizontalComponent } from './dynform/dynamic-field-horizontal/dynamic-field-horizontal.component';
import { DynamicInputComponent } from './dynform/dynamic-input/dynamic-input.component';
import { DynamicValidationErrorsComponent } from './dynform/dynamic-validation-errors/dynamic-validation-errors.component';
import { FieldBaseComponent } from './dynform/field-base/field-base.component';
import { FieldDefinitionFormComponent } from './dynform/field-definition-form/field-definition-form.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { HealthDisplayComponent } from './health-display/health-display.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { CustomViewsModule } from '../custom-views/custom-views.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ModalComponent,
    PaginatorComponent,
    TagEditorComponent,
    SelectorPopupComponent,
    QuillComponent,
    IconPickerComponent,
    AutocompleteComponent,
    CurrencyInputComponent,
    DynamicFieldComponent,
    DynamicFieldHorizontalComponent,
    DynamicInputComponent,
    DynamicValidationErrorsComponent,
    FieldBaseComponent,
    FieldDefinitionFormComponent,
    ImageUploadComponent,
    HealthDisplayComponent,
    NoteEditorComponent,
    NoteFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DragDropModule, CustomViewsModule, RouterModule],
  exports: [
    ModalComponent,
    PaginatorComponent,
    SelectorPopupComponent,
    TagEditorComponent,
    QuillComponent,
    IconPickerComponent,
    AutocompleteComponent,
    ImageUploadComponent,
    DynamicFieldHorizontalComponent,
    DynamicFieldComponent,
    FieldDefinitionFormComponent,
    HealthDisplayComponent,
    NoteEditorComponent,
  ],
})
export class CustomControlsModule {}
