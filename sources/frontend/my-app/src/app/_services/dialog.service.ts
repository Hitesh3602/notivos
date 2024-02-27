import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'  
})
export class AppDialogService {

  constructor(private confirmationService: ConfirmationService) { }

  confirm(message: string, acceptCB: () => void, rejectCB?: (type: any) => void): void {
    this.confirmationService.confirm({
      message: message,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: acceptCB,
      reject: rejectCB
    });
  }
}
