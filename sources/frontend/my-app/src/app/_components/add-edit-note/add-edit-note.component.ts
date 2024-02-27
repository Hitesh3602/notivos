import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto, NoteDto, PageableDto } from 'src/app/_models';
import { ToastService } from 'src/app/_services';
import { CategoryService } from 'src/app/_services/category.service';
import { NoteService } from 'src/app/_services/note.service';

interface State {
  name: string;
}

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css']
})
export class AddEditNoteComponent implements OnInit {

  isAddMode: boolean = false;
  id: number | undefined;
  loading = false;
  states: State[] = [{ "name": 'PRIVATE' }, { "name": 'PUBLIC' }];
  categories: CategoryDto[] = [];

  editForm = this.formBuilder.group({
    'caption': ['', [Validators.required]],
    'body': ['', [Validators.required]],
    'category': ['', [Validators.required]],
    'state': ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.categoryService.listCategories(new PageableDto({ first: 0, size: 100, sort: { field: "name", order: 1 } })).subscribe({
      next: result => {
        this.categories = <CategoryDto[]>result.content;
      }
    });

    if (!this.isAddMode) {
      this.noteService.getNote(this.id!).subscribe({
        next: result => {
          var p = <NoteDto>result;
          this.editForm.controls.caption.setValue(p.caption!);
          this.editForm.controls.body.setValue(p.body!);
          this.editForm.controls.state.setValue(p.state!);
          this.editForm.controls.category.setValue(p.category!);
        }
      })
    } else {
      this.editForm.controls.caption.setValue('Note 1');
      this.editForm.controls.body.setValue('<h1>Note 1</h1>');
      this.editForm.controls.state.setValue('PRIVATE');
      this.editForm.controls.category.setValue('Category 1');
    }
  }

  onSubmit() {
    this.loading = true;
    const caption = this.editForm.get('caption')?.value!;
    const body = this.editForm.get('body')?.value!;
    const state = this.editForm.get('state')?.value!;
    const category = this.editForm.get('category')?.value!;

    if (this.isAddMode) {
      this.noteService.createNote(caption, body, state, category)
        .subscribe({
          next: () => {
            this.toastService.success(`Note ${caption} created`);
            this.router.navigate(['/manage-notes']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    } else {
      this.noteService.modifyNote(this.id!, caption, body, state, category)
        .subscribe({
          next: () => {
            this.toastService.success(`Note ${caption} updated`);
            this.router.navigate(['/manage-notes']);
          },
          error: _error => {
            this.loading = false;
          }
        });
    }
  }
}