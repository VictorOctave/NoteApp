import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;
  noteId: number;
  new: boolean;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.note = new Note();

    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.noteId = params.id;
        this.note = this.notesService.get(this.noteId);
        this.new = false;
        return;
      }

      this.new = true;
    });
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.notesService.add(form.value);
      this.router.navigateByUrl('/');
      return;
    }

    this.notesService.update(this.noteId, form.value.title, form.value.body);
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
