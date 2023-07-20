import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FormComponent } from './components/form/form.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// Import the locale data
import localeEs from '@angular/common/locales/es';

// Register the locale data
registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
