import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Menú',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard/dashboard-admin',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Campañas',
          url: '/dashboard/listado-campanias',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Grupos de agentes',
          url: '/dashboard/listado-grupos',
          roles: [{ name: 'Administrador' }],
        },

        {
          titulo: 'Agentes',
          url: '/dashboard/agents',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Dashboard',
          url: '/dashboard',
          roles: [{ name: 'Lider' }],
        },
        {
          titulo: 'Mi Campaña',
          url: '/dashboard/list-campanias-supervisor',
          roles: [{ name: 'Lider' }],
        },
        {
          titulo: 'Aclaraciones',
          url: '/clarificactions',
          roles: [{ name: 'Administrador' }],
        },
        {
          titulo: 'Fechas para corte de nomina',
          url: '/courts',
          roles: [{ name: 'Administrador' }],
        },
      ],
    },
  ];
  constructor() {}
}
