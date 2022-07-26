import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ToolState {
  postModal: string;
  postModalID: string;
  postDetail: string;
}

const initialState: ToolState = {
  postModal: "",
  postModalID: "",
  postDetail: "",
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
    resetTool: (state) => {
      state.postModal = "";
      state.postDetail = "";
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

      state.postModal = action.payload.tool.postModal;
      state.postModalID = action.payload.tool.postModalID;
      state.postDetail = action.payload.tool.postDetail;
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
} = ToolSlice.actions;
export default ToolSlice.reducer;
