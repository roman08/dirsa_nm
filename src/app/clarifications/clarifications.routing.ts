import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from '../pages/pages.component';
import { AccesoGuard } from '../guards/acceso.guard';
import { ClarificationsListsComponent } from './clarifications-lists/clarifications-lists.component';
import { ClarificationsNewComponent } from './clarifications-new/clarifications-new.component';

const routes: Routes = [
  {
    path: 'clarificactions',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: ClarificationsListsComponent,
        data: { titulo: 'Aclaraciones' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'clarification-new',
        component: ClarificationsNewComponent,
        data: { titulo: 'Crear aclaración' },
        canActivate: [AccesoGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClarificationsRoutingModule {}
