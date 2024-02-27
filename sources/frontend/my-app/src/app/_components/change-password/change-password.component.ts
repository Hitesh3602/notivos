import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, ToastService } from 'src/app/_services';
import { passwordMatchValidator } from 'src/app/_validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = this.formBuilder.group({
    'old_password': ['', Validators.required],
    'new_password': ['', Validators.required],
    'new_password_confirm': ['', Validators.required],
  }, { validators: passwordMatchValidator('new_password', 'new_password_confirm') }
  );

  viaSecurityToken: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.viaSecurityToken = this.route.snapshot.queryParams['passwordResetToken'] || false;
  }

  get passwordMatchError() {
    return (
      this.changePasswordForm.getError('mismatch') &&
      this.changePasswordForm.get('new_password_confirm')?.touched
    );
  }

  onSubmit() {
    this.loading = true;

    const oldPassword = <string>this.changePasswordForm.get('old_password')?.value;
    const newPassword = <string>this.changePasswordForm.get('new_password')?.value;

    this.accountService.modifyPassword(oldPassword, newPassword)
      .subscribe({
        next: () => {
          setTimeout(() => this.loading = false, 0);
          if (this.viaSecurityToken) {
            this.router.navigate(["/login"]);
          } else {
            this.toastService.success("New password saved");
          }
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }
}
