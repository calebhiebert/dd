import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemViewListComponent } from './item-view-list/item-view-list.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';
import { NavComponent } from './nav/nav.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { CampaignComponent } from './campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign-landing/campaign-landing.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CampaignSettingsComponent } from './campaign-settings/campaign-settings.component';
import { EntityTypesComponent } from './campaign-settings/entity-types/entity-types.component';
import { EntityAttributeRowEditorComponent } from './entity-attribute-row-editor/entity-attribute-row-editor.component';
import { DynamicAttributeFormComponent } from './dynamic-attribute-form/dynamic-attribute-form.component';
import { EntityFormComponent } from './entity-form/entity-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemViewListComponent,
    ItemFormComponent,
    ImageUploadComponent,
    AttributeEditorComponent,
    NavComponent,
    ItemManagerComponent,
    CampaignComponent,
    CampaignListComponent,
    CampaignLandingComponent,
    ItemEditComponent,
    PaginatorComponent,
    CampaignSettingsComponent,
    EntityTypesComponent,
    EntityAttributeRowEditorComponent,
    DynamicAttributeFormComponent,
    EntityFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TruncateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
