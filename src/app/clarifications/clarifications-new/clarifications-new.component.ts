import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClarificationService } from 'src/app/services/clarification.service';

@Component({
  selector: 'app-clarifications-new',
  templateUrl: './clarifications-new.component.html',
  styleUrls: ['./clarifications-new.component.css'],
})
export class ClarificationsNewComponent implements OnInit {
  clarificationForm: FormGroup;

  cantidad: number = 0; // Reemplaza 5 con el valor deseado
  datos: any[] = []; // Array para almacenar los datos de las filas
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
  id_user: any;
  fecha_pago: any;
  catClarificatiosn: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _srvClarification: ClarificationService
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
  create() {}

  enviarDatosAlServicio(): void {
    const body = {
      metadata: this.datos,
      file: this.base64String,
      observations: this.clarificationForm.controls['observations'].value,
      id_user: this.id_user,
      campaign_id: 1, //this.campania
      employee_number: this.number_e,
      name: this.name,
      cut_date: this.fecha_pago,
    };

    console.log(body);
    
    this._srvClarification.save(body).subscribe((res) => {
      console.log(res);
    });
  }

  resetDays() {
    console.log(this.cantidad);
    this.datos = [];
    for (let i = 0; i < this.cantidad; i++) {
      this.datos.push({});
    }
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.convertFileToBase64(selectedFile);
    }
  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.base64String = e.target.result;
      // Aquí puedes usar base64String como necesites
      console.log(this.base64String);
    };

    reader.readAsDataURL(file);
  }

  // downloadFile(): void {

  //   console.log(this.base64String);
//   const url = this.base64String;

  //   // Crear un enlace de descarga y hacer clic en él
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'nombre-de-la-imagen.png'; // Cambia el nombre del archivo según tu necesidad
  //   a.click();
  //   // Crear una URL de objeto para la imagen base64
  
  // }

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
    // this.filteredFruits = this.fruits.filter((fruit) =>
    //   fruit.toLowerCase().includes(this.inputText.toLowerCase())
    // );
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
