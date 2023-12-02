export const addPost = (data: string) => {
  return {
    type: 'ADD_POST',
    data,
  } as const
};

export default {
  addPost,
};