export const logIn = (data) => { // async action creator
  return (dispatch, getState) => { // async action
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'zerocho'
        }));
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

export const logInRequest = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  } as const
};

export const logInSuccess = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  } as const
};

export const logInFailure = (error: Error) => {
  return {
    type: 'LOG_IN_FAILURE',
    error,
  } as const
};

export const logOut = () => {
  return { // action
    type: 'LOG_OUT',
  } as const;
};

export default {
  logIn,
  logOut,
};