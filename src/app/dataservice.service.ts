import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { datamodel } from './datamodel';
import {Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  apiURL='https://localhost:4201/fetchData';
  constructor(private http:HttpClient) { }

  getDataFromURL(params:HttpParams): Observable<any> {
    return this.http.post<datamodel>(this.apiURL,params);
  }
}
