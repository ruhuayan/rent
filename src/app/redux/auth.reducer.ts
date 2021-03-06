import { ActionTypes, ActionUnion } from './auth.actions';
// import { Ball, Dot, RA, HEIGHT, ANG, Status } from './ball.model';
// import { ActionReducer, Action } from '@ngrx/store';

export interface IAuthState {
   username: string;
}

export const initState: IAuthState = {
    username: localStorage.getItem('username')
};

// const saveState = (_state: IAuthState) => {
//   localStorage.setItem('auth', JSON.stringify(_state));
//   return _state;
// };
// saveState(initState);
export function authReducer(state: IAuthState = initState, action: ActionUnion): IAuthState {
    // let newState: IAuthState;
    switch (action.type) {
        case ActionTypes.Login:
            return { username: action.payload};

        case ActionTypes.Logout:
            return {username: ''};

        default:
            return state;
    }
}
