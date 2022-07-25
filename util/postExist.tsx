const postIDExist = (array: string[], postId: string) => {
  if (array.length < 1) {
    return false;
  } else {
    return array.some((item) => item === postId);
  }
};

export default postIDExist;
