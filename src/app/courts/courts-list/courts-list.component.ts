import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';

@Component({
  selector: 'app-courts-list',
  templateUrl: './courts-list.component.html',
  styleUrls: ['./courts-list.component.css'],
})
export class CourtsListComponent implements OnInit {
  year = '2023';
  court = '2';
  courts: any[] = [];

  constructor(private router: Router, private _srvCourt: CourtService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._srvCourt.getAll().subscribe((res) => {
      this.courts = res.data;
    });
  }
  filtros() {}

  createCourt() {
    this.router.navigateByUrl('/courts/court-new');
  }

  delete(item: any){
    console.log(item);
    
  }
}
