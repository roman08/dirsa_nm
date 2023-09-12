import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from '../pages/pages.component';
import { AccesoGuard } from '../guards/acceso.guard';
import { CourtsListComponent } from './courts-list/courts-list.component';
import { CourtCreateComponent } from './court-create/court-create.component';

const routes: Routes = [
  {
    path: 'courts',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: CourtsListComponent,
        data: { titulo: 'Fechas para corte de nómina' },
        canActivate: [AccesoGuard],
      },
        {
          path: 'court-new',
          component: CourtCreateComponent,
          data: { titulo: 'Fechas para corte de nómina / Crear nueva' },
          canActivate: [AccesoGuard],
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtsRoutingModule {}
