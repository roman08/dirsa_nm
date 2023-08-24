import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.api;
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  getGrafica(
    month: number,
    year: number,
    id_campania: number
  ): Observable<any> {
    const URL =
      this.baseUrl +
      `admin/grafica?month=${month}&year=${year}&id_campania=${id_campania}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getDataDay(
    month: number,
    year: number,
    id_campania: number
  ): Observable<any> {
    const URL =
      this.baseUrl +
      `admin/geDataDays?month=${month}&year=${year}&id_campania=${id_campania}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
}
