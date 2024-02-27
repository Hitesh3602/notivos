import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserSubjectService } from '../_services/user-subject.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private router: Router, 
    private subjectService: UserSubjectService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.subjectService.isAuthenticated()) {
        if(this.subjectService.userValue?.roles?.indexOf(next.data['role']) !== -1) {
          return true;
        }
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
}
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
}
