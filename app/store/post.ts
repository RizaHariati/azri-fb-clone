import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CommentType, OpenMenuType, PostType } from "../../typing.d";

export interface PostState {
  stories: PostType[];
  storyPage: number;
  posts: PostType[];
  page: number;
  comments: CommentType[];
  commentPage: number;
  openMenu: OpenMenuType;
}

const initialState: PostState = {
  stories: [],
  storyPage: 0,
  posts: [],
  page: 1,
  comments: [],
  commentPage: 0,
  openMenu: { status: false, menuTitle: "" },
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<PostType[]>) => {
      state.stories = [...action.payload];
      if (state.page === 20) {
        state.storyPage = 0;
      } else {
        state.storyPage = state.storyPage + 1;
      }
    },

    addMorePosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = [...action.payload];
      if (state.page === 20) {
        state.page = 1;
      } else {
        state.page = state.page + 1;
      }
    },

    addMoreComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = [...action.payload];
      if (state.commentPage === 20) {
        state.commentPage = 0;
        state.comments = [];
      }
      state.commentPage = state.commentPage + 1;
    },

    resetPosts: (state) => {
      state.stories = [];
      state.storyPage = 0;
      state.posts = [];
      state.page = 1;
      state.comments = [];
      state.commentPage = 0;
      state.openMenu = { status: false, menuTitle: "" };
    },

    handleOpenMenu: (state, action: PayloadAction<string>) => {
      const menu = action.payload;
      if (menu === "Notifications") {
        state.commentPage = 0;
        state.comments = [];
      }
      if (state.openMenu?.menuTitle && state.openMenu?.menuTitle === menu) {
        state.openMenu = { status: false, menuTitle: "" };
      } else {
        state.openMenu = { status: false, menuTitle: menu };
      }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action.payload.post.openMenu);
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
      state.posts = action.payload.post.posts;
      state.stories = action.payload.post.stories;
      state.comments = action.payload.post.comments;
      state.openMenu = action.payload.post.openMenu;
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
} = PostSlice.actions;
export default PostSlice.reducer;
