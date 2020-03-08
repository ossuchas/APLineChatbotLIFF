import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobhelpdeskService {
  constructor(private http: HttpClient) {}

  // Base url
  readonly APIUrl = environment.apiiCRM;

  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      })
  };

  private _listeners = new Subject<any>();

  getdetail(jobNo: string): Observable<object> {
      return this.http.get<object>(this.APIUrl + '/helpdeskdetl/' + jobNo);
  }

  // Error handling
  errorHandl(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
      } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

  listen(): Observable<any> {
      return this._listeners.asObservable();
  }

  filter(filterBy: string) {
      this._listeners.next(filterBy);
  }
}
