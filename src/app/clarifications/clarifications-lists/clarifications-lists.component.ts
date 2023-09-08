import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarificationService } from 'src/app/services/clarification.service';

@Component({
  selector: 'app-clarifications-lists',
  templateUrl: './clarifications-lists.component.html',
  styleUrls: ['./clarifications-lists.component.css'],
})
export class ClarificationsListsComponent implements OnInit {
  clarifications: any[] = [];
  constructor(
    private router: Router,
    private _srvClarification: ClarificationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._srvClarification.getAll().subscribe((res) => {
      this.clarifications = res.data;
    });
  }
  downloadXls() {}

  createClarification() {
    this.router.navigateByUrl('/clarificactions/clarification-new');
  }
  donwloadFile( item: any){
    
    console.log(item.file);
    
    
     const byteCharacters = atob(item.file);
     const byteNumbers = new Array(byteCharacters.length);
     for (let i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
     }
     const byteArray = new Uint8Array(byteNumbers);
     const blob = new Blob([byteArray], { type: 'application/octet-stream' });

     // Crear una URL del blob y abrir una nueva ventana o pestaña
     const blobUrl = window.URL.createObjectURL(blob);
     window.open(blobUrl, '_blank');
  }
}
