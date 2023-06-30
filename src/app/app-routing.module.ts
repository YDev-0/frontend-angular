import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersDetailsComponent } from './customers-details/customers-details.component';
import { AccountsDetailsComponent } from './accounts-details/accounts-details.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/details/:id', component: CustomersDetailsComponent },
  { path: 'customers/add', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/details/:id', component: AccountsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
