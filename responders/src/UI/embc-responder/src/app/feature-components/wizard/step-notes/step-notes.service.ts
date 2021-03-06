import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note, NoteType, RegistrationResult } from 'src/app/core/api/models';
import { RegistrationsService } from 'src/app/core/api/services';
import { TabModel, WizardTabModelValues } from 'src/app/core/models/tab.model';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';

@Injectable({ providedIn: 'root' })
export class StepNotesService {
  private notesTabVal: Array<TabModel> = WizardTabModelValues.notesTab;

  constructor(
    private registrationsService: RegistrationsService,
    private evacueeSessionService: EvacueeSessionService
  ) {}

  public get notesTab(): Array<TabModel> {
    return this.notesTabVal;
  }
  public set notesTab(notesTab: Array<TabModel>) {
    this.notesTabVal = notesTab;
  }

  /**
   * Maps notes from evacuation file
   *
   * @returns observable array of notes
   */
  public getNotes(): Observable<Array<Note>> {
    return this.registrationsService
      .registrationsGetFile({
        fileId: this.evacueeSessionService.essFileNumber
      })
      .pipe(
        map((file) => {
          return file.notes;
        })
      );
  }

  /**
   * Creates the note DTO
   *
   * @param content User entered note content
   * @returns Note object
   */
  createNoteDTO(content: string): Note {
    return {
      content,
      type: NoteType.General
    };
  }

  /**
   * Save user entered notes for the file
   *
   * @param note user entered note
   * @returns
   */
  public saveNotes(note: Note): Observable<RegistrationResult> {
    return this.registrationsService.registrationsCreateFileNote({
      fileId: this.evacueeSessionService.essFileNumber,
      body: note
    });
  }
}
