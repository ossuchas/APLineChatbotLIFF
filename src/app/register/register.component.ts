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

  employeeid: string;
  email: string;

  success: boolean;
  loading = false;


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
    this.success = false;
    this.loading = false;

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
      this.loading = true;
      this.authen.checkAuthorized(this.username, this.password).subscribe(
        async data => {
          console.log(data);
          this.success = true;
          // this.snackBar.open('You have signed up successfully', '', {
          //   duration: 2500,
          //   verticalPosition: 'top'
          // });
          // console.log(this.success);
          // console.log(this.messages);

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
          // this.snackBar.open('Error: Can not sign up, you are unauthorized!!', '', {
          //   duration: 2500,
          //   verticalPosition: 'top'
          // });

          this.messages = 'can not sign up, you are unauthorized!!';

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

      // this.messages = 'register=>emp: ' + this.employeeid + ', email: ' + this.email;
    //   console.log(this.success);
    //   if (this.success) {
    //     this.messages = 'register=>emp: ' + this.username + ', password: ********';
    //   } else {
    //     this.messages = 'Can not sign up, you are unauthorized';
    //   }
    //   console.log(this.messages);
    //   // this.userProfile = await liff.getProfile();
    //   // const accessToken = liff.getAccessToken();
    //   try {
    //     const successMsgs = await liff.sendMessages([{
    //       type: 'text',
    //       text: this.messages
    //     }
    //   ]);

    //   liff.closeWindow();

    // } catch (e) {
    //   // alert(e);
    // }
    }
  }

}
