import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-x-access',
  templateUrl: './x-access.component.html',
  styleUrls: ['./x-access.component.css']
})
export class XAccessComponent {

  @Input() access: string | null = null;
}
