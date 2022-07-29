import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CommentType, OpenMenuType, PostType } from "../../typing.d";
import postIDExist from "../../util/postExist";

export interface PostState {
  stories: PostType[];
  posts: PostType[];
  page: number;
  comments: CommentType[];
  commentPage: number;
  openMenu: OpenMenuType;
  imagePost: string | null | undefined;
  hiddenPost: string[];
}

const initialState: PostState = {
  stories: [],
  posts: [],
  page: 0,
  comments: [],
  commentPage: 0,
  openMenu: { status: false, menuTitle: "" },
  imagePost: null,
  hiddenPost: [],
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setStories: (
      state,
      action: PayloadAction<{ stories: PostType[]; randomNumber: number }>
    ) => {
      const randomNumber = action.payload.randomNumber;
      const stories = action.payload.stories.slice(
        randomNumber,
        randomNumber + 4
      );
      state.stories = stories;
    },

    addMorePosts: (state, action: PayloadAction<PostType[]>) => {
      const postFiltered = action.payload.filter((post: PostType) => {
        if (postIDExist(state.hiddenPost, post.id)) {
          return false;
        } else {
          return true;
        }
      });
      state.posts = [...postFiltered];
      if (state.page >= 10) {
        state.page = 1;
      } else {
        state.page = state.page + 1;
      }
    },

    addMoreComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = [...action.payload];
      if (state.commentPage >= 20) {
        state.commentPage = 0;
        state.comments = [];
      }
      state.commentPage = state.commentPage + 1;
    },

    setImagePost: (state, action) => {
      state.imagePost = action.payload;
    },

    removeImagePost: (state) => {
      state.imagePost = null;
    },

    addToHiddenPost: (state, action) => {
      const postExist = postIDExist(state.hiddenPost, action.payload);

      if (state.hiddenPost.length < 1) {
        state.hiddenPost = [action.payload];
      } else {
        if (postExist) {
          state.hiddenPost = [...state.hiddenPost];
        } else {
          state.hiddenPost = [...state.hiddenPost, action.payload];
        }
      }
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    handleOpenMenu: (state, action: PayloadAction<string>) => {
      const menu = action.payload;
      if (menu === "Notification") {
        state.commentPage = 0;
        state.comments = [];
      }
      if (state.openMenu?.menuTitle && state.openMenu?.menuTitle === menu) {
        state.openMenu = { status: false, menuTitle: "" };
      } else {
        state.openMenu = { status: false, menuTitle: menu };
      }
    },

    closeNavbarMenu: (state) => {
      state.openMenu = { status: false, menuTitle: "" };
    },

    handleDeleteNotification: (state) => {
      state.openMenu = { status: false, menuTitle: "" };
      state.commentPage = 0;
    },

    resetPosts: (state) => {
      state.posts = [];
      state.page = 0;
      state.comments = [];
      state.commentPage = 0;
      state.openMenu = { status: false, menuTitle: "" };
      state.imagePost = null;
      state.hiddenPost = [];
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action.payload.post.imageBank);
      if (!action.payload.post.posts) {
        return state;
      }
      if (!action.payload.post.stories) {
        return state;
      }
      if (!action.payload.post.comments) {
        return state;
      }
      if (!action.payload.post.openMenu) {
        return state;
      }
      if (!action.payload.post.imagePost) {
        return state;
      }
      if (!action.payload.post.hiddenPost) {
        return state;
      }

      state.posts = action.payload.post.posts;
      state.stories = action.payload.post.stories;
      state.comments = action.payload.post.comments;
      state.openMenu = action.payload.post.openMenu;
      state.imagePost = action.payload.post.imagePost;
      state.hiddenPost = action.payload.post.hiddenPost;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMorePosts,
  setStories,
  addMoreComments,
  resetPosts,
  handleOpenMenu,
  handleDeleteNotification,
  setImagePost,
  removeImagePost,
  addToHiddenPost,
  closeNavbarMenu,
} = PostSlice.actions;
export default PostSlice.reducer;
