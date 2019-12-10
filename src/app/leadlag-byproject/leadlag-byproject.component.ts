import { Component, OnInit } from '@angular/core';
import { LiffappService, CrmProduct, ChatbotMstProjectService, CrmMstProduct } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;

@Component({
  selector: 'app-leadlag-byproject',
  templateUrl: './leadlag-byproject.component.html',
  styleUrls: ['./leadlag-byproject.component.scss']
})
export class LeadlagByprojectComponent implements OnInit {
  messages: string;
  userProfile: any;
  selected: string;

  favoriteSeason: string;
  seasons: string[] = ['Year to Date', 'Quarter (Current Quarter)', 'Week (last week and current week)'];

  products: CrmProduct[] = [
    {ProductID: '10135', Project: '10135: Centro รามอินทรา 109'},
    {ProductID: '10210', Project: '10210: Centro ชัยพฤกษ์ - แจ้งวัฒนะ '},
    {ProductID: '20009', Project: '20009: The City ราชพฤกษ์ - สวนผัก'},
    {ProductID: '40050', Project: '40050: Centro สะพานมหาเจษฎาบดินทร์ฯ'},
    {ProductID: '10200', Project: '10200: Centro รังสิต'},
    {ProductID: '40025', Project: '40025: Centro รังสิต คลอง4 - วงแหวน'}
  ];

  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
    public serviceMstProject: ChatbotMstProjectService
  ) {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';
    this.initLineLiff();

  }
  public listItems: Array<string> = [];

  async ngOnInit() {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';

    this.dropdownMstProjectRefresh();

    await this.initLineLiff();
  }

  dropdownMstProjectRefresh() {
    this.serviceMstProject.getMstProject().subscribe(data => {
        data.forEach(element => {
            // tslint:disable-next-line:no-string-literal
            this.listItems.push(element['projectname'] + ':' + element['productid']);
        });
    });
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
    console.log(this.favoriteSeason);
    if (this.selected === '') {
      console.log('Empthy Project');
      this.snackBar.open('Please Select Project looking for data...!!', '', {
        duration: 3000
      });
    } else {
      console.log(this.selected);
      const proj = this.selected.split(':');
      console.log(proj[1]);

      // this.messages = 'proj: ' + this.selected + ', peroid: ' + this.favoriteSeason;
      this.messages = 'proj: ' + proj[1] + ', peroid: ' + this.favoriteSeason;
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
