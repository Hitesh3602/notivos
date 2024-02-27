import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { PageableDto } from '../_models';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { UserSubjectService } from './user-subject.service';
import { environment } from 'src/environments/environment';

const BASE_URL = `${environment.RESTAPI_BASE_URL}`;

export interface FnRestCallback {
  (response: any): void
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private subjectService: UserSubjectService
  ) { }

  handleErrors = (error: any) => {
    var errorResponse = <HttpErrorResponse>error;
    let errorMessage: string;
    let errorHeader: string = 'Error';
    if (error.status === 0) {
      errorMessage = 'Sorry, this service is not available';
    }
    else if (error.error) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `${error.error.message}`;
      } else {
        const { message, details } = error.error;
        if (details) {
          errorMessage = `${details.join('\n')}`
          errorHeader = message;
        } else {
          errorMessage = `${error.error.message}`;
        }
      }
    } else {
      switch (errorResponse.status) {
        case 404: errorMessage = 'Not found'; break;
        case 406: errorMessage = 'Not Acceptable'; break;
        default: errorMessage = `Something is wrong response:${errorResponse}`; break;
      }
    }
    this.toastService.error(errorMessage, {
      headertext: errorHeader
    });
    if (errorResponse.status === 401) {
      this.subjectService.logout();
      this.router.navigate(["/login"]);
    }
    return throwError(() => errorMessage);
  }

  register(fullName: string, email: string, password: string): Observable<Object> {
    return this.http.post<any>(`${BASE_URL}/account.register`, {
      "fullName": fullName,
      "email": email,
      "password": password,
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${BASE_URL}/account.login`, {
      "email": email,
      "password": password
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  logout() {
    return this.http.post<any>(`${BASE_URL}/account.logout`, {}, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  profile() {
    return this.http.get<any>(`${BASE_URL}/account.profile`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyProfile(fullName: string, email: string) {
    return this.http.put<any>(`${BASE_URL}/account.profile`, {
      "fullName": fullName,
      "email": email
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyPassword(oldPassword: string, newPassword: string) {
    return this.http.post<any>(`${BASE_URL}/account.modifyPassword`, {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  // Users
  listUsers(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/users.list?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  listUsersDetailed(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/users.list/detailed?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  searchUsers(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/users.search?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getUser(id: string) {
    return this.http.get<any>(`${BASE_URL}/users.get/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyUser(id: string, fullName: string, email: string, locked: boolean, roles: string[]) {
    return this.http.put<any>(`${BASE_URL}/users.modify/${id}`, {
      "fullName": fullName,
      "email": email,
      "locked": locked,
      "roles": roles
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  deleteUser(id: Number) {
    return this.http.delete<any>(`${BASE_URL}/users.delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  createUser(fullName: string, email: string, locked: boolean, password: string, roles: string[]) {
    return this.http.post<any>(`${BASE_URL}/users.create`, {
      "fullName": fullName,
      "email": email,
      "locked": locked,
      "password": password,
      "roles": roles
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  // Categories
  listCategories(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/categories.list?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  searchCategories(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/categories.search?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getCategory(id: string) {
    return this.http.get<any>(`${BASE_URL}/categories.get/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyCategory(id: string, name: string) {
    return this.http.put<any>(`${BASE_URL}/categories.modify/${id}`, {
      "name": name
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  deleteCategory(id: Number) {
    return this.http.delete<any>(`${BASE_URL}/categories.delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  createCategory(name: string) {
    return this.http.post<any>(`${BASE_URL}/categories.create`, {
      "name": name
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  // Notes
  listNotes(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/notes.list?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  searchNotes(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/notes.search?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getNote(id: number) {
    return this.http.get<any>(`${BASE_URL}/notes.get/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyNote(id: number, caption: string, body: string, state: string, category: string) {
    return this.http.put<any>(`${BASE_URL}/notes.modify/${id}`, {
      "caption": caption,
      "body": body,
      "state": state,
      "category": category
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  deleteNote(id: number) {
    return this.http.delete<any>(`${BASE_URL}/notes.delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  createNote(caption: string, body: string, state: string, category: string) {
    return this.http.post<any>(`${BASE_URL}/notes.create`, {
      "caption": caption,
      "body": body,
      "state": state,
      "category": category
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  // Share
  listShares(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/shared/notes.list?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getShare(id: number) {
    return this.http.get<any>(`${BASE_URL}/shared/notes.get/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifySharedNote(id: number, body: string) {
    return this.http.put<any>(`${BASE_URL}/shared/notes.modify/${id}`, {
      "body": body,
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  searchShared(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/shared/notes.search?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  listSharedByMe(pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/shared.list?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getSharedUsers(id: number, pageable: PageableDto) {
    return this.http.get<any>(`${BASE_URL}/shared.users/${id}?${pageable.toApiParams()}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  createShare(id: number, email: string, access: string) {
    return this.http.post<any>(`${BASE_URL}/shared.create/${id}`, {
      "userEmail": email,
      "access": access,
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  modifyShareAccess(id: number, access: string) {
    return this.http.put<any>(`${BASE_URL}/shared.modifyAccess/${id}`, {
      "access": access,
    }, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  deleteShare(id: number) {
    return this.http.delete<any>(`${BASE_URL}/shared.delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      }
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  // public
  loadPublicNotes(pageable: PageableDto) {
    let headers = {};
    if (this.subjectService.isAuthenticated()) {
      headers = {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      };
    }
    return this.http.get<any>(`${BASE_URL}/public/notes.list?${pageable.toApiParams()}`, {
      headers: headers
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }

  getPublicNote(id: number) {
    let headers = {};
    if (this.subjectService.isAuthenticated()) {
      headers = {
        'Authorization': `Bearer ${this.subjectService.userValue?.token}`
      };
    }
    return this.http.get<any>(`${BASE_URL}/public/notes.get/${id}`, {
      headers: headers
    }).pipe(
      retry(1),
      catchError(this.handleErrors)
    );
  }
}
