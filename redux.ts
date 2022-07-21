import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import { addPost } from './actions/post';
import { logIn, logOut } from './actions/user';

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

const firstMiddleware = (store) => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'function') { // 비동기
    return action(store.dispatch, store.getState);
  }
  return next(action); // 동기
};

const enhancer = applyMiddleware(
  firstMiddleware,
  thunkMiddleware,
);

const store = createStore(reducer, initialState, enhancer);

console.log('1st', store.getState());

// --------------------------------------


store.dispatch(logIn({
  id: 1,
  name: 'zerocho',
  admin: true,
}));
console.log('2nd', store.getState());
//
// store.dispatch(addPost({
//   userId: 1,
//   id: 1,
//   content: '안녕하세요. 리덕스',
// }));
// console.log('3rd', store.getState());
// store.dispatch(addPost({
//   userId: 1,
//   id: 2,
//   content: '두번째 리덕스',
// }));
// console.log('4th', store.getState());
//
// store.dispatch(logOut());
// console.log('5th', store.getState());