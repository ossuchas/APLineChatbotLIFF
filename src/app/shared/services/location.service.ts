import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  asTheCrowFlies(lat1: number, long1: number, lat2: number, long2: number) {
    let result = 0;
    const RADIANS = 180 / 3.14159265;
    const METRES_IN_MILE = 1609.34;

    if (lat1 === lat2 && long1 === long2) {
      result = 0;
    } else {
      // Calculating Distance between Points
      const lt1 = lat1 / RADIANS;
      const lg1 = long1 / RADIANS;
      const lt2 = lat2 / RADIANS;
      const lg2 = long2 / RADIANS;

      // radius of earth in miles (3,958.8) * metres in a mile * position on surface of sphere...
      result = (3958.8 * METRES_IN_MILE) * Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(lg2 - lg1));
    }

    return result;
  }
}
