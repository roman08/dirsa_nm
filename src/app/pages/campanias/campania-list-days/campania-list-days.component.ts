import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-campania-list-days',
  templateUrl: './campania-list-days.component.html',
  styleUrls: ['./campania-list-days.component.css'],
})
export class CampaniaListDaysComponent implements OnInit {
  id_campania: any;
  mes: any;
  days: any[] = [];
  p: number = 1;
  diasRegistrados: number = 0;
  horasSistema: string = '';
  horasmeta: number = 0;
  diferencia: string = '';
  diasFaltantes: number = 0;
  constructor(
    private route: ActivatedRoute,
    private _srvAdmin: AdminService,
    private _srvStorage: StorageService,
    private router: Router
  ) {
    this.mes = this.route.snapshot.paramMap.get('idMonth');
    this.id_campania = this.route.snapshot.paramMap.get('idCampania');

    this.getDataDays(this.mes, this.id_campania);
  }

  ngOnInit(): void {}

  getDataDays(month: any, idCampania: any) {
    const currentYear = new Date().getFullYear();

    this._srvAdmin
      .getDataDay(month, currentYear, idCampania)
      .subscribe((res) => {
        const days = res.data;
        this.horasSistema = res.horas;
        this.horasmeta = res.horas_tabajar;
        for (const key in res.data) {
          console.log(key);
          this.days.push(days[key]);
          this.diasRegistrados++;
        }

        this.diasFaltantes = this.obtenerDiasFaltantes(
          month,
          this.diasRegistrados
        );
        this.diferencia = this.calculateTimeDifference(
          this.horasmeta,
          this.horasSistema
        );
      });
  }

  showEmployees(item: any) {
    console.log(item);

    this._srvStorage.set('empleados', item);
    this.router.navigateByUrl('/dashboard/list-employees');
  }

  loadFile() {
    this._srvStorage.set('id_type_origin', 0);
    this.router.navigateByUrl('/dashboard/load-file');
  }

  obtenerDiasFaltantes(mes: number, dias: number) {
    // Obtén el mes y año actual
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();

    // Obtén el último día del mes especificado
    const ultimoDiaDelMes = new Date(añoActual, mes + 1, 0).getDate();

    // Calcula cuántos días han transcurrido en el mes
    let diasTranscurridos;

    if (mes !== mesActual) {
      diasTranscurridos = ultimoDiaDelMes; // Contar todos los días del mes
    } else {
      diasTranscurridos = fechaActual.getDate(); // Hasta el día actual
    }

    // Resta los días de tu variable a los días transcurridos
    return diasTranscurridos - dias;
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

  downloadXls() {
    const worksheet = XLSX.utils.json_to_sheet(this.days);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    const blob = new Blob(
      [XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );

    const nameMonth = this.obtenerNombreMes(this.mes);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reporte del mes de ${nameMonth}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
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
}
