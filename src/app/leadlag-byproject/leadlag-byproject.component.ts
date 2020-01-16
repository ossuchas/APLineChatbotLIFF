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
    {ProductID: '60021', Project: 'ASPIRE Sukhumvit-Onnut :60021'},
    {ProductID: '10096', Project: 'Aspire งามวงศ์วาน:10096'},
    {ProductID: '60004', Project: 'Aspire รัชดา-วงศ์สว่าง:60004'},
    {ProductID: '10059', Project: 'Aspire รัตนาธิเบศร์:10059'},
    {ProductID: '70002', Project: 'Aspire รัตนาธิเบศร์ 2:70002'},
    {ProductID: '70009', Project: 'Aspire รัตนาธิเบศร์ Phase C:70009'},
    {ProductID: '40011', Project: 'Aspire ลาดพร้าว 113 :40011'},
    {ProductID: '10132', Project: 'Aspire สาทร-ตากสิน (คอปเปอร์โซน):10132'},
    {ProductID: '60025', Project: 'Aspire สาทร-ราชพฤกษ์:60025'},
    {ProductID: '40052', Project: 'Aspire อโศก-รัชดา:40052'},
    {ProductID: '70013', Project: 'Aspire อุดรธานี:70013'},
    {ProductID: '40018', Project: 'Aspire เอราวัณ (Tower A):40018'},
    {ProductID: '40017', Project: 'Aspire เอราวัณ (ทาวเวอร์ บี):40017'},
    {ProductID: '10191', Project: 'Centro Westgate:10191'},
    {ProductID: '40030', Project: 'Centro ชัยพฤกษ์ –แจ้งวัฒนะ 2:40030'},
    {ProductID: '10210', Project: 'Centro ชัยพฤกษ์-แจ้งวัฒนะ:10210'},
    {ProductID: '40055', Project: 'Centro ไทรม้า 2:40055'},
    {ProductID: '40044', Project: 'Centro บางนา – กิ่งแก้ว:40044'},
    {ProductID: '40024', Project: 'Centro บางนา กม.7:40024'},
    {ProductID: '70039', Project: 'Centro บางนา-วงแหวน  :70039'},
    {ProductID: '40035', Project: 'Centro บางใหญ่:40035'},
    {ProductID: '10176', Project: 'Centro ปิ่นเกล้า - วงแหวน:10176'},
    {ProductID: '40039', Project: 'Centro พระราม 2-พุทธบูชา:40039'},
    {ProductID: '10207', Project: 'Centro พระราม9-มอเตอร์เวย์:10207'},
    {ProductID: '40021', Project: 'Centro พหลฯ-วิภาวดี:40021'},
    {ProductID: '10200', Project: 'Centro รังสิต:10200'},
    {ProductID: '40025', Project: 'Centro รังสิต คลอง 4-วงแหวน:40025'},
    {ProductID: '10193', Project: 'Centro ราชพฤกษ์:10193'},
    {ProductID: '40040', Project: 'Centro ราชพฤกษ์ 2:40040'},
    {ProductID: '40032', Project: 'Centro ราชพฤกษ์ -แจ้งวัฒนะ:40032'},
    {ProductID: '40023', Project: 'Centro ราชพฤกษ์-สวนผัก:40023'},
    {ProductID: '10135', Project: 'Centro รามอินทรา 109 :10135'},
    {ProductID: '20008', Project: 'Centro รามอินทรา-จตุโชติ:20008'},
    {ProductID: '70038', Project: 'Centro วงแหวน - จตุโชติ:70038'},
    {ProductID: '10183', Project: 'Centro ศรีนครินทร์-บางนา:10183'},
    {ProductID: '40050', Project: 'Centro สะพานมหาเจษฎาบดินทร์ฯ:40050'},
    {ProductID: '10190', Project: 'Centro สุขสวัสดิ์ - พระราม 3:10190'},
    {ProductID: '40022', Project: 'Centro อ่อนนุช -สุวรรณภูมิ:40022'},
    {ProductID: '70014', Project: 'COO พิษณุโลก:70014'},
    {ProductID: '40013', Project: 'District ลาดพร้าว (เฟส1):40013'},
    {ProductID: '70017', Project: 'District ลาดพร้าว (เฟส2):70017'},
    {ProductID: '10181', Project: 'District เอกมัย-รามอินทรา:10181'},
    {ProductID: '10186', Project: 'Grande Pleno ท่าน้ำนนท์:10186'},
    {ProductID: '40054', Project: 'GRANDE PLENO พหลโยธิน-รังสิต:40054'},
    {ProductID: '10178', Project: 'Grande Pleno รัตนาธิเบศร์ :10178'},
    {ProductID: '70030', Project: 'Grande Pleno ราชพฤกษ์:70030'},
    {ProductID: '70034', Project: 'Grande Pleno วัชรพล-สุขาภิบาล 5:70034'},
    {ProductID: '10180', Project: 'Grande Pleno สุขสวัสดิ์:10180'},
    {ProductID: '40036', Project: 'GRANDE PLENO สุขสวัสดิ์-พระราม 3:40036'},
    {ProductID: '60015', Project: 'Life ๑ Wireless:60015'},
    {ProductID: '60022', Project: 'Life Asoke-Hype:60022'},
    {ProductID: '60010', Project: 'Life Ladprao:60010'},
    {ProductID: '60019', Project: 'Life Ladprao Valley:60019'},
    {ProductID: '60018', Project: 'Life Sukhumvit 62:60018'},
    {ProductID: '60013', Project: 'Life ปิ่นเกล้า:60013'},
    {ProductID: '60020', Project: 'Life สาทร เซียร์รา:60020'},
    {ProductID: '60008', Project: 'Life อโศก:60008'},
    {ProductID: '60016', Project: 'Life อโศก - พระราม 9:60016'},
    {ProductID: '10150', Project: 'Mind ติวานนท์:10150'},
    {ProductID: '10168', Project: 'Mind ปิ่นเกล้า-จรัญฯ:10168'},
    {ProductID: '10163', Project: 'Mind พระราม 2 - สาทร:10163'},
    {ProductID: '40016', Project: 'Mind พระราม 2 (TH):40016'},
    {ProductID: '70018', Project: 'Mind พระราม 7 (TH):70018'},
    {ProductID: '40043', Project: 'Pleno ชัยพฤกษ์:40043'},
    {ProductID: '10209', Project: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ:10209'},
    {ProductID: '70028', Project: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ 2:70028'},
    {ProductID: '70027', Project: 'Pleno ดอนเมือง-สรงประภา:70027'},
    {ProductID: '10151', Project: 'Pleno ติวานนท์-แจ้งวัฒนะ:10151'},
    {ProductID: '60028', Project: 'Pleno บางนา – วงแหวน:60028'},
    {ProductID: '40028', Project: 'Pleno บางนา – อ่อนนุช:40028'},
    {ProductID: '10206', Project: 'Pleno บางใหญ่:10206'},
    {ProductID: '70041', Project: 'Pleno บางใหญ่ 2:70041'},
    {ProductID: '40026', Project: 'Pleno ปิ่นเกล้า – จรัญฯ:40026'},
    {ProductID: '10156', Project: 'Pleno ปิ่นเกล้า-วงแหวน:10156'},
    {ProductID: '20016', Project: 'Pleno พระราม 9 – กรุงเทพกรีฑา:20016'},
    {ProductID: '10196', Project: 'Pleno พหลโยธิน:10196'},
    {ProductID: '10208', Project: 'Pleno พหลโยธิน - วัชรพล:10208'},
    {ProductID: '10140', Project: 'Pleno พหลโยธิน - สายไหม:10140'},
    {ProductID: '70020', Project: 'Pleno พหลโยธิน รังสิต:70020'},
    {ProductID: '70025', Project: 'Pleno พหลโยธิน-วัชรพล 2:70025'},
    {ProductID: '20005', Project: 'Pleno เพชรเกษม 112:20005'},
    {ProductID: '70022', Project: 'Pleno รังสิต คลอง 4-วงแหวน:70022'},
    {ProductID: '10205', Project: 'Pleno ราชพฤกษ์:10205'},
    {ProductID: '70047', Project: 'Pleno ราชพฤกษ์-แจ้งวัฒนะ:70047'},
    {ProductID: '10175', Project: 'Pleno ราชพฤกษ์-พระราม 5:10175'},
    {ProductID: '40033', Project: 'Pleno ราชพฤกษ์-รัตนาธิเบศร์:40033'},
    {ProductID: '40042', Project: 'Pleno รามอินทรา:40042'},
    {ProductID: '70046', Project: 'Pleno รามอินทรา 109 (ซ.พระยาสุเรนทร์ 11):70046'},
    {ProductID: '20011', Project: 'Pleno รามอินทรา-วงแหวน:20011'},
    {ProductID: '70035', Project: 'Pleno ลาดพร้าว-เสรีไทย:70035'},
    {ProductID: '70029', Project: 'Pleno เวสต์เกต:70029'},
    {ProductID: '40008', Project: 'Pleno ศรีนครินทร์:40008'},
    {ProductID: '70045', Project: 'Pleno สาทร-สุขสวัสดิ์:70045'},
    {ProductID: '10199', Project: 'Pleno สุขสวัสดิ์:10199'},
    {ProductID: '70054', Project: 'Pleno สุขสวัสดิ์ 30-8:70054'},
    {ProductID: '10172', Project: 'Pleno สุขสวัสดิ์ 66:10172'},
    {ProductID: '40046', Project: 'Pleno สุขสวัสดิ์ 70:40046'},
    {ProductID: '10179', Project: 'Pleno สุขสวัสดิ์-พระราม3:10179'},
    {ProductID: '70019', Project: 'Pleno สุขุมวิท – บางนา:70019'},
    {ProductID: '60031', Project: 'Rhythm Charoenkrung Pavillion:60031'},
    {ProductID: '60012', Project: 'Rhythm รางน้ำ:60012'},
    {ProductID: '10087', Project: 'RHYTHM สาทร:10087'},
    {ProductID: '60007', Project: 'RHYTHM เอกมัย:60007'},
    {ProductID: '60029', Project: 'RHYTHM เอกมัย Estate:60029'},
    {ProductID: '10145', Project: 'SOUL รัชดาภิเษก 68:10145'},
    {ProductID: '10142', Project: 'SOUL ลาดพร้าว - เสนา:10142'},
    {ProductID: '60023', Project: 'The Address สยาม-ราชเทวี:60023'},
    {ProductID: '10060', Project: 'The Centro รัตนาธิเบศร์:10060'},
    {ProductID: '10077', Project: 'The Centro วัชรพล:10077'},
    {ProductID: '10174', Project: 'The City นวมินทร์ :10174'},
    {ProductID: '20006', Project: 'The City บางนา กม.7:20006'},
    {ProductID: '10192', Project: 'The City ปิ่นเกล้า - สาย 4:10192'},
    {ProductID: '10216', Project: 'The City ปิ่นเกล้า-บรมฯ:10216'},
    {ProductID: '70033', Project: 'The City พระราม 9 – กรุงเทพกรีฑา:70033'},
    {ProductID: '10185', Project: 'The City พหลโยธิน:10185'},
    {ProductID: '10173', Project: 'The City พัฒนาการ:10173'},
    {ProductID: '40027', Project: 'The City รัชดาฯ - วงศ์สว่าง:40027'},
    {ProductID: '10201', Project: 'The City รัตนาธิเบศร์ – บางใหญ่:10201'},
    {ProductID: '10187', Project: 'The City ราชพฤกษ์:10187'},
    {ProductID: '40031', Project: 'The City ราชพฤกษ์ - ปิ่นเกล้า:40031'},
    {ProductID: '10100', Project: 'The City ราชพฤกษ์-จรัญสนิทวงศ์ 13:10100'},
    {ProductID: '20009', Project: 'The City ราชพฤกษ์-สวนผัก:20009'},
    {ProductID: '10143', Project: 'The City รามอินทรา:10143'},
    {ProductID: '40045', Project: 'The City สะพานมหาเจษฎาบดินทร์ฯ:40045'},
    {ProductID: '10165', Project: 'The City สาทร-ราชพฤกษ์:10165'},
    {ProductID: '10212', Project: 'The City สาทร-สุขสวัสดิ์:10212'},
    {ProductID: '10166', Project: 'The City สุขสวัสดิ์:10166'},
    {ProductID: '70043', Project: 'The City สุขสวัสดิ์ 64:70043'},
    {ProductID: '10164', Project: 'The City สุขุมวิท-บางนา:10164'},
    {ProductID: '70026', Project: 'The City เอกมัย - ลาดพร้าว:70026'},
    {ProductID: '10149', Project: 'The Palazzo จรัญสนิทวงศ์ - ราชพฤกษ์:10149'},
    {ProductID: '10203', Project: 'The Palazzo ศรีนครินทร์:10203'},
    {ProductID: '10091', Project: 'The Pleno พระราม 5-ปิ่นเกล้า:10091'},
    {ProductID: '70012', Project: 'The Pleno รัตนาธิเบศร์-ชัยพฤกษ์:70012'},
    {ProductID: '70036', Project: 'THE SONNE ศรีนครินทร์ – บางนา:70036'},
    {ProductID: '60002', Project: 'Vittorio:60002'},
    {ProductID: '10194', Project: 'บ้านกลางเมือง CLASSE  เอกมัย-รามอินทรา:10194'},
    {ProductID: '10154', Project: 'บ้านกลางเมือง THE EDITION  พระราม 9 – อ่อนนุช :10154'},
    {ProductID: '60024', Project: 'บ้านกลางเมือง The Edition บางนา-วงแหวน:60024'},
    {ProductID: '60026', Project: 'บ้านกลางเมือง The Edition บางนา-วงแหวน (Business District):60026'},
    {ProductID: '40029', Project: 'บ้านกลางเมือง THE EDITION พระราม9 - พัฒนาการ:40029'},
    {ProductID: '20012', Project: 'บ้านกลางเมือง The Edition พระราม9-กรุงเทพกรีฑา:20012'},
    {ProductID: '70037', Project: 'บ้านกลางเมือง THE EDITION สาทร-สุขสวัสดิ์:70037'},
    {ProductID: '40047', Project: 'บ้านกลางเมือง The Edition สุขสวัสดิ์ – พระราม 3:40047'},
    {ProductID: '40041', Project: 'บ้านกลางเมือง The Era ปิ่นเกล้า-จรัญฯ:40041'},
    {ProductID: '10122', Project: 'บ้านกลางเมือง กัลปพฤกษ์:10122'},
    {ProductID: '10128', Project: 'บ้านกลางเมือง เกษตร-นวมินทร์:10128'},
    {ProductID: '10139', Project: 'บ้านกลางเมือง งามวงศ์วาน:10139'},
    {ProductID: '10118', Project: 'บ้านกลางเมือง นวมินทร์ 42:10118'},
    {ProductID: '60027', Project: 'บ้านกลางเมือง บางนา-วงแหวน:60027'},
    {ProductID: '10169', Project: 'บ้านกลางเมือง พระราม 2 :10169'},
    {ProductID: '10137', Project: 'บ้านกลางเมือง พระราม 2-พุทธบูชา:10137'},
    {ProductID: '10123', Project: 'บ้านกลางเมือง พระราม 9:10123'},
    {ProductID: '20017', Project: 'บ้านกลางเมือง พระราม9-กรุงเทพกรีฑา:20017'},
    {ProductID: '60014', Project: 'บ้านกลางเมือง พระราม9-อ่อนนุช:60014'},
    {ProductID: '10171', Project: 'บ้านกลางเมือง พหลโยธิน 50 :10171'},
    {ProductID: '70015', Project: 'บ้านกลางเมือง รัชดา-วงศ์สว่าง:70015'},
    {ProductID: '10136', Project: 'บ้านกลางเมือง รัตนาธิเบศร์:10136'},
    {ProductID: '40037', Project: 'บ้านกลางเมือง ราชพฤกษ์:40037'},
    {ProductID: '70024', Project: 'บ้านกลางเมือง ราชพฤกษ์ – รัตนาธิเบศร์ :70024'},
    {ProductID: '70053', Project: 'บ้านกลางเมือง ราชพฤกษ์_The Walk:70053'},
    {ProductID: '20007', Project: 'บ้านกลางเมือง ราชพฤกษ์-พระราม 5:20007'},
    {ProductID: '20018', Project: 'บ้านกลางเมือง รามอินทรา:20018'},
    {ProductID: '20010', Project: 'บ้านกลางเมือง รามอินทรา-วัชรพล:20010'},
    {ProductID: '10214', Project: 'บ้านกลางเมือง ลาดพร้าว-เสรีไทย :10214'},
    {ProductID: '40034', Project: 'บ้านกลางเมือง วัชรพล:40034'},
    {ProductID: '10159', Project: 'บ้านกลางเมือง วิภาวดี:10159'},
    {ProductID: '10177', Project: 'บ้านกลางเมือง สวนหลวง:10177'},
    {ProductID: '10213', Project: 'บ้านกลางเมือง สาทร-สุขสวัสดิ์ :10213'},
    {ProductID: '10161', Project: 'บ้านกลางเมือง สุขสวัสดิ์:10161'},
    {ProductID: '10153', Project: 'บ้านกลางเมือง สุขุมวิท 77:10153'},
    {ProductID: '10197', Project: 'บ้านกลางเมืองปิ่นเกล้า – จรัญฯ:10197'},
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
