import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class ClarificationService {
  baseUrl: string = environment.api + 'clarifications/';
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  searchAgents(term: any): Observable<any> {
    const URL = this.baseUrl + `getUser?numero_empleado=${term}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  save(body: {
    metadata: any[];
    file: any;
    observations: any;
    id_user: any;
    campaign_id: number;
    employee_number: number;
    name: string;
    cut_date: any;
  }): Observable<any> {
    const URL = this.baseUrl + `create`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }

  getCatClarificatiosn(): Observable<any> {
    const URL = this.baseUrl + `getCatClarificatiosn`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getAll(): Observable<any> {
    const URL = this.baseUrl + `getAll`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);
    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
}


