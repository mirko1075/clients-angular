import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { FormComponent } from './components/form/form.component';
import { DirectivaComponent } from './components/directiva/directiva.component';

const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clients/add', component: FormComponent },
  { path: 'clients/add/:id', component: FormComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
