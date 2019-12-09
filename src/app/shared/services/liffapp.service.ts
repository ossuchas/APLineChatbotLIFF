import { Injectable } from '@angular/core';

declare var liff: any;

@Injectable({
  providedIn: 'root'
})
export class LiffappService {

  constructor() { }

  initLineLiff() {
    return new Promise((resolve, reject) => {
      liff.init(
        data => {
          resolve(liff.getProfile());
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getLineProfile() {
    return new Promise((resolve, reject) => {
      liff.getProfile(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
