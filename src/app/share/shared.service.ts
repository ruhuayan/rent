import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TokenStorage } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  username$: Subject<string>;

  constructor(private tokenStorage: TokenStorage) {
    this.username$ = new BehaviorSubject(this.tokenStorage.getUsername());
  }
}
