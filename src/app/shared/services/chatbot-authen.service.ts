import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotAuthenService {

  constructor(private http: HttpClient) {}

  // Base url
  readonly APIUrl = environment.apiUrl;

  // Http Headers
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      })
  };

  private _listeners = new Subject<any>();

  checkAuthorized(_username: string, _password: string): Observable<object> {
      return this.http.post(this.APIUrl + '/checkauthorized', { username: _username, password: _password }, this.httpOptions)
      // return this.http.get(this.APIUrl + '/checkauthorized', { 'username': _username, 'password': _password});
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
