import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobhelpdeskService } from '../shared';

@Component({
  selector: 'app-helpdeskdetail',
  templateUrl: './helpdeskdetail.component.html',
  styleUrls: ['./helpdeskdetail.component.scss']
})
export class HelpdeskdetailComponent implements OnInit {

  id: string;
  detail: string;
  constructor(
    private route: ActivatedRoute,
    public serviceJobHelpdesk: JobhelpdeskService
  ) { }

  ngOnInit() {
    // this.id = this.route.snapshot.queryParamMap.get('id');
    // console.log(this.id);
    const queryString = decodeURIComponent(decodeURIComponent(window.location.search).replace('?liff.state=', ''));
    console.log(queryString);

    const params = new URLSearchParams(queryString);
    this.id = params.get('id');

    if (this.id != null && this.id !== '') {
      console.log(this.id);
    } else {
      console.log('Not found id');
    }

    this.serviceJobHelpdesk.getdetail(this.id).subscribe(data => {
      console.log(data);
      this.detail = data['requestnote'.toString()];
    });

    // console.log(queryString);
    // this.detail = 'Hello World.. Kai';
    // this.detail = 'ดักเพิ่มกรณีที่มีการรับเงินก่อนอนุมัติสัญญาเข้ามาในระบบแล้ว \
    // จะไม่สามารถถอยเลขที่สัญญาได้ ขึ้น popup message ให้เหมือนรับเงินก่อนทำสัญญา';
  }

}
