import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Location } from '@angular/common';
import { Employees } from 'src/app/models/employees.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  empleados: Employees[] = [];
  p: number = 1;
  horasSistema!: string;
  horasMetaTotal: number = 0;
  totalNomina: number = 0;
  diferenciaHoras: any;
  constructor(
    private _srvStorage: StorageService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const empleados = JSON.parse(this._srvStorage.get('empleados'));
    // console.log(this.empleados);

    let horas = [];
    for (let i of empleados) {
      const employee = new Employees();
      employee.costo_nomina = i.costo_nomina;
      employee.horas_meta = i.horas_meta;
      employee.horas_sistema = i.horas_sistema;
      employee.nombre = i.nombre;
      employee.numero_empleado = i.numero_empleado;
      employee.estatus = this.compareTimeAndInteger(
        i.horas_sistema,
        i.horas_meta
      );
      console.log(i.costo_nomina);

      this.totalNomina = this.totalNomina + Number(i.costo_nomina);
      this.horasMetaTotal = this.horasMetaTotal + i.horas_meta;
      horas.push(i.horas_sistema);

      this.empleados.push(employee);
      //
    }

    this.horasSistema = this.sumTimeRecords(horas);
    this.diferenciaHoras = this.calculateTimeDifference(
      this.horasMetaTotal,
      this.horasSistema
    );

    // this.calculateTimeDifference(this.horasMetaTotal, this.horasSistema);
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

  sumTimeRecords(timeRecords: string[]): string {
    const totalSeconds = timeRecords.reduce((total, time) => {
      const timeParts = time.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
      return total + hours * 3600 + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${this.padZero(hours)}:${this.padZero(
      minutes
    )}:${this.padZero(seconds)}`;
    return formattedTime;
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  backClicked() {
    this._location.back();
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
