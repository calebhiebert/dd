/* tslint:disable:max-line-length */
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TruncateModule } from 'ng2-truncate';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { CampaignFormComponent } from './campaign/campaign-form/campaign-form.component';
import { CampaignLandingComponent } from './campaign/campaign-landing/campaign-landing.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignSettingsComponent } from './campaign/campaign-settings/campaign-settings.component';
import { CurrencyMapEditorComponent } from './campaign/campaign-settings/currency-map-editor/currency-map-editor.component';
import { ExperienceTableEditorComponent } from './campaign/campaign-settings/experience-table-editor/experience-table-editor.component';
import { ExporterComponent } from './campaign/campaign-settings/exporter/exporter.component';
import { CampaignComponent } from './campaign/campaign.component';
import { InviteManagerComponent } from './campaign/invite-manager/invite-manager.component';
import { MemberManagerComponent } from './campaign/member-manager/member-manager.component';
import { ConceptEditorComponent } from './concept/concept-editor/concept-editor.component';
import { ConceptEntityManagerListItemComponent } from './concept/concept-entity-manager-list-item/concept-entity-manager-list-item.component';
import { ConceptEntityManagerComponent } from './concept/concept-entity-manager/concept-entity-manager.component';
import { ConceptHistoryComponent } from './concept/concept-history/concept-history.component';
import { ConceptListItemComponent } from './concept/concept-list-item/concept-list-item.component';
import { ConceptManagerComponent } from './concept/concept-manager/concept-manager.component';
import { ConceptTypeEditorComponent } from './concept/concept-type-editor/concept-type-editor.component';
import { ConceptViewComponent } from './concept/concept-view/concept-view.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { CustomControlsModule } from './custom-controls/custom-controls.module';
import { CustomViewsModule } from './custom-views/custom-views.module';
import { EditableEntitySelectorComponent } from './entity/editable-entity-selector/editable-entity-selector.component';
import { EntityEditorComponent } from './entity/entity-editor/entity-editor.component';
import { EntityPresetEditorComponent } from './entity/entity-preset-editor/entity-preset-editor.component';
import { EntityViewMiniComponent } from './entity/entity-view-mini/entity-view-mini.component';
import { AttributeRowViewComponent } from './entity/entity-view/attribute-row-view/attribute-row-view.component';
import { AttributeTableViewComponent } from './entity/entity-view/attribute-table-view/attribute-table-view.component';
import { EntityAttributeEditorModalComponent } from './entity/entity-view/entity-attribute-editor-modal/entity-attribute-editor-modal.component';
import { EntityViewComponent } from './entity/entity-view/entity-view.component';
import { EntityComponent } from './entity/entity.component';
import { SpawnableListItemComponent } from './entity/spawnable-list-item/spawnable-list-item.component';
import { SpawnableManagerComponent } from './entity/spawnable-manager/spawnable-manager.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { LongPressDirective } from './long-press.directive';
import { MappingModule } from './mapping/mapping.module';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { NavComponent } from './nav/nav.component';
import { NotesModule } from './notes/notes.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { NumberQuickSelectComponent } from './number-quick-select/number-quick-select.component';
import { PhraserComponent } from './phraser/phraser.component';
import { QuestFormComponent } from './quest/quest-form/quest-form.component';
import { QuestManagerComponent } from './quest/quest-manager/quest-manager.component';
import { QuestViewComponent } from './quest/quest-view/quest-view.component';
import { QuickViewComponent } from './quest/quick-view/quick-view.component';
import { QuickDiceComponent } from './quick-dice/quick-dice.component';
import { SentryErrorHandler } from './sentry.errorhandler';
import { UsersModule } from './users/users.module';
/* tslint:enable:max-line-length */

@NgModule({
  entryComponents: [EntityViewMiniComponent],
  declarations: [
    AppComponent,
    NavComponent,
    CampaignComponent,
    CampaignListComponent,
    CampaignLandingComponent,
    CampaignSettingsComponent,
    EntityEditorComponent,
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
    AboutComponent,
    NotificationsComponent,
    EntityComponent,
    PhraserComponent,
    EditableEntitySelectorComponent,
    QuestViewComponent,
    QuickViewComponent,
    SpawnableManagerComponent,
    FooterComponent,
    NumberQuickSelectComponent,
    SpawnableListItemComponent,
    AttributeTableViewComponent,
    EntityViewMiniComponent,
    QuickDiceComponent,
    CurrencyMapEditorComponent,
    ExporterComponent,
    AttributeRowViewComponent,
    ConceptEditorComponent,
    ConceptTypeEditorComponent,
    ConceptManagerComponent,
    ConceptListItemComponent,
    ConceptViewComponent,
    ConceptEntityManagerComponent,
    ConceptHistoryComponent,
    MemberManagerComponent,
    LongPressDirective,
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
    NotesModule,
    DragDropModule,
    MappingModule,
    CustomControlsModule,
    CustomViewsModule,
    UsersModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  exports: [EditableEntitySelectorComponent],
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
