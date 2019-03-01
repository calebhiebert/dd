/* tslint:disable:max-line-length */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {
  ReactiveFormsModule,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { CampaignComponent } from './campaign/campaign.component';
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
import { AttributeEditorComponent } from './items/attribute-editor/attribute-editor.component';
import { ItemManagerComponent } from './items/item-manager/item-manager.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { EntityTypesComponent } from './campaign/campaign-settings/entity-types/entity-types.component';
import { DynamicAttributeFormComponent } from './entity/dynamic-attribute-form/dynamic-attribute-form.component';
import { ExperienceTableEditorComponent } from './campaign/campaign-settings/experience-table-editor/experience-table-editor.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { QuestFormComponent } from './quest/quest-form/quest-form.component';
import { RegisterComponent } from './login/register/register.component';
import { CampaignFormComponent } from './campaign/campaign-form/campaign-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { InviteManagerComponent } from './campaign/invite-manager/invite-manager.component';
import { InviteComponent } from './invite/invite.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { ItemRarityTableEditorComponent } from './campaign/campaign-settings/item-rarity-table-editor/item-rarity-table-editor.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { AboutComponent } from './about/about.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EntityComponent } from './entity/entity.component';
import { EntityAttributeEditorModalComponent } from './entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { InventoryManagerComponent } from './items/inventory-manager/inventory-manager.component';
import { ItemSelectComponent } from './items/item-select/item-select.component';
import { PhraserComponent } from './phraser/phraser.component';
import { EditableEntitySelectorComponent } from './entity/editable-entity-selector/editable-entity-selector.component';
import { HealthDisplayComponent } from './entity/health-display/health-display.component';
import { QuestViewComponent } from './quest/quest-view/quest-view.component';
import { QuickViewComponent } from './quest/quick-view/quick-view.component';
import { SpawnableManagerComponent } from './entity/spawnable-manager/spawnable-manager.component';
import { OverviewComponent } from './session/overview/overview.component';
import { OverviewEntityComponent } from './session/overview-entity/overview-entity.component';
import { OverviewToolbarComponent } from './session/overview-toolbar/overview-toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpErrorInterceptor } from './http-error.interceptor.ts';
import { SentryErrorHandler } from './sentry.errorhandler';
import { NoteFormComponent } from './note/note-form/note-form.component';
import { NoteEditorComponent } from './note/note-editor/note-editor.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NumberQuickSelectComponent } from './number-quick-select/number-quick-select.component';
import { SpawnableListItemComponent } from './entity/spawnable-list-item/spawnable-list-item.component';
import { SpellManagerComponent } from './spell/spell-manager/spell-manager.component';
import { SpellFormComponent } from './spell/spell-form/spell-form.component';
import { SpellViewComponent } from './spell/spell-view/spell-view.component';
import { SpellViewListComponent } from './spell/spell-view-list/spell-view-list.component';
import { SpellsetManagerComponent } from './spell/spellset-manager/spellset-manager.component';
import { AttributeRowViewComponent } from './entity/entity-view/attribute-row-view/attribute-row-view.component';
import { AttributeTableViewComponent } from './entity/entity-view/attribute-table-view/attribute-table-view.component';
import { MapComponent } from './map/map.component';
import { MapUploadComponent } from './map/map-upload/map-upload.component';
import { MapManagerComponent } from './map/map-manager/map-manager.component';
import { MapEditorMenuComponent } from './map/map-editor-menu/map-editor-menu.component';
import { SpellSelectComponent } from './spell/spell-select/spell-select.component';
import { NoteViewMiniComponent } from './note/note-view-mini/note-view-mini.component';
import { EntityViewMiniComponent } from './entity/entity-view-mini/entity-view-mini.component';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleViewComponent } from './article/article-view/article-view.component';
import { ArticleSelectComponent } from './article/article-select/article-select.component';
import { MapToolbarComponent } from './map/map-toolbar/map-toolbar.component';
import { ArticleManagerComponent } from './article/article-manager/article-manager.component';
import { ArticleViewMiniComponent } from './article/article-view-mini/article-view-mini.component';
import { ArticleViewCardComponent } from './article/article-view-card/article-view-card.component';
import { QuickDiceComponent } from './quick-dice/quick-dice.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { ArticleQuestManagerComponent } from './quest/article-quest-manager/article-quest-manager.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { QuillComponent } from './quill/quill.component';
import { UserViewMiniComponent } from './account/user-view-mini/user-view-mini.component';
import { CurrencyMapEditorComponent } from './campaign/campaign-settings/currency-map-editor/currency-map-editor.component';
/* tslint:enable:max-line-length */

@NgModule({
  entryComponents: [
    NoteViewMiniComponent,
    EntityViewMiniComponent,
    ArticleViewMiniComponent,
    UserViewMiniComponent,
  ],
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
    PaginatorComponent,
    CampaignSettingsComponent,
    EntityTypesComponent,
    EntityAttributeRowEditorComponent,
    DynamicAttributeFormComponent,
    EntityFormComponent,
    ModalComponent,
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
    InviteManagerComponent,
    InviteComponent,
    NavSidebarComponent,
    ItemRarityTableEditorComponent,
    TagEditorComponent,
    ItemViewComponent,
    AboutComponent,
    NotificationsComponent,
    BreadcrumbsComponent,
    EntityComponent,
    InventoryManagerComponent,
    ItemSelectComponent,
    PhraserComponent,
    EditableEntitySelectorComponent,
    HealthDisplayComponent,
    QuestViewComponent,
    QuickViewComponent,
    SpawnableManagerComponent,
    OverviewComponent,
    OverviewEntityComponent,
    OverviewToolbarComponent,
    FooterComponent,
    NoteFormComponent,
    NoteEditorComponent,
    NoteListComponent,
    NumberQuickSelectComponent,
    SpawnableListItemComponent,
    SpellManagerComponent,
    SpellFormComponent,
    SpellViewComponent,
    SpellViewListComponent,
    SpellsetManagerComponent,
    AttributeRowViewComponent,
    AttributeTableViewComponent,
    MapComponent,
    MapUploadComponent,
    MapManagerComponent,
    MapEditorMenuComponent,
    SpellSelectComponent,
    NoteViewMiniComponent,
    EntityViewMiniComponent,
    ArticleEditorComponent,
    ArticleViewComponent,
    ArticleSelectComponent,
    MapToolbarComponent,
    ArticleManagerComponent,
    ArticleViewMiniComponent,
    ArticleViewCardComponent,
    QuickDiceComponent,
    IconPickerComponent,
    AccountSettingsComponent,
    ArticleQuestManagerComponent,
    AutocompleteComponent,
    QuillComponent,
    UserViewMiniComponent,
    CurrencyMapEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    TruncateModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
