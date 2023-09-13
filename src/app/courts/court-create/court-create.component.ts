import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourtService } from 'src/app/services/court.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';

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
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private _srvStorage: StorageService,
    private _srvCourt: CourtService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
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
      id: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.getYears();
    this.getMouthActuality();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // Obtén el valor del parámetro 'id' de la ruta
      if (this.id === undefined || isNaN(this.id)) {
        // El parámetro 'id' no existe o no es un número válido
        console.log('El parámetro "id" no es válido o no existe.');
        // Puedes tomar acciones adicionales aquí, como redireccionar o mostrar un mensaje de error.
      } else {
        // El parámetro 'id' existe y es válido
        // Ahora puedes utilizar el valor 'id' en tu componente.
        let court = JSON.parse(this._srvStorage.get('court'));
        console.log(court);
        this.courtForm;

        this.courtForm.controls['yaer'].setValue(court.yaer);
        this.courtForm.controls['month'].setValue(court.month);
        this.mounth = court.month;
        this.yearActual = court.yaer;
        this.courtForm.controls['pay_day'].setValue(court.pay_day);
        this.courtForm.controls['start_day'].setValue(court.start_day);
        this.courtForm.controls['end_day'].setValue(court.end_day);
        this.courtForm.controls['dispersion_day'].setValue(
          court.dispersion_day
        );
        this.courtForm.controls['court'].setValue(court.court);
      }

    });
  }

  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    this.mounth = mesActual;
  }
  saveCourt() {
    this.loadingService.show();
    console.log(this.id);
    if (this.id === undefined || isNaN(this.id)) {
      console.log('guardar nuevo.');
      this.create(this.courtForm.value);
    } else {
      this.courtForm.controls['id'].setValue(this.id);
      console.log('editar registro');
      this.edit(this.courtForm.value);
    }
  }

  create(body: any) {
    this._srvCourt.create(body).subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        swal.fire('Do It Right', res.message, 'success');
      } else {
        swal.fire('Do It Right', res.message, 'error');
      }
      this.loadingService.hide();
    });
  }

  edit(body: any) {
    this._srvCourt.edit(body).subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        swal.fire('Do It Right', res.message, 'success');
      } else {
        swal.fire('Do It Right', res.message, 'error');
      }
      this.loadingService.hide();
    });
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
