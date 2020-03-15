import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApregisterService {

  constructor(private http: HttpClient) {}

  // Base url
  readonly APIUrl = environment.apiiCRM;
  // readonly APIUrl = 'https://70abc66f.ngrok.io/api/v1';

  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      })
  };

  private _listeners = new Subject<any>();

  apregister(_username: string, _password: string, _userid: string): Observable<object> {
      return this.http.post(this.APIUrl + '/userapregister',
        { user_name: _username, password: _password, user_token_id: _userid }, this.httpOptions
      );
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
