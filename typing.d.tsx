export type FullProfileType = {
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  phone: string;
  picture: string;
  registerDate: string;
  title: string;
};
export type FriendType = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
};

export type PostType = {
  id: string;
  image: string;
  likes: number;
  owner: FriendType;
  publishDate: string;
  tags: string[];
  text: string;
};

export type CommentType = {
  id: string;
  message: string;
  owner: FriendType;
  post: string;
  publishDate: string;
};

export type OpenMenuType = {
  status: boolean;
  menuTitle: string;
};

export type PostDataType = {
  text: string;
  image: string | null | undefined;
  likes: number;
  owner: string;
};
/// <reference types="redux-persist" />
