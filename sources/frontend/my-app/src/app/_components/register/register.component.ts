import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, ToastService } from 'src/app/_services';
import { passwordMatchValidator } from 'src/app/_validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordFieldTextType: boolean = false;
  passwordConfirmFieldTextType: boolean = false;

  registerForm = this.formBuilder.group({
    'fullName': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', Validators.required],
    'password_confirm': ['', Validators.required],
  }, { validators: passwordMatchValidator('password', 'password_confirm') });

  loading: boolean = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
  ) { }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('password_confirm')?.touched
    );
  }

  ngOnInit() {
    if(!environment.production) {
      this.registerForm.controls.fullName.setValue("Sam Spade");
      this.registerForm.controls.email.setValue("sam@example.com");
      this.registerForm.controls.password.setValue("123");
      this.registerForm.controls.password_confirm.setValue("123");
    }
  }

  onSubmit() {
    this.loading = true;

    const fullName = <string>this.registerForm.get('fullName')?.value;
    const email = <string>this.registerForm.get('email')?.value;
    const password = <string>this.registerForm.get('password')?.value;

    this.accountService.register(fullName, email, password)
      .subscribe({
        next: _result => {
          setTimeout(() => this.loading = false, 0);
          this.toastService.info('Account created');
          this.router.navigate(["/"]);
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }
}
