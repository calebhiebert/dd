import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { CampaignComponent } from './campaign.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EntityAttributeRowEditorComponent } from './entity/entity-attribute-row-editor/entity-attribute-row-editor.component';
import { EntityFormComponent } from './entity/entity-form/entity-form.component';
import { EntityTypeSelectorComponent } from './entity/entity-form/entity-type-selector/entity-type-selector.component';
import { EntityCreationFormComponent } from './entity/entity-form/entity-creation-form/entity-creation-form.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { ItemViewListComponent } from './items/item-view-list/item-view-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { AttributeEditorComponent } from './items/attribute-editor/attribute-editor.component';
import { ItemManagerComponent } from './items/item-manager/item-manager.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { EntityTypesComponent } from './campaign/campaign-settings/entity-types/entity-types.component';
import { DynamicAttributeFormComponent } from './entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { InventorySelectorComponent } from './items/inventory-selector/inventory-selector.component';
import { ExperienceTableEditorComponent } from './campaign/campaign-settings/experience-table-editor/experience-table-editor.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { EntityAttributeEditorModalComponent } from './entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { QuestFormComponent } from './quest/quest-form/quest-form.component';
import { RegisterComponent } from './login/register/register.component';
import { CampaignFormComponent } from './campaign/campaign-form/campaign-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

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
    ModalComponent,
    InventorySelectorComponent,
    ConfirmationModalComponent,
    LoginComponent,
    HomeComponent,
    EntityTypeSelectorComponent,
    EntityCreationFormComponent,
    ExperienceTableEditorComponent,
    QuestManagerComponent,
    EntityViewComponent,
    EntityAttributeEditorModalComponent,
    QuestFormComponent,
    RegisterComponent,
    CampaignFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TruncateModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
