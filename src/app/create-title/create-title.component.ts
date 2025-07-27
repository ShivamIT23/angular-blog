import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TitleService } from '../services/title.service';
import { ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-create-title',
  imports: [QuillModule, CommonModule, FormsModule],
  templateUrl: './create-title.component.html',
  styleUrl: './create-title.component.css',
})
export class CreateTitleComponent implements OnDestroy {
  @ViewChild('quillTitleEditor') quillTitleEditor!: QuillEditorComponent;
  private quillInstance!: Quill;

  title: string = '';
  private subscriptions = new Subscription();
  quillTitle: string = '';
  textLength: number = 0;

  constructor(private titleService: TitleService) {
    this.subscriptions.add(
      this.titleService.title$.subscribe((title) => {
        this.title = title;
      })
    );
  }

  onEditorCreated(editor: Quill) {
    this.quillInstance = editor;
  }

  maxLength = 49;

  onContentChanged(event: any) {
    this.textLength = event.text.length;
    if (this.textLength > this.maxLength + 1) {
      const trimmedText = event.text.substring(0, this.maxLength);

      // Set model manually
      this.quillInstance.setText(trimmedText);

      // Restore cursor to end
      const newLength = this.quillInstance.getLength();
      this.quillInstance.setSelection(newLength - 1, 0);
      // +1 to account for new char // delete extra
    } else {
      this.titleService.setTitle(event.html ? event.html.replace('&nbsp;', ' ') : '');
      this.titleService.setPlainTitle(event.text);
    }
  }

  quillModulesTitle = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ color: [] }, { background: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
