import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// MODULOS
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarificationsModule } from './clarifications/clarifications.module';
import { CourtsModule } from './courts/courts.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ClarificationsModule,
    CourtsModule,
    RouterModule.forRoot([]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
