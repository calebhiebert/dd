import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SelectorPopupComponent } from './selector-popup/selector-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillComponent } from './quill/quill.component';

@NgModule({
  declarations: [ModalComponent, PaginatorComponent, SelectorPopupComponent, QuillComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModalComponent, PaginatorComponent, SelectorPopupComponent, QuillComponent],
})
export class CustomControlsModule {}
