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
    resetTool: (state) => {
      state.postModal = false;
      state.postDetail = "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.tool.postModal) {
        return state;
      }
      if (!action.payload.tool.postDetail) {
        return state;
      }

      state.postModal = action.payload.tool.postModal;
      state.postDetail = action.payload.tool.postDetail;
    },
  },
});

export const {
  openPostModal,
  closePostModal,
  resetTool,
  setPostDetail,
  closePostDetail,
} = ToolSlice.actions;
export default ToolSlice.reducer;
