import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-x-note-tab',
  templateUrl: './x-note-tab.component.html',
  styleUrls: ['./x-note-tab.component.css']
})
export class XNoteTabComponent {

  @Input() active: string = '';

  constructor(
    private router: Router
  ) {}
  
  tabItems: MenuItem[] = [
    {
      label: 'My Notes',
      command: () => {
        this.router.navigate(['/manage-notes']);
      }
    },
    {
      label: 'Shared with Me',
      command: () =>{
        this.router.navigate(['/manage-shared-other']);
      }
    }
  ];

  get activeTabItem(): MenuItem {
    switch(this.active) {
      default: return this.tabItems[0];
      case 'SHARED-WITH-ME': return this.tabItems[1];
    }    
  } 
}
