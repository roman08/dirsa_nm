import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartEvent, ChartType } from 'chart.js';
import { Campania } from 'src/app/models/campania.model';
import { HoursAdmin } from 'src/app/models/hoursAdmin.model';
import { AdminService } from 'src/app/services/admin.service';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  campanias: HoursAdmin[] = [];
  mounth!: number;

  // TODO : DATOS GRAFICA
  // lineChart
  lineChartType: ChartType = 'line';
  lineChartData: Array<any> = [];

  lineChartLabels: Array<any> = [];

  lineChartLegend: boolean = true;

  public lineChartOptions: any = {
    responsive: true,
  };
  yearArray: number[] = [];
  year = new Date().getFullYear();
  campaniasAll: Campania[] = [];
  campania!: number;

  totalhoras!: string;
  totalNomina: number = 0;
  agente_atorizados: number = 0;
  totalSumado: number = 0;
  days: any[] = [];
  constructor(
    private _srvCampanias: CampaniasService,
    private _srvAdmin: AdminService,
    private router: Router,
    private _srvStorage: StorageService
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
      this.yearArray.push(currentYear - i);
    }
    const mountActuality = this.getMouthActuality();
    this.getHours(mountActuality);

    this._srvCampanias.getCampanias().subscribe((res) => {
      console.log(res);
      this.campaniasAll = res.data;
      this.campania = this.campaniasAll[0].id;
      this.getDataGrafica(mountActuality, currentYear, this.campania);
    });
  }

  getDataGrafica(month: number, year: number, id_campania: number) {
    this._srvAdmin.getGrafica(month, year, id_campania).subscribe((res) => {
      const days = res.data;
      this.totalhoras = res.horas;
      this.totalNomina = res.nomina_total;
      this.agente_atorizados = res.agente_atorizados;
      this.totalSumado = res.totalSumado;
      const daysArry = [];
      this.lineChartLabels = []; //dias

      const nomina_dia: any[] = []; //montos

      for (const key in res.data) {
        console.log(days);

        daysArry.push('Dia: ' + key + '/ Agentes:' + days[key].empleadosDia);
        this.days.push(days[key]);
        nomina_dia.push(
          parseFloat(days[key].nomina_dia.replace(/,/g, '') + '/')
        );
      }
      this.lineChartLabels = daysArry;
      const nameMonth = this.obtenerNombreMes(month);
      this.lineChartData = [
        { data: nomina_dia, label: 'Nomina diaria del mes de ' + nameMonth },
      ];
    });
  }

  getHours(mounth: number) {
    this._srvCampanias.getCampaniasAdmin(mounth).subscribe((res) => {
      this.campanias = [];
      this.campanias = res.data;
    });
  }

  searhcHours() {
    this.getHours(this.mounth);
  }
  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // devuelve un número entre 0 y 11
    this.mounth = mesActual;
    return mesActual;
  }

  // events
  public chartClicked(event: any): void {
    const chartElement = event.active[0];
    const datasetIndex = chartElement.datasetIndex;
    const dataIndex = chartElement.index;

    console.log(this.days[dataIndex]);
    this._srvStorage.set('empleados', this.days[dataIndex].empleados);
    this.router.navigateByUrl('/dashboard/list-employees');
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  obtenerNombreMes(numeroMes: number) {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const fecha = new Date();
    fecha.setMonth(numeroMes - 1); // establece el mes en base al número, restando 1 para ajustar el índice
    return meses[fecha.getMonth()];
  }
}
