import { Component, OnInit } from '@angular/core';
import { LiffappService, IwebvendorApRegisterService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;

@Component({
  selector: 'app-apregister',
  templateUrl: './apregister.component.html',
  styleUrls: ['./apregister.component.scss']
})
export class ApregisterComponent implements OnInit {
  messages: string;
  userProfile: any;
  selected: string;
  hide = true;

  username: string;
  password: string;
  userId: string;

  employeeid: string;
  email: string;

  success: boolean;
  loading = false;

  constructor(
    private liffService: LiffappService,
    private authen: IwebvendorApRegisterService,
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
    this.userId = '';
    this.success = false;
    this.loading = false;

    this.initLineLiff();
  }

  async ngOnInit() {
    this.messages = '';
    this.employeeid = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.success = false;
    this.loading = false;

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
      this.loading = true;
      this.userId = this.userProfile.userId;
      this.authen.apregister(this.username, this.password, this.userId).subscribe(
        async data => {
          console.log(data);
          this.success = true;

          this.messages = 'register=>emp: ' + this.username + ', password: ********';

          try {
            const successMsgs = await liff.sendMessages([{
              type: 'text',
              text: this.messages
            }
          ]);

            liff.closeWindow();
          } catch (e) {

          }

        },
        async error => {
          this.loading = false;
          console.log(error['message']);
          console.log(this.success);
          console.log(this.messages);
          this.success = false;
          this.messages = 'Login failed. Please verify your username or password.' + this.userId + ', ' + this.username + ', ' + this.password;

          try {
            const successMsgs = await liff.sendMessages([{
              type: 'text',
              text: this.messages
            }
          ]);

            liff.closeWindow();
          } catch (e) {

          }
        });
    }
  }

}
