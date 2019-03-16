/* tslint:disable:max-line-length */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavComponent } from './nav/nav.component';
import { CampaignComponent } from './campaign/campaign.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
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
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { EntityEditorComponent } from './entity/entity-editor/entity-editor.component';
import { AboutComponent } from './about/about.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EntityComponent } from './entity/entity.component';
import { EntityAttributeEditorModalComponent } from './entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component';
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
import { SentryErrorHandler } from './sentry.errorhandler';
import { NoteFormComponent } from './note/note-form/note-form.component';
import { NoteEditorComponent } from './note/note-editor/note-editor.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NumberQuickSelectComponent } from './number-quick-select/number-quick-select.component';
import { SpawnableListItemComponent } from './entity/spawnable-list-item/spawnable-list-item.component';
import { AttributeRowViewComponent } from './entity/entity-view/attribute-row-view/attribute-row-view.component';
import { AttributeTableViewComponent } from './entity/entity-view/attribute-table-view/attribute-table-view.component';
import { MapComponent } from './map/map.component';
import { MapUploadComponent } from './map/map-upload/map-upload.component';
import { MapManagerComponent } from './map/map-manager/map-manager.component';
import { MapEditorMenuComponent } from './map/map-editor-menu/map-editor-menu.component';
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
import { ExporterComponent } from './campaign/campaign-settings/exporter/exporter.component';
import { DynamicFieldHorizontalComponent } from './dynform/dynamic-field-horizontal/dynamic-field-horizontal.component';
import { FieldBaseComponent } from './dynform/field-base/field-base.component';
import { DynamicFieldComponent } from './dynform/dynamic-field/dynamic-field.component';
import { DynamicInputComponent } from './dynform/dynamic-input/dynamic-input.component';
import { DynamicValidationErrorsComponent } from './dynform/dynamic-validation-errors/dynamic-validation-errors.component';
import { CurrencyInputComponent } from './dynform/currency-input/currency-input.component';
import { FieldDefinitionFormComponent } from './dynform/field-definition-form/field-definition-form.component';
import { ConceptEditorComponent } from './concept/concept-editor/concept-editor.component';
import { ConceptTypeEditorComponent } from './concept/concept-type-editor/concept-type-editor.component';
import { ConceptManagerComponent } from './concept/concept-manager/concept-manager.component';
import { ConceptListItemComponent } from './concept/concept-list-item/concept-list-item.component';
import { ConceptViewComponent } from './concept/concept-view/concept-view.component';
import { ConceptEntityManagerComponent } from './concept/concept-entity-manager/concept-entity-manager.component';
import { CurrencyViewComponent } from './dynform/currency-view/currency-view.component';
import { HttpErrorsComponent } from './http-errors/http-errors.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ErrorPageComponent } from './http-errors/error-page/error-page.component';
import { UserViewNanoComponent } from './account/user-view-nano/user-view-nano.component';
import { ConceptHistoryComponent } from './concept/concept-history/concept-history.component';
import { MemberManagerComponent } from './campaign/member-manager/member-manager.component';
import { LongPressDirective } from './long-press.directive';
import { LoginStatusComponent } from './login/login-status/login-status.component';
import { EntityPresetEditorComponent } from './entity/entity-preset-editor/entity-preset-editor.component';
import { ConceptEntityManagerListItemComponent } from './concept/concept-entity-manager-list-item/concept-entity-manager-list-item.component';
/* tslint:enable:max-line-length */

@NgModule({
  entryComponents: [NoteViewMiniComponent, EntityViewMiniComponent, ArticleViewMiniComponent, UserViewMiniComponent],
  declarations: [
    AppComponent,
    ImageUploadComponent,
    NavComponent,
    CampaignComponent,
    CampaignListComponent,
    CampaignLandingComponent,
    PaginatorComponent,
    CampaignSettingsComponent,
    EntityEditorComponent,
    ModalComponent,
    ConfirmationModalComponent,
    LoginComponent,
    HomeComponent,
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
    TagEditorComponent,
    AboutComponent,
    NotificationsComponent,
    BreadcrumbsComponent,
    EntityComponent,
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
    AttributeTableViewComponent,
    MapComponent,
    MapUploadComponent,
    MapManagerComponent,
    MapEditorMenuComponent,
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
    ExporterComponent,
    DynamicFieldHorizontalComponent,
    FieldBaseComponent,
    DynamicFieldComponent,
    DynamicInputComponent,
    DynamicValidationErrorsComponent,
    AttributeRowViewComponent,
    CurrencyInputComponent,
    FieldDefinitionFormComponent,
    ConceptEditorComponent,
    ConceptTypeEditorComponent,
    ConceptManagerComponent,
    ConceptListItemComponent,
    ConceptViewComponent,
    ConceptEntityManagerComponent,
    CurrencyViewComponent,
    HttpErrorsComponent,
    ErrorPageComponent,
    UserViewNanoComponent,
    ConceptHistoryComponent,
    MemberManagerComponent,
    LongPressDirective,
    LoginStatusComponent,
    EntityPresetEditorComponent,
    ConceptEntityManagerListItemComponent,
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
    DragDropModule,
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
