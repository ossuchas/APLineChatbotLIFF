import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LiffappService, CrmProduct, ChatbotMstProjectService, CrmMstProduct } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

declare var liff: any;


export interface User {
  name: string;
}

@Component({
  selector: 'app-ll-byproject',
  templateUrl: './ll-byproject.component.html',
  styleUrls: ['./ll-byproject.component.scss']
})
export class LlByprojectComponent implements OnInit {
  messages: string;
  userProfile: any;
  userId: string;
  selected: string;

  favoriteSeason: string;
  seasons: string[] = ['Year to Date', 'Quarter (Current Quarter)', 'Week (last week and current week)'];

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

  myControl = new FormControl();
  options: User[] = [
    {name: 'Aspire รัตนาธิเบศร์:10059'},
{name: 'The Centro รัตนาธิเบศร์:10060'},
{name: 'The Centro วัชรพล:10077'},
{name: 'RHYTHM สาทร:10087'},
{name: 'The Pleno พระราม 5-ปิ่นเกล้า:10091'},
{name: 'The Pleno สุขสวัสดิ์ 30:10092'},
{name: 'Aspire งามวงศ์วาน:10096'},
{name: 'The City ราชพฤกษ์-จรัญสนิทวงศ์ 13:10100'},
{name: 'บ้านกลางเมือง นวมินทร์ 42:10118'},
{name: 'บ้านกลางเมือง กัลปพฤกษ์:10122'},
{name: 'บ้านกลางเมือง พระราม 9:10123'},
{name: 'บ้านกลางเมือง เกษตร-นวมินทร์:10128'},
{name: 'Aspire ตากสิน (2):10131'},
{name: 'Aspire สาทร-ตากสิน (คอปเปอร์โซน):10132'},
{name: 'Centro รามอินทรา 109:10135'},
{name: 'บ้านกลางเมือง รัตนาธิเบศร์:10136'},
{name: 'บ้านกลางเมือง พระราม 2-พุทธบูชา:10137'},
{name: 'บ้านกลางเมือง งามวงศ์วาน:10139'},
{name: 'Pleno พหลโยธิน - สายไหม:10140'},
{name: 'SOUL ลาดพร้าว - เสนา:10142'},
{name: 'The City รามอินทรา:10143'},
{name: 'SOUL รัชดาภิเษก 68:10145'},
{name: 'The Palazzo จรัญสนิทวงศ์ - ราชพฤกษ์:10149'},
{name: 'Mind ติวานนท์:10150'},
{name: 'Pleno ติวานนท์-แจ้งวัฒนะ:10151'},
{name: 'บ้านกลางเมือง สุขุมวิท 77:10153'},
{name: 'บ้านกลางเมือง THE EDITION พระราม 9 – อ่อนนุช:10154'},
{name: 'Pleno ปิ่นเกล้า-วงแหวน:10156'},
{name: 'บ้านกลางเมือง วิภาวดี:10159'},
{name: 'บ้านกลางเมือง สุขสวัสดิ์:10161'},
{name: 'Mind พระราม 2 - สาทร:10163'},
{name: 'The City สุขุมวิท-บางนา:10164'},
{name: 'The City สาทร-ราชพฤกษ์:10165'},
{name: 'The City สุขสวัสดิ์:10166'},
{name: 'Mind ปิ่นเกล้า-จรัญฯ:10168'},
{name: 'บ้านกลางเมือง พระราม 2:10169'},
{name: 'บ้านกลางเมือง พหลโยธิน 50:10171'},
{name: 'Pleno สุขสวัสดิ์ 66:10172'},
{name: 'The City พัฒนาการ:10173'},
{name: 'The City นวมินทร์:10174'},
{name: 'Pleno ราชพฤกษ์-พระราม 5:10175'},
{name: 'Centro ปิ่นเกล้า - วงแหวน:10176'},
{name: 'บ้านกลางเมือง สวนหลวง:10177'},
{name: 'Grande Pleno รัตนาธิเบศร์:10178'},
{name: 'Pleno สุขสวัสดิ์-พระราม3:10179'},
{name: 'Grande Pleno สุขสวัสดิ์:10180'},
{name: 'District เอกมัย-รามอินทรา:10181'},
{name: 'Centro ศรีนครินทร์-บางนา:10183'},
{name: 'The City พหลโยธิน:10185'},
{name: 'Grande Pleno ท่าน้ำนนท์:10186'},
{name: 'The City ราชพฤกษ์:10187'},
{name: 'Centro สุขสวัสดิ์ - พระราม 3:10190'},
{name: 'Centro Westgate:10191'},
{name: 'The City ปิ่นเกล้า - สาย 4:10192'},
{name: 'Centro ราชพฤกษ์:10193'},
{name: 'บ้านกลางเมือง CLASSE เอกมัย-รามอินทรา:10194'},
{name: 'Pleno พหลโยธิน:10196'},
{name: 'บ้านกลางเมืองปิ่นเกล้า – จรัญฯ:10197'},
{name: 'Pleno สุขสวัสดิ์:10199'},
{name: 'Centro รังสิต:10200'},
{name: 'The City รัตนาธิเบศร์ – บางใหญ่:10201'},
{name: 'The Palazzo ศรีนครินทร์:10203'},
{name: 'Pleno ราชพฤกษ์:10205'},
{name: 'Pleno บางใหญ่:10206'},
{name: 'Centro พระราม9-มอเตอร์เวย์:10207'},
{name: 'Pleno พหลโยธิน - วัชรพล:10208'},
{name: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ:10209'},
{name: 'Centro ชัยพฤกษ์-แจ้งวัฒนะ:10210'},
{name: 'The City สาทร-สุขสวัสดิ์:10212'},
{name: 'บ้านกลางเมือง สาทร-สุขสวัสดิ์:10213'},
{name: 'บ้านกลางเมือง ลาดพร้าว-เสรีไทย:10214'},
{name: 'The City ปิ่นเกล้า-บรมฯ:10216'},
{name: 'The City สาทร-สุขสวัสดิ์ 2:10220'},
{name: 'Pleno เพชรเกษม 112:20005'},
{name: 'The City บางนา กม.7:20006'},
{name: 'บ้านกลางเมือง ราชพฤกษ์-พระราม 5:20007'},
{name: 'Centro รามอินทรา-จตุโชติ:20008'},
{name: 'The City ราชพฤกษ์-สวนผัก:20009'},
{name: 'บ้านกลางเมือง รามอินทรา-วัชรพล:20010'},
{name: 'Pleno รามอินทรา-วงแหวน:20011'},
{name: 'บ้านกลางเมือง The Edition พระราม9-กรุงเทพกรีฑา:20012'},
{name: 'Pleno พระราม 9 – กรุงเทพกรีฑา:20016'},
{name: 'บ้านกลางเมือง พระราม9-กรุงเทพกรีฑา:20017'},
{name: 'บ้านกลางเมือง รามอินทรา:20018'},
{name: 'District เทพารักษ์:20020'},
{name: 'Pleno รังสิต:20021'},
{name: 'อภิทาวน์ นครศรีธรรมราช:20023'},
{name: 'Centro พระราม9-กรุงเทพกรีฑา:20024'},
{name: 'อภิทาวน์ ระยอง:20025'},
{name: 'The City บรมราชชนนี-ทวีวัฒนา:20026'},
{name: 'อภิทาวน์ ขอนแก่น:20027'},
{name: 'เชียงราย:20029'},
{name: 'Pleno รามอินทรา จตุโชติ:20030'},
{name: 'อยุธยา:20031'},
{name: 'Pleno ศรีนครินทร์:40008'},
{name: 'Aspire ลาดพร้าว 113:40011'},
{name: 'District ลาดพร้าว (เฟส1):40013'},
{name: 'Mind พระราม 2 (TH):40016'},
{name: 'Aspire เอราวัณ (ทาวเวอร์ บี):40017'},
{name: 'แอสปาย เอราวัณ ไพร์ม:40018'},
{name: 'Centro พหลฯ-วิภาวดี:40021'},
{name: 'Centro อ่อนนุช -สุวรรณภูมิ:40022'},
{name: 'Centro ราชพฤกษ์-สวนผัก:40023'},
{name: 'Centro บางนา กม.7:40024'},
{name: 'Centro รังสิต คลอง 4-วงแหวน:40025'},
{name: 'Pleno ปิ่นเกล้า – จรัญฯ:40026'},
{name: 'The City รัชดาฯ - วงศ์สว่าง:40027'},
{name: 'Pleno บางนา – อ่อนนุช:40028'},
{name: 'บ้านกลางเมือง THE EDITION พระราม9 - พัฒนาการ:40029'},
{name: 'Centro ชัยพฤกษ์ –แจ้งวัฒนะ 2:40030'},
{name: 'The City ราชพฤกษ์ - ปิ่นเกล้า:40031'},
{name: 'Centro ราชพฤกษ์ -แจ้งวัฒนะ:40032'},
{name: 'Pleno ราชพฤกษ์-รัตนาธิเบศร์:40033'},
{name: 'บ้านกลางเมือง วัชรพล:40034'},
{name: 'Centro บางใหญ่:40035'},
{name: 'GRANDE PLENO สุขสวัสดิ์-พระราม 3:40036'},
{name: 'บ้านกลางเมือง ราชพฤกษ์:40037'},
{name: 'Centro พระราม 2-พุทธบูชา:40039'},
{name: 'Centro ราชพฤกษ์ 2:40040'},
{name: 'บ้านกลางเมือง The Era ปิ่นเกล้า-จรัญฯ:40041'},
{name: 'Pleno รามอินทรา:40042'},
{name: 'Pleno ชัยพฤกษ์:40043'},
{name: 'Centro บางนา – กิ่งแก้ว:40044'},
{name: 'The City สะพานมหาเจษฎาบดินทร์ฯ:40045'},
{name: 'Pleno สุขสวัสดิ์ 70:40046'},
{name: 'บ้านกลางเมือง The Edition สุขสวัสดิ์ – พระราม 3:40047'},
{name: 'Centro สะพานมหาเจษฎาบดินทร์ฯ:40050'},
{name: 'Aspire อโศก-รัชดา:40052'},
{name: 'GRANDE PLENO พหลโยธิน-รังสิต:40054'},
{name: 'Centro สะพานมหาเจษฎาบดินทร์ฯ 2:40055'},
{name: 'Vittorio:60002'},
{name: 'Aspire รัชดา-วงศ์สว่าง:60004'},
{name: 'RHYTHM เอกมัย:60007'},
{name: 'Life อโศก:60008'},
{name: 'Life Ladprao:60010'},
{name: 'Rhythm รางน้ำ:60012'},
{name: 'Life ปิ่นเกล้า:60013'},
{name: 'บ้านกลางเมือง พระราม9-อ่อนนุช:60014'},
{name: 'Life ๑ Wireless:60015'},
{name: 'Life อโศก - พระราม 9:60016'},
{name: 'Life Sukhumvit 62:60018'},
{name: 'Life Ladprao Valley:60019'},
{name: 'Life สาทร เซียร์รา:60020'},
{name: 'ASPIRE Sukhumvit-Onnut:60021'},
{name: 'Life Asoke-Hype:60022'},
{name: 'The Address สยาม-ราชเทวี:60023'},
{name: 'บ้านกลางเมือง The Edition บางนา-วงแหวน:60024'},
{name: 'Aspire สาทร-ราชพฤกษ์:60025'},
{name: 'บ้านกลางเมือง The Edition บางนา-วงแหวน (Business District):60026'},
{name: 'บ้านกลางเมือง บางนา-วงแหวน:60027'},
{name: 'Pleno บางนา – วงแหวน:60028'},
{name: 'RHYTHM เอกมัย Estate:60029'},
{name: 'Rhythm Charoenkrung Pavillion:60031'},
{name: 'Aspire รัตนาธิเบศร์ 2:70002'},
{name: 'The Pleno รัตนาธิเบศร์-ชัยพฤกษ์:70012'},
{name: 'Aspire อุดรธานี:70013'},
{name: 'COO พิษณุโลก:70014'},
{name: 'บ้านกลางเมือง รัชดา-วงศ์สว่าง:70015'},
{name: 'District ลาดพร้าว (เฟส2):70017'},
{name: 'อาคารพาณิชย์ Mind พระราม7:70018'},
{name: 'Pleno สุขุมวิท – บางนา:70019'},
{name: 'Pleno พหลโยธิน รังสิต:70020'},
{name: 'Pleno รังสิต คลอง 4-วงแหวน:70022'},
{name: 'Centro ราชพฤกษ์-สวนผัก2:70023'},
{name: 'บ้านกลางเมือง ราชพฤกษ์ – รัตนาธิเบศร์:70024'},
{name: 'Pleno พหลโยธิน-วัชรพล 2:70025'},
{name: 'The City เอกมัย - ลาดพร้าว:70026'},
{name: 'Pleno ดอนเมือง-สรงประภา:70027'},
{name: 'Pleno ชัยพฤกษ์-แจ้งวัฒนะ 2:70028'},
{name: 'Pleno เวสต์เกต:70029'},
{name: 'Grande Pleno ราชพฤกษ์:70030'},
{name: 'The City พระราม 9 – กรุงเทพกรีฑา:70033'},
{name: 'Grande Pleno วัชรพล-สุขาภิบาล 5:70034'},
{name: 'Pleno ลาดพร้าว-เสรีไทย:70035'},
{name: 'THE SONNE ศรีนครินทร์ – บางนา:70036'},
{name: 'บ้านกลางเมือง THE EDITION สาทร-สุขสวัสดิ์:70037'},
{name: 'Centro วงแหวน - จตุโชติ:70038'},
{name: 'Centro บางนา-วงแหวน:70039'},
{name: 'Pleno อิเกีย-บางนา:70040'},
{name: 'Pleno บางใหญ่ 2:70041'},
{name: 'The Palazzo ปิ่นเกล้า:70042'},
{name: 'The City สุขสวัสดิ์ 64:70043'},
{name: 'Pleno รัตนาธิเบศร์-บางใหญ่:70044'},
{name: 'Pleno สาทร-สุขสวัสดิ์:70045'},
{name: 'Pleno รามอินทรา 109 (ซ.พระยาสุเรนทร์ 11):70046'},
{name: 'Pleno ราชพฤกษ์-แจ้งวัฒนะ:70047'},
{name: 'บ้านกลางเมือง พหลฯ-รามอินทรา:70048'},
{name: 'The City สาทร-กัลปพฤกษ์:70050'},
{name: 'Centro ชัยพฤกษ์-345:70051'},
{name: 'Pleno พระราม9-กรุงเทพกรีฑา2:70052'},
{name: 'บ้านกลางเมือง ราชพฤกษ์-สาทร:70053'},
{name: 'Pleno สุขสวัสดิ์ 30 โครงการ 2:70054'},
{name: 'The City พระราม 2 – พุทธบูชา:70055'},
{name: 'The City รามอินทรา 2:70056'},
{name: 'Centro ประชาอุทิศ 90:70057'},
{name: 'Centro สาทร-กัลปพฤกษ์:70058'},
{name: 'Pleno ศรีนครินทร์ - เทพารักษ์:70059'},
{name: 'Pleno รามอินทรา บางชันสเตชั่น:70060'},
{name: 'Pleno ติวานนท์:70061'},
{name: 'บ้านกลางกรุง สาธุประดิษฐ์ 1:70062'},
{name: 'The City พระราม9-รามคำแหง:70063'},
{name: 'Pleno สุขสวัสดิ์-ประชาอุทิศ:70065'},
{name: 'The City สุขุมวิท-อ่อนนุช:70066'},
{name: 'Grande Pleno รามอินทรา - วงแหวน:70067'},
{name: 'บ้านกลางเมือง รามอินทรา 83 สเตชั่น:70069'},
{name: 'บ้านกลางเมือง ศรีนครินทร์ – อ่อนนุช:70072'},
{name: 'Aspire อุดรธานี:99907'},
  ];
  filteredOptions: Observable<User[]>;

  async ngOnInit() {
    this.messages = '';
    this.selected = '';
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
    console.log(this.favoriteSeason);
    // console.log(this.myControl.value['name']);
    this.selected = this.myControl.value['name'];
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
