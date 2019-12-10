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
  firstname: string;
  lastname: string;
  employeeid: string;
  mobile: string;


  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
  ) {
    this.messages = '';
    this.firstname = '';
    this.lastname = '';
    this.employeeid = '';
    this.mobile = '';

    this.initLineLiff();
  }

  async ngOnInit() {
    this.messages = '';
    this.firstname = '';
    this.lastname = '';
    this.employeeid = '';
    this.mobile = '';

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

    if (this.firstname === '' || this.lastname === ''
    || this.employeeid === '' || this.mobile === ''
    ) {
      console.log('Empthy Project');
      this.snackBar.open('Please fill in all info ...!!', '', {
        duration: 3000
      });
    } else {
      console.log(this.firstname);
      console.log(this.lastname);
      console.log(this.employeeid);
      console.log(this.mobile);
      // console.log(this.selected);
      // const proj = this.selected.split(':');
      // console.log(proj[1]);

      // this.messages = 'proj: ' + proj[1] + ', peroid: ';
      this.userProfile = await liff.getProfile();
      const accessToken = liff.getAccessToken();
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
