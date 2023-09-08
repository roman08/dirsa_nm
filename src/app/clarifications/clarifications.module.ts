import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarificationsListsComponent } from './clarifications-lists/clarifications-lists.component';
import { ClarificationsNewComponent } from './clarifications-new/clarifications-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ClarificationsListsComponent, ClarificationsNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class ClarificationsModule {}
