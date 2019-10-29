import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromEvent, EMPTY } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  ActionUnion, ActionTypes
} from './auth.actions';

@Injectable()
export class LocalStorageEffects {
  @Effect({ dispatch: true })
  updateState = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter(evt => evt.key === 'username'),
    filter(evt => evt.newValue !== null),
    map(evt => {
      const username = JSON.parse(evt.newValue); console.log(username);
      return { type: ActionTypes.Login, payload: username };
    }),
  );

  constructor(private actions: Actions<ActionUnion>) {}
}
