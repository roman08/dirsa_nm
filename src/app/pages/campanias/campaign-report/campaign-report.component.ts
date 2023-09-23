import { Component, OnInit } from '@angular/core';
import { ChartEvent, ChartType } from 'chart.js';
import { Campania } from 'src/app/models/campania.model';
import { CCPM } from 'src/app/models/ccpm.model';
import { Employees } from 'src/app/models/employees.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { format } from 'date-fns';
import swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.css'],
})
export class CampaignReportComponent implements OnInit {
  idCampaing = 1;

  initDate: string = '';
  endDate: string = '';
  maxEndDate: string = ''; // Esta variable contendrá el último día del mes

  data: any[] = [];
  ccpms: CCPM[] = [];
  mounth!: number;
  hrsSystem: string | undefined;

  // lineChart
  lineChartType: ChartType = 'line';
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];

  lineChartLabels2: Array<any> = [];
  lineChartData2: Array<any> = [];

  lineChartLegend: boolean = true;
  public lineChartOptions: any = {
    responsive: true,
  };

  empleados: any[] = [];
  p: number = 1;

  campaniasAll: Campania[] = [];
  campania!: number;
  empleadosTop: any[] = [];
  peoresEmpleados: any[] = [];

  constructor(
    private _srvCampania: CampaniasService,
    private _srvCampanias: CampaniasService
  ) {}

  ngOnInit(): void {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Formatear la fecha en el formato "YYYY-MM-DD"
    this.endDate = format(fechaActual, 'yyyy-MM-dd');
    this.initDate = this.obtenerPrimerDiaDelMes(this.endDate);

    this._srvCampanias.getCampanias().subscribe((res) => {
      console.log(res);
      this.campaniasAll = res.data;
      this.campania = this.campaniasAll[0].id;
      this.idCampaing = this.campaniasAll[0].id;
      this.filterReport();
    });
  }

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

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  // Método para verificar la fecha seleccionada en el segundo input.
  checkEndDate() {
    if (this.initDate && this.endDate) {
      const startDate = new Date(this.initDate);
      const endDate = new Date(this.endDate);

      // Verificar que ambas fechas estén en el mismo mes y endDate sea mayor o igual a startDate.
      if (
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear() &&
        endDate >= startDate
      ) {
        // La fecha es válida.
        return true;
      } else {
        // La fecha no es válida.
        return false;
      }
    }
    return true; // Si no se han seleccionado fechas, se considera válida.
  }

  calculateLastDayOfMonth() {
    if (this.initDate) {
      const startDate = new Date(this.initDate);
      const lastDayOfMonth = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 2,
        0
      );
      const lastDayOfMonthFormatted = new Date(
        lastDayOfMonth.getFullYear(),
        lastDayOfMonth.getMonth(),
        lastDayOfMonth.getDate()
      );
      console.log(this.initDate);
      console.log(lastDayOfMonth);
      this.maxEndDate = lastDayOfMonthFormatted.toISOString().slice(0, 10);
    }
  }

  filterReport() {
    this._srvCampania
      .getCampaingFilter(this.idCampaing, this.initDate, this.endDate)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.data = res.data.hora_grafica;
          this.ccpms = res.ccpm;

          const hrsSystem = Number(this.data[this.mounth]);

          this.hrsSystem = hrsSystem.toFixed(2);
          console.log(res.data2);
          this.setEmpleados(res.data2);
          // this.empleados = res.data2;

          let horasTotal = [];
          let horasSistema = [];
          let meses = [];

          for (const key in this.data) {
            if (this.data.hasOwnProperty(key)) {
              const mes = this.ccpms.filter((x) => x.id_mes == Number(key))[0];
              horasTotal.push(mes.total_horas);
              horasSistema.push(this.data[key]);
              const nMes = Number(key);
              meses.push(this.obtenerNombreMes(nMes));
            }
          }

          this.lineChartLabels = meses;

          this.lineChartData = [
            { data: horasTotal, label: 'Horas meta' },
            { data: horasSistema, label: 'Horas sistema' },
          ];
          this.reportNomina(res.facturacion, res.nomina_total);
        } else {
          swal.fire('Do It Right', res.message, 'error');
        }
      });
  }

  compareTimeAndInteger(timeString: string, integerHours: number): number {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    const totalTimeInHours = hours + minutes / 60 + seconds / 3600;

    if (totalTimeInHours > integerHours) {
      return 1;
    } else if (totalTimeInHours === integerHours) {
      return 3;
    } else {
      return 2;
    }
  }

  reportNomina(item: any, total: any) {
    const num = parseFloat(total.replace(/,/g, ''));
    // if (item.length > 0) {
    // let mes = item[0];
    this.lineChartLabels2 = ['Total'];
    this.lineChartData2 = [
      { data: [item], label: 'Facturación' },
      { data: [num], label: 'Nómina' },
    ];
    // }
  }

  setEmpleados(item: any) {
    for (const clave in item) {
      if (Object.prototype.hasOwnProperty.call(item, clave)) {
        const elemento = item[clave];
        elemento.empleados[0].horas_sistema = elemento.horas_dia;
        elemento.empleados[0].estatus = this.compareTimeAndInteger(
          elemento.horas_dia,
          elemento.empleados[0].horas_meta
        );
        this.empleados.push(elemento.empleados[0]);
      }
    }

    // Ordenar this.empleados de mayor a menor en función de horas_sistema
    this.empleados.sort((a, b) => {
      // Convierte las horas_sistema a segundos para que puedan compararse
      const timeA = this.timeToSeconds(a.horas_sistema);
      const timeB = this.timeToSeconds(b.horas_sistema);

      // Compara y devuelve el resultado de la comparación
      if (timeA > timeB) {
        return -1; // Retorna -1 para indicar que a va antes que b
      } else if (timeA < timeB) {
        return 1; // Retorna 1 para indicar que b va antes que a
      } else {
        return 0; // Son iguales en términos de horas_sistema
      }
    });

    // Obtener los primeros 10 elementos del arreglo
    this.empleadosTop = this.empleados.slice(0, 10);
    // Obtener los últimos 10 elementos del arreglo
    this.peoresEmpleados = this.empleados.slice(-10);
  }

  // Función para convertir el tiempo en formato HH:mm:ss a segundos
  timeToSeconds(timeString: string): number {
    const parts = timeString.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return hours * 3600 + minutes * 60 + seconds;
  }
  calculateTimeDifference(hoursValue: number, timeValue: string): string {
    // Convertir el valor "HH:MM:SS" a horas
    const timeParts = timeValue.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const timeInHours = hours + minutes / 60 + seconds / 3600;

    // Calcular la diferencia de horas
    const timeDifferenceInHours = hoursValue - timeInHours;

    // Convertir la diferencia de horas a formato "HH:MM:SS"
    const hoursDiff = Math.floor(timeDifferenceInHours);
    const minutesDiff = Math.floor((timeDifferenceInHours - hoursDiff) * 60);
    const secondsDiff = Math.floor(
      (timeDifferenceInHours - hoursDiff - minutesDiff / 60) * 3600
    );

    const formattedTimeDifference = `${this.padZero(hoursDiff)}:${this.padZero(
      minutesDiff
    )}:${this.padZero(secondsDiff)}`;
    return formattedTimeDifference;
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  obtenerPrimerDiaDelMes(fecha: string): string {
    const partesFecha = fecha.split('-');
    const anio = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]);

    // Crear una nueva fecha con el mismo anio y mes, pero con día 1.
    const primerDiaDelMes = new Date(anio, mes - 1, 1);

    // Formatear la fecha en el mismo formato "YYYY-MM-DD".
    const anioStr = primerDiaDelMes.getFullYear().toString();
    const mesStr = (primerDiaDelMes.getMonth() + 1).toString().padStart(2, '0');
    const diaStr = '01';

    return `${anioStr}-${mesStr}-${diaStr}`;
  }

  downloadXls() {
    const worksheet = XLSX.utils.json_to_sheet(this.empleados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    const blob = new Blob(
      [XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Empleados.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
