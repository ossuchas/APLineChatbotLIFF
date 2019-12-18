import { Component, OnInit } from '@angular/core';
import { LiffappService, ChatbotAuthenService } from 'src/app/shared';
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
  hide = true;

  username: string;
  password: string;

  // Input value
  // firstname: string;
  // lastname: string;
  employeeid: string;
  // mobile: string;
  email: string;


  constructor(
    private liffService: LiffappService,
    private authen: ChatbotAuthenService,
    private snackBar: MatSnackBar,
  ) {
    this.messages = '';
    // this.firstname = '';
    // this.lastname = '';
    this.employeeid = '';
    // this.mobile = '';
    this.email = '';
    this.username = '';
    this.password = '';

    this.initLineLiff();
  }

  async ngOnInit() {
    this.messages = '';
    // this.firstname = '';
    // this.lastname = '';
    this.employeeid = '';
    // this.mobile = '';
    this.email = '';
    this.username = '';
    this.password = '';

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

    if (this.username === '' && this.password === '') {
      // console.log('Empthy Project');
      // this.snackBar.open('Please fill in email or password....!!', '', {
      this.snackBar.open('Blank is not allow, please fill in username and password....!!', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    } else if (this.username === '' || this.password === ''){
      this.snackBar.open('Please fill in username or password....!!', '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    } else {
      // console.log(this.username);
      // console.log(this.password);

      this.authen.checkAuthorized(this.username, this.password).subscribe(
        data => {
          console.log(data);
          this.snackBar.open('You have signed up successfully', '', {
            duration: 2500,
            verticalPosition: 'top'
          });
        },
        error => {
          console.log(error['message']);
          this.snackBar.open('Error: Can not sign up, you are unauthorized!!', '', {
            duration: 2500,
            verticalPosition: 'top'
          });
        });

      // this.messages = 'register=>emp: ' + this.employeeid + ', email: ' + this.email;
      this.messages = 'register=>emp: ' + this.employeeid + ', password: ********';
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
