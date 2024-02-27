import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-x-table-header',
  templateUrl: './x-table-header.component.html',
  styleUrls: ['./x-table-header.component.css']
})
export class XTableHeaderComponent {

  @Input() newLink: string|any[]|null|undefined;
  @Input() input: any;

  get hasNewLink(): boolean {
    return typeof(this.newLink)!='undefined';
  }
}
