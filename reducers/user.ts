import {addPost} from "../actions/post";
import {logIn, logOut, logInSuccess} from "../actions/user";

export interface InitialState {
  isLoggingIn: boolean;
  data: null | { success: boolean };
}

export const initialState: InitialState = {
  isLoggingIn: false,
  data: null,
};

const userReducer = (prevState = initialState, action: ReturnType<typeof logInSuccess> | ReturnType<typeof logOut>) => { // 새로운 state 만들어주기
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return {
        ...prevState,
        data: {success: true},
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        data: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;
