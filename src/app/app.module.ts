import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoanComponent } from './components/loan/loan.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddBookDialogComponent } from './components/dialogs/add-book-dialog/add-book-dialog.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card';
import { EditBookDialogComponent } from './components/dialogs/edit-book-dialog/edit-book-dialog.component';
import { BeneficiariesComponent } from './components/beneficiaries/beneficiaries.component';
import { MatSelectModule } from '@angular/material/select';
import { EditBeneficiaryDialogComponent } from './components/dialogs/edit-beneficiary-dialog/edit-beneficiary-dialog.component';
import { AddLoanDialogComponent } from './components/dialogs/add-loan-dialog/add-loan-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { BeneficiariesListComponent } from './components/beneficiaries-list/beneficiaries-list.component';
import { BeneficiariesCreateComponent } from './components/beneficiaries-create/beneficiaries-create.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorsCreateComponent } from './components/authors-create/authors-create.component';
import { EditAuthorDialogComponent } from './components/dialogs/edit-author-dialog/edit-author-dialog.component';
import { EditorialsComponent } from './components/editorials/editorials.component';
import { GenresComponent } from './components/genres/genres.component';
import { EditGenreDialogComponent } from './components/dialogs/edit-genre-dialog/edit-genre-dialog.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { GenreCreateComponent } from './components/genre-create/genre-create.component';
import { EditorialsListComponent } from './components/editorials-list/editorials-list.component';
import { EditorialsCreateComponent } from './components/editorials-create/editorials-create.component';
import { EditEditorialDialogComponent } from './components/dialogs/edit-editorial-dialog/edit-editorial-dialog.component';
import { LoanCreateComponent } from './components/loan-create/loan-create.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { EditLoanDialogComponent } from './components/dialogs/edit-loan-dialog/edit-loan-dialog.component'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddEditorialDialogComponent } from './components/dialogs/add-editorial-dialog/add-editorial-dialog.component';
import { AddAuthorDialogComponent } from './components/dialogs/add-author-dialog/add-author-dialog.component';
import { AddGenreDialogComponent } from './components/dialogs/add-genre-dialog/add-genre-dialog.component';
import { AddBeneficiaryDialogComponent } from './components/dialogs/add-beneficiary-dialog/add-beneficiary-dialog.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { RenewSubscriptionDialogComponent } from './components/dialogs/renew-subscription-dialog/renew-subscription-dialog.component';
import { EditSubscriptionDialogComponent } from './components/dialogs/edit-subscription-dialog/edit-subscription-dialog.component';
import { SubscriptionCreateComponent } from './components/subscription-create/subscription-create.component';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { FormValidators } from './components/shared/form-validators/form-validators';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { AddSubscriptionDialogComponent } from './components/dialogs/add-subscription-dialog/add-subscription-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    UserManagementComponent,
    LoanComponent,
    StatisticsComponent,
    NavigationComponent,
    AddBookDialogComponent,
    EditBookDialogComponent,
    BeneficiariesComponent,
    EditBeneficiaryDialogComponent,
    AddLoanDialogComponent,
    BeneficiariesListComponent,
    BeneficiariesCreateComponent,
    BooksComponent,
    AuthorsComponent,
    AuthorsListComponent,
    AuthorsCreateComponent,
    EditAuthorDialogComponent,
    EditorialsComponent,
    GenresComponent,
    EditGenreDialogComponent,
    GenreListComponent,
    GenreCreateComponent,
    EditorialsListComponent,
    EditorialsCreateComponent,
    EditEditorialDialogComponent,
    LoanCreateComponent,
    LoanListComponent,
    EditLoanDialogComponent,
    AddEditorialDialogComponent,
    AddAuthorDialogComponent,
    AddGenreDialogComponent,
    AddBeneficiaryDialogComponent,
    SubscriptionComponent,
    RenewSubscriptionDialogComponent,
    EditSubscriptionDialogComponent,
    SubscriptionCreateComponent,
    LoginComponent,
    ErrorPageComponent,
    UserListComponent,
    UserCreateComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AddSubscriptionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule  
  ],
  providers: [
    FormValidators,
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
