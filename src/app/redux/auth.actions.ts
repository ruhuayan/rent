import { Action } from '@ngrx/store';

export enum ActionTypes {
    Login    = '[Auth Component] Login',
    Logout     = '[Auth Component] Logout',
}

export class Login implements Action {
    readonly type = ActionTypes.Login;
    constructor(public payload: string) {}
}
export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}
export type ActionUnion = Login | Logout;

