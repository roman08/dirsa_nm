import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Month } from 'src/app/models/month.model';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-campania-list-months',
  templateUrl: './campania-list-months.component.html',
  styleUrls: ['./campania-list-months.component.css'],
})
export class CampaniaListMonthsComponent implements OnInit {
  id_campania;

  months: any[] = [];
  constructor(
    private _srvCampania: CampaniasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id_campania = this.route.snapshot.paramMap.get('id');

    this._srvCampania
      .getDataCampaniaMonths(this.id_campania)
      .subscribe((res) => {
        console.log(res.data);
        const months = res.data;

        for (const key in res.data) {
          this.months.push(months[key]);
        }

        console.log(this.months);
      });
  }

  ngOnInit(): void {}

  obtenerLongitud(objeto: any): number {
    return Object.keys(objeto).length;
  }

  showDetaillMonth(item: any) {
    console.log(item);
    this.router.navigateByUrl(`/dashboard/list-days/${item}/${this.id_campania}`);
  }
}
