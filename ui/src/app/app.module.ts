import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemViewListComponent } from './item-view-list/item-view-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemViewListComponent,
    ItemFormComponent,
    ImageUploadComponent,
    AttributeEditorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
