import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Router } from '@angular/router';
import { UserSubjectService } from './user-subject.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private restService: RestService,
    private router: Router,
    private subjectService: UserSubjectService
  ) { }

  register(fullName: string, email: string, password: string) {
    return this.restService.register(fullName, email, password);
  }

  login(email: string, password: string) {
    return this.restService.login(email, password);
  }

  logout() {
    this.restService.logout()
      .subscribe(_result => {
        this.subjectService.logout();
        this.router.navigate(["/"]);
      })
  }

  modifyProfile(fullName: string, email: string) {
    return this.restService.modifyProfile(fullName, email);
  }

  modifyPassword(oldPassword: string, newPassword: string) {
    return this.restService.modifyPassword(oldPassword, newPassword);
  }

  getProfile() {
    return this.restService.profile();
  }
}
