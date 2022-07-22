import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface ToolState {
  postModal: boolean;
  postDetail: number;
}

const initialState: ToolState = {
  postModal: false,
  postDetail: 0,
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
      console.log(action.payload);
    },
    resetTool: (state) => {
      state.postModal = false;
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

export const { openPostModal, closePostModal, resetTool, setPostDetail } =
  ToolSlice.actions;
export default ToolSlice.reducer;
