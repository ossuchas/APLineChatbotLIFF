import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helpdeskdetail',
  templateUrl: './helpdeskdetail.component.html',
  styleUrls: ['./helpdeskdetail.component.scss']
})
export class HelpdeskdetailComponent implements OnInit {

  id: string;
  detail: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    // this.detail = 'Hello World.. Kai';
    this.detail = 'ดักเพิ่มกรณีที่มีการรับเงินก่อนอนุมัติสัญญาเข้ามาในระบบแล้ว \
    จะไม่สามารถถอยเลขที่สัญญาได้ ขึ้น popup message ให้เหมือนรับเงินก่อนทำสัญญา';
  }

}
