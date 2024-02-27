import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, delay, of } from 'rxjs';
import { LoginResultDto } from '../_models';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { Buffer } from "buffer"

@Injectable({
  providedIn: 'root'
})
export class UserSubjectService {
  tokenSubscription = new Subscription();

  public userSubject: BehaviorSubject<LoginResultDto | null>;
  public user: Observable<LoginResultDto | null>;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {

    const json = localStorage.getItem('user');
    if (json) {
      try {
        const user = JSON.parse(json);
        const decodedToken = this.decodingJWT(user.token);
        if (decodedToken) {
          const expiresIn = decodedToken.exp * 1000 - new Date().valueOf();
          if (expiresIn > 0) {
            this.userSubject = new BehaviorSubject(user);
            this.user = this.userSubject.asObservable();
            this.expirationCounter(expiresIn - 5_000); /* set timer 5 seconds shorter */
            return;
          }
        }
      } catch (e) { }
    }

    this.userSubject = new BehaviorSubject(<LoginResultDto | null>null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.userValue !== null;
  }

  decodingJWT(token: string | undefined) {
    if (token) {
      const base64String = token.split('.')[1];
      const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('utf8'));
      return decodedValue;
    }
    return null;
  }

  expirationCounter(timeout: number) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      this.logout();
      this.router.navigate(["/login"]);
      this.toastService.warning('Sorry, your token expired');
    });
  }

  login(loginResult: LoginResultDto) {
    this.userSubject.next(loginResult);
    localStorage.setItem('user', JSON.stringify(loginResult));
    const decodedToken = this.decodingJWT(loginResult.token);
    if (decodedToken) {
      const expiresIn = decodedToken.exp * 1000 - new Date().valueOf();
      this.expirationCounter(expiresIn - 5_000); /* set timer 5 seconds shorter */
    }
  }

  logout() {
    this.tokenSubscription.unsubscribe();
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
