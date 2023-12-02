import {addPost} from "../actions/post";

type InitialState = string[];
const initialState: InitialState = [];

const postReducer = (prevState = initialState, action: ReturnType<typeof addPost>) => { // 새로운 state 만들어주기
  switch (action.type) {
    case 'ADD_POST':
      return [...prevState, action.data];
    default:
      return prevState;
  }
};

export default postReducer;