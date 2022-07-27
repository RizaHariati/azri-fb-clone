import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ToolState {
  postModal: string;
  postModalID: string;
  postDetail: string;
  postCommentSection: string;
}

const initialState: ToolState = {
  postModal: "",
  postModalID: "",
  postDetail: "",
  postCommentSection: "",
};
export const ToolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    openPostModal: (state, action) => {
      state.postModal = action.payload;
    },
    closePostModal: (state) => {
      state.postModal = "";
    },
    setPostModalID: (state, action) => {
      state.postModalID = action.payload;
    },
    setPostDetail: (state, action) => {
      const postId = action.payload;
      if (state.postDetail === postId) {
        state.postDetail = "";
      } else {
        state.postDetail = postId;
      }
    },
    closePostDetail: (state) => {
      state.postDetail = "";
    },
    openCommentSection: (state, action) => {
      const postID = action.payload;
      if (state.postCommentSection === postID) {
        state.postCommentSection = "";
      } else {
        state.postCommentSection = postID;
      }
    },
    closeCommentSection: (state) => {
      state.postCommentSection = "";
    },

    resetTool: (state) => {
      state.postModal = "";
      state.postDetail = "";
      state.postCommentSection = "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.tool.postModal) {
        return state;
      }
      if (!action.payload.tool.postModalID) {
        return state;
      }
      if (!action.payload.tool.postDetail) {
        return state;
      }
      if (!action.payload.tool.postCommentSection) {
        return state;
      }

      state.postModal = action.payload.tool.postModal;
      state.postModalID = action.payload.tool.postModalID;
      state.postDetail = action.payload.tool.postDetail;
      state.postCommentSection = action.payload.tool.postCommentSection;
    },
  },
});

export const {
  openPostModal,
  setPostModalID,
  closePostModal,
  resetTool,
  setPostDetail,
  closePostDetail,
  openCommentSection,
  closeCommentSection,
} = ToolSlice.actions;
export default ToolSlice.reducer;
