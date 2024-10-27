import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}
