import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { UnsavedChangesGuard } from '../unsaved-changes.guard';
import { ArticleViewComponent } from './article-view/article-view.component';

const routes: Routes = [
  { path: '', component: ArticleManagerComponent },
  {
    path: 'create',
    component: ArticleEditorComponent,
    canDeactivate: [UnsavedChangesGuard],
    data: {
      editing: false,
      breadcrumb: 'Create Article',
    },
  },
  {
    path: ':a_id/edit',
    component: ArticleEditorComponent,
    canDeactivate: [UnsavedChangesGuard],
    data: {
      editing: true,
      breadcrumb: 'Edit Article',
    },
  },
  {
    path: ':a_id',
    component: ArticleViewComponent,
    data: {
      breadcrumb: 'Article View',
      suggestable: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
