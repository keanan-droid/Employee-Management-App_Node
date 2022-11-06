import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

    apiUrl = 'http://localhost:3002/api';

    getAllData():Observable<any>{
      return this._http.get(`${this.apiUrl}/getData`);
    }

    signin(data:any):Observable<any>{
      return this._http.post(`${this.apiUrl}/signin`,data)
    }

    create(data:any):Observable<any>{
      return this._http.post(`${this.apiUrl}/signup`,data);
    }

}
