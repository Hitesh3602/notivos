import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResultDto } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { UserSubjectService } from 'src/app/_services/user-subject.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', Validators.required]
  });

  loading: boolean = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: UserSubjectService,
  ) { }

  ngOnInit(): void {
    if(!environment.production) {
      this.loginForm.controls.email.setValue("sam@example.com");
      this.loginForm.controls.password.setValue("123");
    }
  }

  onSubmit() {
    this.loading = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.accountService.login(email!, password!)
      .subscribe({
        next: (result) => {
          const loginResult = <LoginResultDto>result;
          this.subjectService.login(loginResult);
          this.accountService.getProfile()
            .subscribe({
              next: () => {
                const url = returnUrl || '/manage-notes';
                this.router.navigate([url]);
              },
              error: () => {
                this.loading = false;
              }
            })
        },
        error: _error => {
          this.loading = false;
        }
      });
  }
}
