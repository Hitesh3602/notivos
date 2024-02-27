import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedNoteDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { ShareService } from 'src/app/_services/share.service';

@Component({
  selector: 'app-edit-shared-with-me',
  templateUrl: './edit-shared-with-me.component.html',
  styleUrls: ['./edit-shared-with-me.component.css']
})
export class EditSharedWithMeComponent implements OnInit {
  isAddMode: boolean = false;
  id: number | undefined;
  loading = false;

  editForm = this.formBuilder.group({
    'caption': {value: '', disabled: true},
    'body': ['', [Validators.required]],
    'category': {value:'', disabled: true},
  });

  constructor(
    private formBuilder: FormBuilder,
    private shareService: ShareService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = false;

    this.shareService.getShare(this.id!).subscribe({
      next: result => {
        var p = <SharedNoteDto>result;
        if(p.access != SharedNoteDto.RW)
        {
          this.toastService.error('Access denied');
          this.router.navigate(['/manage-shared-other']);          
        }
        else
        {
          this.editForm.controls.caption.setValue(p.note.caption!);
          this.editForm.controls.body.setValue(p.note.body!);
          this.editForm.controls.category.setValue(p.note.category!);
        }
      }
    });
  }

  onSubmit() {
    this.loading = true;
    const body = this.editForm.get('body')?.value!;
    const caption = this.editForm.get('caption')?.value!;

    this.shareService.modifySharedNote(this.id!, body)
      .subscribe({
        next: () => {
          this.toastService.success(`Shared note ${caption} updated`);
          this.router.navigate(['/manage-shared-other']);
        },
        error: _error => {
          this.loading = false;
        }
      });
  }
}
