import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class CourtService {
  baseUrl: string = environment.api + 'court/';
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  getAll(): Observable<any> {
    const URL = this.baseUrl + `getAll`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
  create(body: any): Observable<any> {
    const URL = this.baseUrl + `create`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }
}
