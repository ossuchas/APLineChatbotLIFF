import { Component, OnInit } from '@angular/core';
import {
  LiffappService,
  CrmProduct,
  ChatbotMstProjectService,
  CrmMstProduct,
  UserRoleProject,
  ChatbotRoleprojectService
} from 'src/app/shared';

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
  userId: string;

  favoriteSeason: string;
  seasons: string[] = ['Year to Date', 'Quarter (Current Quarter)', 'Week (last week and current week)'];

  products: CrmProduct[] = [
    {ProductID: '60021', Project: 'ASPIRE Sukhumvit-Onnut '},
    {ProductID: '10096', Project: 'Aspire งามวงศ์วาน'},
    {ProductID: '10131', Project: 'Aspire ตากสิน (2)'},
    {ProductID: '60004', Project: 'Aspire รัชดา-วงศ์สว่าง'},
    {ProductID: '10059', Project: 'Aspire รัตนาธิเบศร์'},
    {ProductID: '70002', Project: 'Aspire รัตนาธิเบศร์ 2'},
    {ProductID: '70009', Project: 'Aspire รัตนาธิเบศร์ Phase C'},
    {ProductID: '40011', Project: 'Aspire ลาดพร้าว 113 '},
    {ProductID: '10132', Project: 'Aspire สาทร-ตากสิน (คอปเปอร์โซน)'},
    {ProductID: '60025', Project: 'Aspire สาทร-ราชพฤกษ์'},
    {ProductID: '40052', Project: 'Aspire อโศก-รัชดา'},
    {ProductID: '70013', Project: 'Aspire อุดรธานี'},
    {ProductID: '99907', Project: 'Aspire อุดรธานี'},
    {ProductID: '40017', Project: 'Aspire เอราวัณ (ทาวเวอร์ บี)'},
    {ProductID: '10191', Project: 'Centro Westgate'},
    {ProductID: '40030', Project: 'Centro ชัยพฤกษ์ –แจ้งวัฒนะ 2'},
    {ProductID: '70051', Project: 'Centro ชัยพฤกษ์-345'},
    {ProductID: '10210', Project: 'Centro ชัยพฤกษ์-แจ้งวัฒนะ'},
    {ProductID: '40044', Project: 'Centro บางนา – กิ่งแก้ว'},
    {ProductID: '40024', Project: 'Centro บางนา กม.7'},
    {ProductID: '70039', Project: 'Centro บางนา-วงแหวน  '},
    {ProductID: '40035', Project: 'Centro บางใหญ่'},
    {ProductID: '70057', Project: 'Centro ประชาอุทิศ 90'},
    {ProductID: '10176', Project: 'Centro ปิ่นเกล้า - วงแหวน'},
    {ProductID: '40039', Project: 'Centro พระราม 2-พุทธบูชา'},
    {ProductID: '10207', Project: 'Centro พระราม9-มอเตอร์เวย์'},
    {ProductID: '40021', Project: 'Centro พหลฯ-วิภาวดี'},
    {ProductID: '10200', Project: 'Centro รังสิต'},
    {ProductID: '40025', Project: 'Centro รังสิต คลอง 4-วงแหวน'},
    {ProductID: '10193', Project: 'Centro ราชพฤกษ์'},
    {ProductID: '40040', Project: 'Centro ราชพฤกษ์ 2'},
    {ProductID: '40032', Project: 'Centro ราชพฤกษ์ -แจ้งวัฒนะ'},
    {ProductID: '40023', Project: 'Centro ราชพฤกษ์-สวนผัก'},
    {ProductID: '70023', Project: 'Centro ราชพฤกษ์-สวนผัก2'},
    {ProductID: '10135', Project: 'Centro รามอินทรา 109 '},
    {ProductID: '20008', Project: 'Centro รามอินทรา-จตุโชติ'},
    {ProductID: '70038', Project: 'Centro วงแหวน - จตุโชติ'},
    {ProductID: '10183', Project: 'Centro ศรีนครินทร์-บางนา'},
    {ProductID: '40055', Project: 'Centro สะพานเจษฎาบดินทร์ 2'},
    {ProductID: '40050', Project: 'Centro สะพานมหาเจษฎาบดินทร์ฯ'},
    {ProductID: '70058', Project: 'Centro สาทร-กัลปพฤกษ์'},
    {ProductID: '10190', Project: 'Centro สุขสวัสดิ์ - พระราม 3'},
    {ProductID: '40022', Project: 'Centro อ่อนนุช -สุวรรณภูมิ'},
    {ProductID: '70014', Project: 'COO พิษณุโลก'},
    {ProductID: '20020', Project: 'District เทพารักษ์'},
    {ProductID: '40013', Project: 'District ลาดพร้าว (เฟส1)'},
    {ProductID: '70017', Project: 'District ลาดพร้าว (เฟส2)'},
    {ProductID: '10181', Project: 'District เอกมัย-รามอินทรา'},
    {ProductID: '70067', Project: 'Grand Pleno วงศกร 2'},
    {ProductID: '10186', Project: 'Grande Pleno ท่าน้ำนนท์'},
    {ProductID: '40054', Project: 'GRANDE PLENO พหลโยธิน-รังสิต'},
    {ProductID: '10178', Project: 'Grande Pleno รัตนาธิเบศร์ '},
    {ProductID: '70030', Project: 'Grande Pleno ราชพฤกษ์'},
    {ProductID: '70034', Project: 'Grande Pleno วัชรพล-สุขาภิบาล 5'},
    {ProductID: '10180', Project: 'Grande Pleno สุขสวัสดิ์'},
    {ProductID: '40036', Project: 'GRANDE PLENO สุขสวัสดิ์-พระราม 3'},
    {ProductID: '60015', Project: 'Life ๑ Wireless'},
    {ProductID: '60022', Project: 'Life Asoke-Hype'},
    {ProductID: '60010', Project: 'Life Ladprao'},
    {ProductID: '60019', Project: 'Life Ladprao Valley'},
    {ProductID: '60018', Project: 'Life Sukhumvit 62'},
    {ProductID: '60013', Project: 'Life ปิ่นเกล้า'},
    {ProductID: '60020', Project: 'Life สาทร เซียร์รา'},
    {ProductID: '60008', Project: 'Life อโศก'},
    {ProductID: '60016', Project: 'Life อโศก - พระราม 9'},
    {ProductID: '10150', Project: 'Mind ติวานนท์'},
    {ProductID: '10168', Project: 'Mind ปิ่นเกล้า-จรัญฯ'},
    {ProductID: '10163', Project: 'Mind พระราม 2 - สาทร'},
    {ProductID: '40016', Project: 'Mind พระราม 2 (TH)'},
    {ProductID: '40043', Project: 'Pleno ชัยพฤกษ์'},
    {ProductID: '10209', Project: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ'},
    {ProductID: '70028', Project: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ 2'},
    {ProductID: '70027', Project: 'Pleno ดอนเมือง-สรงประภา'},
    {ProductID: '70061', Project: 'Pleno ติวานนท์'},
    {ProductID: '10151', Project: 'Pleno ติวานนท์-แจ้งวัฒนะ'},
    {ProductID: '60028', Project: 'Pleno บางนา – วงแหวน'},
    {ProductID: '40028', Project: 'Pleno บางนา – อ่อนนุช'},
    {ProductID: '10206', Project: 'Pleno บางใหญ่'},
    {ProductID: '70041', Project: 'Pleno บางใหญ่ 2'},
    {ProductID: '70065', Project: 'Pleno ประชาสามัคคี'},
    {ProductID: '40026', Project: 'Pleno ปิ่นเกล้า – จรัญฯ'},
    {ProductID: '10156', Project: 'Pleno ปิ่นเกล้า-วงแหวน'},
    {ProductID: '20016', Project: 'Pleno พระราม 9 – กรุงเทพกรีฑา'},
    {ProductID: '70052', Project: 'Pleno พระราม9-กรุงเทพกรีฑา2'},
    {ProductID: '10196', Project: 'Pleno พหลโยธิน'},
    {ProductID: '10208', Project: 'Pleno พหลโยธิน - วัชรพล'},
    {ProductID: '10140', Project: 'Pleno พหลโยธิน - สายไหม'},
    {ProductID: '70020', Project: 'Pleno พหลโยธิน รังสิต'},
    {ProductID: '70025', Project: 'Pleno พหลโยธิน-วัชรพล 2'},
    {ProductID: '20005', Project: 'Pleno เพชรเกษม 112'},
    {ProductID: '20021', Project: 'Pleno รังสิต'},
    {ProductID: '70022', Project: 'Pleno รังสิต คลอง 4-วงแหวน'},
    {ProductID: '70044', Project: 'Pleno รัตนาธิเบศร์-บางใหญ่'},
    {ProductID: '10205', Project: 'Pleno ราชพฤกษ์'},
    {ProductID: '70047', Project: 'Pleno ราชพฤกษ์-แจ้งวัฒนะ'},
    {ProductID: '10175', Project: 'Pleno ราชพฤกษ์-พระราม 5'},
    {ProductID: '40033', Project: 'Pleno ราชพฤกษ์-รัตนาธิเบศร์'},
    {ProductID: '40042', Project: 'Pleno รามอินทรา'},
    {ProductID: '70046', Project: 'Pleno รามอินทรา 109 (ซ.พระยาสุเรนทร์ 11)'},
    {ProductID: '70060', Project: 'Pleno รามอินทรา บางชันสเตชั่น'},
    {ProductID: '20011', Project: 'Pleno รามอินทรา-วงแหวน'},
    {ProductID: '70035', Project: 'Pleno ลาดพร้าว-เสรีไทย'},
    {ProductID: '70029', Project: 'Pleno เวสต์เกต'},
    {ProductID: '40008', Project: 'Pleno ศรีนครินทร์'},
    {ProductID: '70059', Project: 'Pleno ศรีนครินทร์ เทพารักษ์'},
    {ProductID: '70045', Project: 'Pleno สาทร-สุขสวัสดิ์'},
    {ProductID: '10199', Project: 'Pleno สุขสวัสดิ์'},
    {ProductID: '70054', Project: 'Pleno สุขสวัสดิ์ 30 โครงการ 2'},
    {ProductID: '10172', Project: 'Pleno สุขสวัสดิ์ 66'},
    {ProductID: '40046', Project: 'Pleno สุขสวัสดิ์ 70'},
    {ProductID: '10179', Project: 'Pleno สุขสวัสดิ์-พระราม3'},
    {ProductID: '70019', Project: 'Pleno สุขุมวิท – บางนา'},
    {ProductID: '70040', Project: 'Pleno อิเกีย-บางนา'},
    {ProductID: '60031', Project: 'Rhythm Charoenkrung Pavillion'},
    {ProductID: '60012', Project: 'Rhythm รางน้ำ'},
    {ProductID: '10087', Project: 'RHYTHM สาทร'},
    {ProductID: '60007', Project: 'RHYTHM เอกมัย'},
    {ProductID: '60029', Project: 'RHYTHM เอกมัย Estate'},
    {ProductID: '10145', Project: 'SOUL รัชดาภิเษก 68'},
    {ProductID: '10142', Project: 'SOUL ลาดพร้าว - เสนา'},
    {ProductID: '60023', Project: 'The Address สยาม-ราชเทวี'},
    {ProductID: '10060', Project: 'The Centro รัตนาธิเบศร์'},
    {ProductID: '10077', Project: 'The Centro วัชรพล'},
    {ProductID: '10174', Project: 'The City นวมินทร์ '},
    {ProductID: '20006', Project: 'The City บางนา กม.7'},
    {ProductID: '10192', Project: 'The City ปิ่นเกล้า - สาย 4'},
    {ProductID: '10216', Project: 'The City ปิ่นเกล้า-บรมฯ'},
    {ProductID: '70055', Project: 'The City พระราม 2 – พุทธบูชา'},
    {ProductID: '70033', Project: 'The City พระราม 9 – กรุงเทพกรีฑา'},
    {ProductID: '10185', Project: 'The City พหลโยธิน'},
    {ProductID: '10173', Project: 'The City พัฒนาการ'},
    {ProductID: '40027', Project: 'The City รัชดาฯ - วงศ์สว่าง'},
    {ProductID: '10201', Project: 'The City รัตนาธิเบศร์ – บางใหญ่'},
    {ProductID: '10187', Project: 'The City ราชพฤกษ์'},
    {ProductID: '40031', Project: 'The City ราชพฤกษ์ - ปิ่นเกล้า'},
    {ProductID: '10100', Project: 'The City ราชพฤกษ์-จรัญสนิทวงศ์ 13'},
    {ProductID: '20009', Project: 'The City ราชพฤกษ์-สวนผัก'},
    {ProductID: '10143', Project: 'The City รามอินทรา'},
    {ProductID: '70056', Project: 'The City รามอินทรา 2'},
    {ProductID: '40045', Project: 'The City สะพานมหาเจษฎาบดินทร์ฯ'},
    {ProductID: '70050', Project: 'The City สาทร-กัลปพฤกษ์'},
    {ProductID: '10165', Project: 'The City สาทร-ราชพฤกษ์'},
    {ProductID: '10212', Project: 'The City สาทร-สุขสวัสดิ์'},
    {ProductID: '10166', Project: 'The City สุขสวัสดิ์'},
    {ProductID: '70043', Project: 'The City สุขสวัสดิ์ 64'},
    {ProductID: '10164', Project: 'The City สุขุมวิท-บางนา'},
    {ProductID: '70026', Project: 'The City เอกมัย - ลาดพร้าว'},
    {ProductID: '10149', Project: 'The Palazzo จรัญสนิทวงศ์ - ราชพฤกษ์'},
    {ProductID: '70042', Project: 'The Palazzo ปิ่นเกล้า'},
    {ProductID: '10203', Project: 'The Palazzo ศรีนครินทร์'},
    {ProductID: '10091', Project: 'The Pleno พระราม 5-ปิ่นเกล้า'},
    {ProductID: '70012', Project: 'The Pleno รัตนาธิเบศร์-ชัยพฤกษ์'},
    {ProductID: '70036', Project: 'THE SONNE ศรีนครินทร์ – บางนา'},
    {ProductID: '60002', Project: 'Vittorio'},
    {ProductID: '20023', Project: 'นครศรีธรรมราช'},
    {ProductID: '10194', Project: 'บ้านกลางเมือง CLASSE  เอกมัย-รามอินทรา'},
    {ProductID: '10154', Project: 'บ้านกลางเมือง THE EDITION  พระราม 9 – อ่อนนุช '},
    {ProductID: '60024', Project: 'บ้านกลางเมือง The Edition บางนา-วงแหวน'},
    {ProductID: '60026', Project: 'บ้านกลางเมือง The Edition บางนา-วงแหวน (Business District)'},
    {ProductID: '40029', Project: 'บ้านกลางเมือง THE EDITION พระราม9 - พัฒนาการ'},
    {ProductID: '20012', Project: 'บ้านกลางเมือง The Edition พระราม9-กรุงเทพกรีฑา'},
    {ProductID: '70037', Project: 'บ้านกลางเมือง THE EDITION สาทร-สุขสวัสดิ์'},
    {ProductID: '40047', Project: 'บ้านกลางเมือง The Edition สุขสวัสดิ์ – พระราม 3'},
    {ProductID: '40041', Project: 'บ้านกลางเมือง The Era ปิ่นเกล้า-จรัญฯ'},
    {ProductID: '10122', Project: 'บ้านกลางเมือง กัลปพฤกษ์'},
    {ProductID: '10128', Project: 'บ้านกลางเมือง เกษตร-นวมินทร์'},
    {ProductID: '10139', Project: 'บ้านกลางเมือง งามวงศ์วาน'},
    {ProductID: '10118', Project: 'บ้านกลางเมือง นวมินทร์ 42'},
    {ProductID: '60027', Project: 'บ้านกลางเมือง บางนา-วงแหวน'},
    {ProductID: '10169', Project: 'บ้านกลางเมือง พระราม 2 '},
    {ProductID: '10137', Project: 'บ้านกลางเมือง พระราม 2-พุทธบูชา'},
    {ProductID: '10123', Project: 'บ้านกลางเมือง พระราม 9'},
    {ProductID: '20017', Project: 'บ้านกลางเมือง พระราม9-กรุงเทพกรีฑา'},
    {ProductID: '60014', Project: 'บ้านกลางเมือง พระราม9-อ่อนนุช'},
    {ProductID: '10171', Project: 'บ้านกลางเมือง พหลโยธิน 50 '},
    {ProductID: '70015', Project: 'บ้านกลางเมือง รัชดา-วงศ์สว่าง'},
    {ProductID: '10136', Project: 'บ้านกลางเมือง รัตนาธิเบศร์'},
    {ProductID: '40037', Project: 'บ้านกลางเมือง ราชพฤกษ์'},
    {ProductID: '70024', Project: 'บ้านกลางเมือง ราชพฤกษ์ – รัตนาธิเบศร์ '},
    {ProductID: '70053', Project: 'บ้านกลางเมือง ราชพฤกษ์_The Walk'},
    {ProductID: '20007', Project: 'บ้านกลางเมือง ราชพฤกษ์-พระราม 5'},
    {ProductID: '20018', Project: 'บ้านกลางเมือง รามอินทรา'},
    {ProductID: '20010', Project: 'บ้านกลางเมือง รามอินทรา-วัชรพล'},
    {ProductID: '10214', Project: 'บ้านกลางเมือง ลาดพร้าว-เสรีไทย '},
    {ProductID: '40034', Project: 'บ้านกลางเมือง วัชรพล'},
    {ProductID: '10159', Project: 'บ้านกลางเมือง วิภาวดี'},
    {ProductID: '10177', Project: 'บ้านกลางเมือง สวนหลวง'},
    {ProductID: '10213', Project: 'บ้านกลางเมือง สาทร-สุขสวัสดิ์ '},
    {ProductID: '10161', Project: 'บ้านกลางเมือง สุขสวัสดิ์'},
    {ProductID: '10153', Project: 'บ้านกลางเมือง สุขุมวิท 77'},
    {ProductID: '10197', Project: 'บ้านกลางเมืองปิ่นเกล้า – จรัญฯ'},
    {ProductID: '60037', Project: 'วิภาวดี 26'},
    {ProductID: '70018', Project: 'อาคารพาณิชย์ Mind พระราม7 '},
    {ProductID: '40018', Project: 'แอสปาย เอราวัณ ไพร์ม'},
  ];

  constructor(
    private liffService: LiffappService,
    private snackBar: MatSnackBar,
    public serviceMstProject: ChatbotMstProjectService,
    public serviceUserRoleProject: ChatbotRoleprojectService
  ) {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';
    this.userId = '';
    this.initLineLiff();

  }
  public listItems: Array<string> = [];

  async ngOnInit() {
    this.messages = '';
    this.selected = '';
    this.favoriteSeason = '';
    // this.userId = '';

    await this.initLineLiff();

    this.dropdownMstProjectRefresh(this.userId);

  }

  dropdownMstProjectRefresh(userId: string) {
    // console.log(this.userId);
    // this.userProfile = liff.getProfile();
    // this.userId = this.userProfile.userId;
    this.userId = 'U80a30a5bad4ea0f5f7995e5050ab8d7e';
    // this.serviceMstProject.getMstProject().subscribe(data => {
    //     data.forEach(element => {
    //         // tslint:disable-next-line:no-string-literal
    //         this.listItems.push(element['projectname'] + ':' + element['productid']);
    //     });
    // });
    this.serviceUserRoleProject.getUserRoleProject(this.userId).subscribe(data => {
        data.forEach(element => {
            // tslint:disable-next-line:no-string-literal
            this.listItems.push(element['project_name'] + ':' + element['projectcode']);
        });
    });
}

  async initLineLiff() {
    try {
      const data: any = await this.liffService.initLineLiff();
      this.userProfile = await liff.getProfile();
      this.userId = this.userProfile.userId;
      // this.userId = this.userProfile.userId;
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
      // console.log(this.messages);
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
