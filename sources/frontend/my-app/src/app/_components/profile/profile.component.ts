import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileDto } from 'src/app/_models';
import { AccountService, ToastService } from 'src/app/_services';
import { UserSubjectService } from 'src/app/_services/user-subject.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = this.formBuilder.group({
    'fullName': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]]
  });

  noMessages: Number = 1500;
  loading: boolean = false;

  get roles(): string[] {
    return this.subjectService.userValue?.roles!;
  }

  get username(): string {
    return this.profileForm.get('fullName')?.value!;
  }

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private subjectService: UserSubjectService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile()
      .subscribe({
        next: (result) => {
          var p = <ProfileDto>result;

          this.profileForm.controls.fullName.setValue(p.fullName!);
          this.profileForm.controls.email.setValue(p.email!);
        }
      })
  }

  onSubmit() {
    this.loading = true;

    const fullName = <string>this.profileForm.get('fullName')?.value;
    const email = <string>this.profileForm.get('email')?.value;

    this.accountService.modifyProfile(fullName, email)
      .subscribe({
        next: () => {
          setTimeout(() => this.loading = false, 0);
          this.toastService.success("Profile saved")
        },
        error: () => {
          setTimeout(() => this.loading = false, 0);
        }
      });
  }
}
