import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarificationService } from 'src/app/services/clarification.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clarifications-new',
  templateUrl: './clarifications-new.component.html',
  styleUrls: ['./clarifications-new.component.css'],
})
export class ClarificationsNewComponent implements OnInit {
  clarificationForm: FormGroup;

  cantidad: number = 0; // Reemplaza 5 con el valor deseado
  datos!: any[]; // Array para almacenar los datos de las filas
  days = '0';
  base64String: any;

  inputText: string = '';
  fruits: string[] = ['Manzana', 'Banana', 'Cereza', 'Damasco', 'Kiwi'];
  filteredFruits: any[] = [];

  name: string = '';
  number_e: number = 0;
  curp: string = '';
  campania: string = '';
  puesto: string = '';
  id_user: number = 0;
  fecha_pago: any;
  catClarificatiosn: any[] = [];

  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private _srvClarification: ClarificationService,
    private router: Router
  ) {
    this.clarificationForm = this.formBuilder.group({
      observations: new FormControl(''),
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.cantidad; i++) {
      this.datos.push({});
    }

    this.getCatClarificatiosn();
  }

  getCatClarificatiosn() {
    this.catClarificatiosn = [];
    this._srvClarification.getCatClarificatiosn().subscribe((res) => {
      this.catClarificatiosn = res.data;
    });
  }
  create(observations: string) {
    const campaing_id = 1;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('metadata', JSON.stringify(this.datos));
    formData.append('observations', observations);
    formData.append('id_user', this.id_user.toString());
    formData.append('campaign_id', campaing_id.toString());
    formData.append('employee_number', this.number_e.toString());
    formData.append('name', this.name);
    formData.append('cut_date', this.fecha_pago);
    this._srvClarification.save(formData).subscribe((res) => {
      if (res.status == 'success') {
        swal.fire('Do It Right', res.message, 'success');
        this.router.navigateByUrl('/clarificactions');
      }else {
        swal.fire("Error", "No se ha podido guardar la información", "error");
      }
    });
  }

  enviarDatosAlServicio(): void {
    const observations = this.clarificationForm.controls['observations'].value;

    if (this.id_user === 0) {
      this.showError('Debes seleccionar un usuario.');
    } else if (this.cantidad === 0) {
      this.showError('Debes seleccionar la cantidad de días.');
    } else if (
      this.datos.some((elemento) => Object.keys(elemento).length === 0)
    ) {
      this.showError('Los días deben contener información.');
    } else if (this.selectedFile == null) {
      this.showError('Debes seleccionar un archivo de evidencia.');
    } else if (observations.length === 0) {
      this.showError('Debes agregar una observación.');
    } else {
      this.create(observations);
    }
  }

  showError(message: string) {
    swal.fire('Do It Right', message, 'error');
  }

  resetDays() {
    console.log(this.cantidad);
    this.datos = [];
    for (let i = 0; i < this.cantidad; i++) {
      this.datos.push({});
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  filterFruits() {
    console.log(this.inputText);
    this.filteredFruits = [];
    this._srvClarification
      .searchAgents(this.inputText)
      .subscribe((respuesta) => {
        if (respuesta.status == 'success') {
          this.filteredFruits = respuesta.data;
        }
      });
  }

  selectFruit(fruit: any) {
    console.log(fruit);
    this.id_user = fruit.id;
    this.name = fruit.nombre_completo;
    this.number_e = fruit.numero_empleado;
    this.curp = fruit.curp;
    this.campania = fruit.id_compania;
    this.puesto = fruit.id_puesto;
    this.fecha_pago = fruit.fecha_pago;

    this.inputText = fruit.nombre_completo;
    this.filteredFruits = [];
  }
}
