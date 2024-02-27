import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { LostPasswordComponent } from './_components/lost-password/lost-password.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ChangePasswordComponent } from './_components/change-password/change-password.component';
import { ManageUsersComponent } from './_components/manage-users/manage-users.component';
import { EditUserComponent } from './_components/edit-user/edit-user.component';
import { AddEditCategoryComponent } from './_components/add-edit-category/add-edit-category.component';
import { ManageCategoriesComponent } from './_components/manage-categories/manage-categories.component';
import { ManageNotesComponent } from './_components/manage-notes/manage-notes.component';
import { AddEditNoteComponent } from './_components/add-edit-note/add-edit-note.component';
import { ManageSharedWithMeComponent } from './_components/manage-shared-with-me/manage-shared-with-me.component';
import { BackofficeComponent } from './_layouts/backoffice/backoffice.component';
import { PublicComponent } from './_layouts/public/public.component';
import { ViewNoteComponent } from './_components/home/view-note/view-note.component';
import { EditSharedWithMeComponent } from './_components/edit-shared-with-me/edit-shared-with-me.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'view-note/:id', component: ViewNoteComponent },
    ]
  },
  {
    path: '',
    component: BackofficeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'lost-password', component: LostPasswordComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'manage-notes', component: ManageNotesComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'edit-note/:id', component: AddEditNoteComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'edit-shared-note/:id', component: EditSharedWithMeComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'add-note', component: AddEditNoteComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'manage-shared-other', component: ManageSharedWithMeComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
      { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
      { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
      { path: 'add-user', component: EditUserComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
      { path: 'manage-categories', component: ManageCategoriesComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
      { path: 'edit-category/:id', component: AddEditCategoryComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
      { path: 'add-category', component: AddEditCategoryComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
