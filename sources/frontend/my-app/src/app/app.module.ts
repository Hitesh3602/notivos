import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { Error404Component } from './_components/error404/error404.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LostPasswordComponent } from './_components/lost-password/lost-password.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './_components/profile/profile.component';
import { ChangePasswordComponent } from './_components/change-password/change-password.component';
import { ManageUsersComponent } from './_components/manage-users/manage-users.component';
import { EditUserComponent } from './_components/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XPasswordComponent } from './_ui/x-password/x-password.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppDialogService } from './_services/dialog.service';
import { AddEditCategoryComponent } from './_components/add-edit-category/add-edit-category.component';
import { ManageCategoriesComponent } from './_components/manage-categories/manage-categories.component';
import { XPageTitleComponent } from './_ui/x-page-title/x-page-title.component';
import { ManageNotesComponent } from './_components/manage-notes/manage-notes.component';
import { PRIMENG_MODULES } from './primeng-modules';
import { AddEditNoteComponent } from './_components/add-edit-note/add-edit-note.component';
import { PageableComponent } from './_components/pageable/pageable.component';
import { XTableHeaderComponent } from './_ui/x-table-header/x-table-header.component';
import { ManageSharedWithMeComponent } from './_components/manage-shared-with-me/manage-shared-with-me.component';
import { XNoteTabComponent } from './_ui/x-note-tab/x-note-tab.component';
import { XAccessComponent } from './_ui/x-access/x-access.component';
import { XStateComponent } from './_ui/x-state/x-state.component';
import { BackofficeComponent } from './_layouts/backoffice/backoffice.component';
import { FromNowPipe } from './_pipes/moment.pipe';
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { SharedUsersDialogComponent } from './_components/manage-notes/shared-users-dialog/shared-users-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PublicComponent } from './_layouts/public/public.component';
import { ViewNoteComponent } from './_components/home/view-note/view-note.component';
import { EditSharedWithMeComponent } from './_components/edit-shared-with-me/edit-shared-with-me.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LostPasswordComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ManageUsersComponent,
    EditUserComponent,
    XPasswordComponent,
    AddEditCategoryComponent,
    ManageCategoriesComponent,
    XPageTitleComponent,
    ManageNotesComponent,
    AddEditNoteComponent,
    PageableComponent,
    XTableHeaderComponent,
    ManageSharedWithMeComponent,
    XNoteTabComponent,
    XAccessComponent,
    XStateComponent,
    BackofficeComponent,
    FromNowPipe,
    SafeHtmlPipe,
    SharedUsersDialogComponent,
    PublicComponent,
    ViewNoteComponent,
    EditSharedWithMeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PRIMENG_MODULES,
    NgbModule,
    NgbModule,
    NgbToast,
  ],
  providers: [
    MessageService,
    AppDialogService,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
