import { Component, OnInit } from '@angular/core';
import { LiffappService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  messages: string;
  userProfile: any;
  selected: string;

  // Input value
  // firstname: string;
  // lastname: string;
  employeeid: string;
  // mobile: string;
  email: string;


  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
  ) {
    this.messages = '';
    // this.firstname = '';
    // this.lastname = '';
    this.employeeid = '';
    // this.mobile = '';
    this.email = '';

    this.initLineLiff();
  }

  async ngOnInit() {
    this.messages = '';
    // this.firstname = '';
    // this.lastname = '';
    this.employeeid = '';
    // this.mobile = '';
    this.email = '';

    await this.initLineLiff();
  }

  async initLineLiff() {
    try {
      const data: any = await this.liffService.initLineLiff();
      this.userProfile = await liff.getProfile();
      console.log(`Hi ${this.userProfile.displayName}!`);
    } catch (err) {
      console.log(err);
    }
  }

  async sendMessages() {

    if (this.employeeid === '' || this.email === '') {
      // console.log('Empthy Project');
      this.snackBar.open('Please fill in email or employee no. info ...!!', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    } else {
      // console.log(this.firstname);
      // console.log(this.lastname);
      console.log(this.employeeid);
      console.log(this.email);
      // console.log(this.mobile);
      // console.log(this.selected);
      // const proj = this.selected.split(':');
      // console.log(proj[1]);

      this.messages = 'register=>emp: ' + this.employeeid + ', email: ' + this.email;
      // this.userProfile = await liff.getProfile();
      // const accessToken = liff.getAccessToken();
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
