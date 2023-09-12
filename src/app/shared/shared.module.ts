import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MesPipe } from '../pipes/mes.pipe';



@NgModule({
  declarations: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, MesPipe],
  exports: [BreadcrumbsComponent, SidebarComponent, HeaderComponent, MesPipe],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
