import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-x-page-title',
  templateUrl: './x-page-title.component.html',
  styleUrls: ['./x-page-title.component.css']
})
export class XPageTitleComponent {

  @Input() title: string = '';
  @Input() loading: boolean = false;
}
