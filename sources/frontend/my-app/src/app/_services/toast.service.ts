import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private messageService: MessageService) { }

	success(textOrTpl: string, options: any = {}) {
		const opts = Object.assign({}, {
			headertext: 'Success'
		}, options);
		this.messageService.add({ severity: 'success', summary: options.headertext, detail: textOrTpl });
	}

	info(textOrTpl: string, options: any = {}) {
		const opts = Object.assign({}, {
			headertext: 'Info'
		}, options);
		this.messageService.add({ severity: 'info', summary: options.headertext, detail: textOrTpl });
	}

	warning(textOrTpl: string, options: any = {}) {
		const opts = Object.assign({}, {
			headertext: 'Warning'
		}, options);
		this.messageService.add({ severity: 'warn', summary: options.headertext, detail: textOrTpl });
	}

	error(textOrTpl: string, options: any = {}) {
		const opts = Object.assign({}, {
			headertext: 'Error'
		}, options);
		this.messageService.add({ severity: 'error', summary: options.headertext, detail: textOrTpl });
	}
}
