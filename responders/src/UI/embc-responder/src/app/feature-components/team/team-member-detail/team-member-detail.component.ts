import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamMember } from 'src/app/core/api/models';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/dialog-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { TeamListDataService } from '../team-list/team-list-data.service';
import { TeamMemberDetailsService } from './team-member-details.service';

@Component({
  selector: 'app-team-member-detail',
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.scss']
})
export class TeamMemberDetailComponent implements OnInit {

  teamMember: TeamMember;

  constructor(private router: Router, private dialog: MatDialog, private teamDetailsService: TeamMemberDetailsService,
              private teamDataService: TeamListDataService) {
    if (this.router.getCurrentNavigation().extras.state !== undefined) {
      const state = this.router.getCurrentNavigation().extras.state as TeamMember;
      this.teamMember = state;
    } else {
      this.teamMember = this.teamDataService.getSelectedTeamMember();
    }
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: DeleteConfirmationDialogComponent,
        buttons: [
          {
            name: 'No, Cancel',
            class: 'button-s',
            function: 'close'
          },
          {
            name: 'Yes, Delete this user',
            class: 'button-p',
            function: 'delete'
          }
        ]
      },
      height: '250px',
      width: '650px'
    }).afterClosed().subscribe(event => {
      console.log(event);
      if (event === 'delete') {
        this.teamDetailsService.deleteTeamMember(this.teamMember.id).subscribe(value => {
          this.router.navigate(['/responder-access/responder-management/details/member-list']);
        });
      }
    });
  }

  editUser(): void {
    this.router.navigate(['/responder-access/responder-management/details/edit'], { state: this.teamMember });
  }

}