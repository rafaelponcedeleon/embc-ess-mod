import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabModel } from 'src/app/core/models/tab.model';
import { StepNotesService } from './step-notes.service';

@Component({
  selector: 'app-step-notes',
  templateUrl: './step-notes.component.html',
  styleUrls: ['./step-notes.component.scss']
})
export class StepNotesComponent implements OnInit {
  stepName: string;
  tabs: Array<TabModel> = new Array<TabModel>();

  constructor(
    private router: Router,
    private stepNotesService: StepNotesService
  ) {
    if (this.router.getCurrentNavigation() !== null) {
      if (this.router.getCurrentNavigation().extras.state !== undefined) {
        const state = this.router.getCurrentNavigation().extras.state as {
          step: string;
          title: string;
        };
        this.stepName = state.title;
      }
    }
    this.tabs = this.stepNotesService.notesTab;
  }

  ngOnInit(): void {}
}
