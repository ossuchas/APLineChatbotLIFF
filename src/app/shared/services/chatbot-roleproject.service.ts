import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRoleProject } from '../models';
import { UserRoleProject2 } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatbotRoleprojectService {

  constructor(private http: HttpClient) {}

  formData: UserRoleProject;

  // Base url
  readonly APIUrl = environment.apiUrl;

  // Http Headers
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

  private _listeners = new Subject<any>();

  getUserRoleProject(userId: string): Observable<UserRoleProject[]> {
      return this.http.get<UserRoleProject[]>(this.APIUrl + '/getroleproj/' + userId);
  }

  getUserRoleProject2(userId: string): Observable<UserRoleProject2[]> {
      return this.http.get<UserRoleProject2[]>(this.APIUrl + '/getroleproj2/' + userId);
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
