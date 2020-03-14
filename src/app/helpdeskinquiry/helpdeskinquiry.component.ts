import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LiffappService, CrmProduct, ChatbotMstProjectService, CrmMstProduct } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;

export interface User {
  name: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

export interface System {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-helpdeskinquiry',
  templateUrl: './helpdeskinquiry.component.html',
  styleUrls: ['./helpdeskinquiry.component.scss']
})
export class HelpdeskinquiryComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }
  messages: string;
  userProfile: any;
  userId: string;
  selected: string;
  statusSelected: string;

  favoriteSeason: string;
  seasons: string[] = ['Year to Date', 'Quarter (Current Quarter)', 'Week (last week and current week)'];

  statusControl = new FormControl('', [Validators.required]);
  systemControl = new FormControl('', [Validators.required]);

  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
    public serviceMstProject: ChatbotMstProjectService
  ) {
    this.messages = '';
    this.selected = '';
    this.statusSelected = '';
    this.favoriteSeason = '';
    this.initLineLiff();

  }

  status: Status[] = [
    { value: 'Created', viewValue: 'Created' },
    { value: 'Open', viewValue: 'Open' },
    { value: 'In Process', viewValue: 'In Process' },
    { value: 'Finish', viewValue: 'Finish' },
    { value: 'Reject', viewValue: 'Reject' },
    { value: 'Closed', viewValue: 'Closed' },
  ];

  systems: System[] = [
    { value: 'CRM', viewValue: 'CRM' },
    { value: 'Stock', viewValue: 'Stock' },
  ];

  myControl = new FormControl();
  options: User[] = [
    {name: 'Created'},
    {name: 'Open'},
    {name: 'In Process'},
    {name: 'Finish'},
    {name: 'Reject'},
    {name: 'Closed'}
  ];
  filteredOptions: Observable<User[]>;

  async ngOnInit() {
    this.messages = '';
    this.selected = '';
    this.statusSelected = '';
    this.favoriteSeason = '';
    this.userId = '';

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
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
    return user ? user.name : undefined;
  }


  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    // return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  async sendMessages() {
    // console.log(this.statusSelected);
    // console.log(this.favoriteSeason);
    // this.selected = this.myControl.value['name'.toString()];
    // if (this.selected === '') {
    if (this.systemControl.invalid || this.statusControl.invalid) {
      console.log('Empthy Fillter');
      this.snackBar.open('Please Select System or Status looking for data...!!', '', {
        duration: 2500
      });
    } else {
      if (this.systemControl.invalid) {
        this.snackBar.open('Please Select System to filter....!!', '', {
        duration: 2500,
        verticalPosition: 'top'
        });
      }

      if (this.statusControl.invalid) {
        this.snackBar.open('Please Select Status to filter....!!', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
      }

      console.log(this.systemControl.value);
      console.log(this.statusControl.value);

      // console.log(this.selected);
      // const proj = this.selected.split(':');
      // console.log(proj[1]);

      // this.messages = 'proj: ' + this.selected + ', peroid: ' + this.favoriteSeason;
      this.messages = 'inquiry=>system: ' + this.systemControl.value + ', status: ' + this.statusControl.value;
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
