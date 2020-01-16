import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LiffappService,
  CrmProduct,
  ChatbotMstProjectService,
  CrmMstProduct,
  UserRoleProject,
  ChatbotRoleprojectService,
  UserRoleProject2 } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;

export interface User {
  display_project: string;
}

@Component({
  selector: 'app-leadlag-byroleproject',
  templateUrl: './leadlag-byroleproject.component.html',
  styleUrls: ['./leadlag-byroleproject.component.scss']
})
export class LeadlagByroleprojectComponent implements OnInit {
  messages: string;
  userProfile: any;
  userId: string;
  selected: string;
  data: UserRoleProject2[];

  favoriteSeason: string;
  seasons: string[] = ['Year to Date', 'Quarter (Current Quarter)', 'Week (last week and current week)'];

  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
    public serviceMstProject: ChatbotMstProjectService,
    public serviceRoleProject: ChatbotRoleprojectService
  ) {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';
    this.data = [
    {display_project: 'ASPIRE Sukhumvit-Onnut :60021'},
    {display_project: 'Aspire งามวงศ์วาน:10096'},
    ];

    this.initLineLiff();
  }

  myControl = new FormControl();

  options: User[] = [
    {display_project: 'ASPIRE Sukhumvit-Onnut :60021'},
    {display_project: 'Aspire งามวงศ์วาน:10096'},
  ];
  // options: User[] = this.data2;
  filteredOptions: Observable<User[]>;

  async ngOnInit() {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';
    this.userId = '';

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.display_project),
        map(display_project => display_project? this._filter(display_project) : this.options.slice())
      );

      await this.initLineLiff();
  }

  async initLineLiff() {
    try {
      const data: any = await this.liffService.initLineLiff();
      this.userProfile = await liff.getProfile();
      this.userId = this.userProfile.userId;
      console.log(`Hi ${this.userProfile.displayName}!`);
    } catch (err) {
      console.log(err);
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.display_project: undefined;
  }

  private _filter(display_project: string): User[] {
    const filterValue = display_project.toLowerCase();

    // return this.options.filter(option => option.display_project.toLowerCase().indexOf(filterValue) === 0);
    return this.options.filter(option => option.display_project.toLowerCase().includes(filterValue));
  }

  async sendMessages() {
    console.log(this.favoriteSeason);
    this.selected = this.myControl.value['display_project'];
    if (this.selected === '') {
      console.log('Empthy Project');
      this.snackBar.open('Please Select Project looking for data...!!', '', {
        duration: 3000
      });
    } else {
      console.log(this.selected);
      // console.log(this.myControl);
      const proj = this.selected.split(':');
      console.log(proj[1]);

      // this.messages = 'proj: ' + this.selected + ', peroid: ' + this.favoriteSeason;
      this.messages = 'proj: ' + proj[1] + ', peroid: ' + this.favoriteSeason;
      console.log(this.messages);

      this.userProfile = await liff.getProfile();
      const accessToken = await liff.getAccessToken();

      // this.messages = this.userId;
      try {
        const successMsgs = await liff.sendMessages([{
          type: 'text',
          text: this.messages
        }
      ]);

      liff.closeWindow();

    } catch (e) {
      // alert(e);
    }
    }
  }


}
