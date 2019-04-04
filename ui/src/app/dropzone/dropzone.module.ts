import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from './dropzone/dropzone.component';

@NgModule({
  declarations: [DropzoneComponent],
  imports: [CommonModule],
  exports: [DropzoneComponent],
})
export class DropzoneModule {}
