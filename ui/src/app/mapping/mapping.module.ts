import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRoutingModule } from './mapping-routing.module';
import { MapEditorMenuComponent } from './map-editor-menu/map-editor-menu.component';
import { MapManagerComponent } from './map-manager/map-manager.component';
import { MapUploadComponent } from './map-upload/map-upload.component';
import { MapToolbarComponent } from './map-toolbar/map-toolbar.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [MapEditorMenuComponent, MapManagerComponent, MapToolbarComponent, MapUploadComponent, MapComponent],
  imports: [CommonModule, MappingRoutingModule, CustomControlsModule, ReactiveFormsModule, UsersModule],
})
export class MappingModule {}
