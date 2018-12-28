import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemViewListComponent } from './item-view-list/item-view-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';
import { NavComponent } from './nav/nav.component';
import { CampaignModule } from './campaign/campaign.module';
import { ItemManagerComponent } from './item-manager/item-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemViewListComponent,
    ItemFormComponent,
    ImageUploadComponent,
    AttributeEditorComponent,
    NavComponent,
    ItemManagerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CampaignModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
