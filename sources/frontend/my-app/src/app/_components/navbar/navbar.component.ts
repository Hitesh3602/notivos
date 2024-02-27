import { Component } from '@angular/core';
import { LoginResultDto } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { UserSubjectService } from 'src/app/_services/user-subject.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private subjectService: UserSubjectService,
    private accountService: AccountService
  ) { }

  get user(): LoginResultDto {
    return this.subjectService.userValue!;
  }

  isNotAuthenticated(): boolean {
    return !this.subjectService.isAuthenticated();
  }

  logout() {
    this.accountService.logout();
  }
}
