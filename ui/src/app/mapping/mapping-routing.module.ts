import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapManagerComponent } from './map-manager/map-manager.component';
import { MapUploadComponent } from './map-upload/map-upload.component';
import { MapComponent } from './map.component';

const routes: Routes = [
  { path: '', component: MapManagerComponent },
  { path: 'upload', component: MapUploadComponent },
  { path: ':m_id', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappingRoutingModule {}
