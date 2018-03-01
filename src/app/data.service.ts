import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Technology } from './technology';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public getPharmacists(): Observable<Technology[]> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.get<Technology[]>('/technologies', options);
  }
}
