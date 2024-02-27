import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-x-state',
  templateUrl: './x-state.component.html',
  styleUrls: ['./x-state.component.css']
})
export class XStateComponent {
  @Input() state: string | null = null;
}
