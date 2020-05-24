import { Component, OnInit } from '@angular/core';
import { LocationService, LiffappService } from '../shared';

declare var liff: any;

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.scss']
})
export class TimestampComponent implements OnInit {

  messages: string;
  lat: number;
  long: number;

  constructor(
      private liffService: LiffappService,
      private locationServices: LocationService
  ) { }

  async ngOnInit() {
    this.messages = '';

    this.locationServices.getPosition().then(pos => {
      this.lat = pos.lat;
      this.long = pos.lng;
      console.log(`Positon: ${pos.lng} ${pos.lat}`);

      //13.808463, 100.557649

      const x = this.locationServices.asTheCrowFlies(this.lat, this.long, 13.8080045,100.5591728);
      console.log('distance = ' + x);

    }, err => {
      console.log('Error: ' + err.message);
    });


    await this.initLineLiff();

  }

  async initLineLiff() {
    try {
      const data: any = await this.liffService.initLineLiff();
    } catch (err) {
      console.log(err);
    }
  }

  async sendMessagesIn() {
    this.locationServices.getPosition().then(pos => {
      this.lat = pos.lat;
      this.long = pos.lng;
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    }, err => {
      console.log('Error: ' + err.message);
    });

    this.messages = 'In: ' + this.lat + ',' + this.long;
    console.log(this.messages);

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

  async sendMessagesOut() {
    this.locationServices.getPosition().then(pos => {
      this.lat = pos.lat;
      this.long = pos.lng;
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    }, err => {
      console.log('Error: ' + err.message);
    });

    this.messages = 'Out: ' + this.lat + ',' + this.long;
    console.log(this.messages);

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
