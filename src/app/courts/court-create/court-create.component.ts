import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourtService } from 'src/app/services/court.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-court-create',
  templateUrl: './court-create.component.html',
  styleUrls: ['./court-create.component.css'],
})
export class CourtCreateComponent implements OnInit {
  courtForm: FormGroup;
  yearsArray: number[] = [];
  mounth: number = 1;

  meses: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' },
  ];
  yearActual: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private _srvStorage: StorageService,
    private _srvCourt: CourtService
  ) {
    this.courtForm = this.formBuilder.group({
      yaer: new FormControl(''),
      month: new FormControl(''),
      pay_day: new FormControl(''),
      start_day: new FormControl(''),
      end_day: new FormControl(''),
      dispersion_day: new FormControl(''),
      court: new FormControl(''),
      user_id: new FormControl(JSON.parse(this._srvStorage.get('user_id'))),
    });
  }

  ngOnInit(): void {
    this.getYears();
    this.getMouthActuality();
  }

  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    this.mounth = mesActual;
  }
  saveCourt() {
    console.log(this.courtForm.value);
    this._srvCourt.create(this.courtForm.value).subscribe( res => {
      console.log(res);
      
    })
  }

  getYears() {
    // Obtener el año actual
    this.yearActual = new Date().getFullYear();

    // Crear un arreglo de años desde el año actual hasta 4 años en el futuro

    for (let i = 0; i < 5; i++) {
      this.yearsArray.push(this.yearActual + i);
    }

    console.log(this.yearsArray);
  }
}
