import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ToolState {
  postModal: boolean;
  postDetail: string;
}

const initialState: ToolState = {
  postModal: false,
  postDetail: "",
};
export const ToolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.postModal = true;
    },
    closePostModal: (state) => {
      state.postModal = false;
    },
    resetTool: (state) => {
      state.postModal = false;
    },
    togglePostDetail: (state, action) => {
      const postID = action.payload;

      if (state.postDetail === postID) {
        state.postDetail = "";
      } else {
        state.postDetail = postID;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.profile.postModal) {
        return state;
      }
      if (!action.payload.profile.postDetail) {
        return state;
      }

      state.postModal = action.payload.profile.postModal;
      state.postDetail = action.payload.profile.postDetail;
    },
  },
});

export const { openPostModal, closePostModal, resetTool, togglePostDetail } =
  ToolSlice.actions;
export default ToolSlice.reducer;
