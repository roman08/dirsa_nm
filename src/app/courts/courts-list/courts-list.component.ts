import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-courts-list',
  templateUrl: './courts-list.component.html',
  styleUrls: ['./courts-list.component.css'],
})
export class CourtsListComponent implements OnInit {
  year = '2023';
  court = '2';
  courts: any[] = [];
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private _srvCourt: CourtService,
    private loadingService: LoadingService,
    private _srvStorage: StorageService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loadingService.show();
    this._srvCourt.getAll().subscribe((res) => {
      this.courts = res.data;
      this.loadingService.hide();
    });
  }
  filtros() {}

  createCourt() {
    this.router.navigateByUrl('/courts/court-new');
  }

  edit(item: any) {
    this._srvStorage.set('court', item);
    this.router.navigateByUrl(`/courts/court-new/${item.id}`);
  }
  delete(item: any) {
    // swa.confi('Do It Right', res.message, 'success');
    swal
      .fire({
        title: 'Do It Right',
        text: "¿Estas seguro de eliminar el registo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._srvCourt.delete(item).subscribe((res) => {
            console.log(res);
            swal.fire('Elimiando!', 'El registro se ha eliminado correctamente', 'success');
            this.getAll();
          });
        }
      });

    console.log(item);
  }
}
