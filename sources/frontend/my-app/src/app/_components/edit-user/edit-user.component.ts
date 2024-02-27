import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';
import { passwordMatchValidator } from 'src/app/_validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  isAddMode: boolean = false;
  id: string | undefined;
  loading = false;

  editForm = this.formBuilder.group({
    'fullName': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'locked': false,
    'password': ['', [this.isAddMode ? Validators.required : Validators.nullValidator]],
    'password_confirm': ['', [this.isAddMode ? Validators.required : Validators.nullValidator]],
    'role_0': { value: false, disabled: false },
    'role_1': { value: true, disabled: true }
  }, { validators: passwordMatchValidator('password', 'password_confirm') });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }

  get passwordMatchError() {
    return (
      this.editForm.getError('mismatch') &&
      this.editForm.get('password_confirm')?.touched
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.userService.getUser(this.route.snapshot.paramMap.get('id')!, result => {
        var p = <UserDto>result;

        this.editForm.controls.fullName.setValue(p.fullName!);
        this.editForm.controls.email.setValue(p.email!);
        this.editForm.controls.locked.setValue(p.locked!);
        this.editForm.controls.role_0.setValue(p.roles?.includes('ADMIN')!);
        this.editForm.controls.role_1.setValue(p.roles?.includes('USER')!);
      });
    } else {
      if(!environment.production) {
        this.editForm.controls.fullName.setValue('John Doe');
        this.editForm.controls.email.setValue('john@doe.org');
      }
      this.editForm.controls.locked.setValue(false);
      this.editForm.controls.role_0.setValue(false);
      this.editForm.controls.role_1.setValue(true);
    }
  }

  onSubmit() {
    this.loading = true;

    const fullName = this.editForm.get('fullName')?.value;
    const email = this.editForm.get('email')?.value;
    const password = this.editForm.get('password')?.value;
    const locked = this.editForm.get('locked')?.value;

    let roles: string[] = [];
    if (this.editForm.get('role_0')?.value) roles.push('ADMIN');
    if (this.editForm.get('role_1')?.value) roles.push('USER');

    if (this.isAddMode) {
      this.userService.createUser(fullName!, email!, locked!, password!, roles)
        .subscribe({
          next: () => {
            this.toastService.success(`User ${fullName} created`);
            this.router.navigate(['/manage-users']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    } else {
      this.userService.modifyUser(this.id!, fullName!, email!, locked!, roles)
        .subscribe({
          next: () => {
            this.toastService.success(`User ${fullName} updated`);
            this.router.navigate(['/manage-users']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    }
  }
}
