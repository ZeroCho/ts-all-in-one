export const addPost = (data) => {
  return {
    type: 'ADD_POST',
    data,
  }
};

export default {
  addPost,
};