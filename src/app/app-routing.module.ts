import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoanComponent } from './components/loan/loan.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BeneficiariesComponent } from './components/beneficiaries/beneficiaries.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { EditorialsComponent } from './components/editorials/editorials.component';
import { GenresComponent } from './components/genres/genres.component';
import { BeneficiariesCreateComponent } from './components/beneficiaries-create/beneficiaries-create.component';
import { BeneficiariesListComponent } from './components/beneficiaries-list/beneficiaries-list.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanCreateComponent } from './components/loan-create/loan-create.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';

/* const routes: Routes = [
  { path: 'catalog', component: NavigationComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'loan', component: LoanComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
];
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'navigation', component: NavigationComponent, children: [
    { path: 'catalog', component: CatalogComponent },
    { path: 'user-management', component: UserCreateComponent },
    { path: 'user-create', component: UserCreateComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'beneficiaries', component: BeneficiariesComponent },    
    { path: 'beneficiaries-list', component: BeneficiariesListComponent },    
    { path: 'beneficiaries-create', component: BeneficiariesCreateComponent },

    { path: 'loan', component: LoanComponent },
    { path: 'loan-list', component: LoanListComponent },
    { path: 'loan-create', component: LoanCreateComponent },

    { path: 'subscription', component: SubscriptionComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'authors', component: AuthorsComponent },
    { path: 'editorials', component: EditorialsComponent },
    { path: 'genres', component: GenresComponent },

    { path: 'change-password', component: ChangePasswordComponent },
    
    { path: '', redirectTo: '/navigation/catalog', pathMatch: 'full' },
  ]},
  
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
