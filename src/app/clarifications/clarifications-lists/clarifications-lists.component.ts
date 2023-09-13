import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campania } from 'src/app/models/campania.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { ClarificationService } from 'src/app/services/clarification.service';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clarifications-lists',
  templateUrl: './clarifications-lists.component.html',
  styleUrls: ['./clarifications-lists.component.css'],
})
export class ClarificationsListsComponent implements OnInit {
  clarifications: any[] = [];
  campaing: number = 0;
  fechaInicio!: any;
  fechaFin!: any;
  campanias: Campania[] = [];

  constructor(
    private router: Router,
    private _srvClarification: ClarificationService,
    private _srvCampanias: CampaniasService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllCampanias();
  }

  getAll() {
    this._srvClarification.getAll().subscribe((res) => {
      this.clarifications = res.data;
    });
  }

  createClarification() {
    this.router.navigateByUrl('/clarificactions/clarification-new');
  }

  donwloadFile(item: any) {
    const url = `${environment.api}clarifications/donwloadFile?id=${item.id}`;

    const a = document.createElement('a');
    a.href = url;
    a.click();
  }

  downloadXls() {
    const worksheet = XLSX.utils.json_to_sheet(this.clarifications);
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
    link.download = 'Reporte_aclaraciones.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  filtros() {
    const body = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      campaign_id: this.campaing,
    };
    this._srvClarification.filtros(body).subscribe((res) => {
      this.clarifications = [];
      this.clarifications = res.data;
    });
  }

  getAllCampanias() {
    this.campanias = [];
    this._srvCampanias.getCampanias().subscribe((res) => {
      this.campanias = res.data;
    });
  }
}
