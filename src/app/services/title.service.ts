import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title = new BehaviorSubject<string>('');

  private plainTitle = new BehaviorSubject<string>('');

  title$ = this.title.asObservable();
  plainTitle$ = this.plainTitle.asObservable();

  setTitle(value: string) {
    this.title.next(value);
  }

  setPlainTitle(value: string) {
    this.plainTitle.next(value);
  }
}
