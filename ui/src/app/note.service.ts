import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NoteEditorComponent } from './note/note-editor/note-editor.component';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _noteEditor: NoteEditorComponent;
  private _noteCache: INote[];

  constructor(private http: HttpClient) {
    this.clearNoteCache();
  }

  public setNoteEditor(editor: NoteEditorComponent) {
    this._noteEditor = editor;
  }

  public addNote(opts: INoteOptions) {
    this._noteEditor.addNote(opts);
  }

  public editNote(note: INote) {
    this._noteEditor.editNote(note);
  }

  public clearNoteCache() {
    this._noteCache = [];
  }

  public getQuestNotes(questId: string) {
    return this._noteCache.filter((n) => n.questId === questId);
  }

  public getNotes(campaignId: string, questId?: string): Promise<INote[]> {
    let queryString = `?campaignId=${campaignId}`;

    if (questId) {
      queryString += `&questId=${questId}`;
    }

    return this.http
      .get<INote[]>(`${environment.apiURL}/notes${queryString}`)
      .toPromise()
      .then((notes) => {
        this.addOrUpdateCacheNotes(notes);
        return notes;
      });
  }

  public getNote(id: string): Promise<INote> {
    return this.http
      .get<INote>(`${environment.apiURL}/notes/${id}`)
      .toPromise()
      .then((note) => {
        this.addOrUpdateCacheNotes([note]);
        return note;
      });
  }

  public createNote(note: INote): Promise<INote> {
    return this.http
      .post<INote>(`${environment.apiURL}/notes`, note)
      .toPromise()
      .then((note) => {
        this.addOrUpdateCacheNotes([note]);
        return note;
      });
  }

  public updateNote(note: INote): Promise<void> {
    return this.http
      .put<void>(`${environment.apiURL}/notes/${note.id}`, note)
      .toPromise()
      .then(() => {
        this.addOrUpdateCacheNotes([note]);
      });
  }

  public deleteNote(id: string): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiURL}/notes/${id}`)
      .toPromise()
      .then(() => {
        this.removeNoteFromCache(id);
      });
  }

  public addOrUpdateCacheNotes(notes: INote[]) {
    for (const n of notes) {
      const existingNote = this._noteCache.find((cn) => cn.id === n.id);

      if (existingNote !== undefined) {
        Object.assign(existingNote, n);
      } else {
        this._noteCache.push({ ...n });
      }
    }
  }

  public removeNoteFromCache(noteId: string) {
    this._noteCache = this._noteCache.filter((n) => n.id !== noteId);
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
