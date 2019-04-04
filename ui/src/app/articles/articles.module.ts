import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { ArticleSelectComponent } from './article-select/article-select.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticleViewCardComponent } from './article-view-card/article-view-card.component';
import { ArticleConceptManagerComponent } from './article-concept-manager/article-concept-manager.component';
import { ArticleConceptManagerListItemComponent } from './article-concept-manager-list-item/article-concept-manager-list-item.component';
import { ArticleQuestManagerComponent } from './article-quest-manager/article-quest-manager.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesModule } from '../notes/notes.module';
import { CustomViewsModule } from '../custom-views/custom-views.module';
import { DropzoneModule } from '../dropzone/dropzone.module';

@NgModule({
  declarations: [
    ArticleEditorComponent,
    ArticleManagerComponent,
    ArticleSelectComponent,
    ArticleViewComponent,
    ArticleViewCardComponent,
    ArticleConceptManagerComponent,
    ArticleConceptManagerListItemComponent,
    ArticleQuestManagerComponent,
  ],
  imports: [CommonModule, ArticlesRoutingModule, CustomControlsModule, NotesModule, ReactiveFormsModule, CustomViewsModule, DropzoneModule],
})
export class ArticlesModule {}
