import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NoteEditorComponent } from './note/note-editor/note-editor.component';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _noteEditor: NoteEditorComponent;

  constructor(private http: HttpClient) {}

  public setNoteEditor(editor: NoteEditorComponent) {
    this._noteEditor = editor;
  }

  public addNote(opts: INoteOptions) {
    this._noteEditor.addNote(opts);
  }

  public getNote(id: string): Promise<INote> {
    return this.http
      .get<INote>(`${environment.apiURL}/notes/${id}`)
      .toPromise();
  }

  public createNote(note: INote): Promise<INote> {
    return this.http
      .post<INote>(`${environment.apiURL}/notes`, note)
      .toPromise();
  }

  public editNote(note: INote): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/notes/${note.id}`, note)
      .toPromise();
  }
}

export interface INoteOptions {
  type: NoteType;
  questId?: string;
}

export enum NoteType {
  QUEST,
}

export interface INote {
  id?: string;
  title: string;
  text: string;
  campaignId: string;
  questId?: string;
  entityId?: string;
  entityPresetId?: string;
  publicEdit: boolean;
  publicView: boolean;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
