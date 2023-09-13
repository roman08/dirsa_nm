import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CourtsListComponent } from './courts-list/courts-list.component';
import { CourtCreateComponent } from './court-create/court-create.component';



@NgModule({
  declarations: [CourtsListComponent, CourtCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class CourtsModule {}
