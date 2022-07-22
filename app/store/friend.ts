import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FriendType } from "../../typing.d";

export interface FriendState {
  mainProfile: FriendType;
  friendList: FriendType[];
  randomNumber: number;
}

const initialState: FriendState = {
  mainProfile: {
    id: "",
    title: "",
    firstName: "",
    lastName: "",
    picture: "",
  },
  friendList: [],
  randomNumber: 5,
};

export const FriendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setMainProfile: (state, action) => {
      const randomNumber = Math.floor(Math.random() * 1000);
      state.randomNumber = randomNumber;
      state.mainProfile = action.payload;
    },

    setFriendData: (state, action) => {
      const mainProfile = state.mainProfile;
      state.friendList = action.payload.filter((friend: FriendType) => {
        return friend.id !== mainProfile.id;
      });
    },
    resetFriend: (state) => {
      state.mainProfile = {
        id: "",
        title: "",
        firstName: "",
        lastName: "",
        picture: "",
      };
      state.friendList = [];
      state.randomNumber = 5;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      /* ---------------- only if you have data you want ---------------- */
      if (!action.payload.friend.friendList) {
        return state;
      }
      if (!action.payload.friend.mainProfile) {
        return state;
      }
      if (!action.payload.friend.randomNumber) {
        return state;
      }
      /* ----------------- handle client state override ----------------- */
      state.friendList = action.payload.friend.friendList;
      state.mainProfile = action.payload.friend.mainProfile;
      state.randomNumber = action.payload.friend.randomNumber;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFriendData, setMainProfile, resetFriend } =
  FriendSlice.actions;
// export const selectFriend = (state: RootState) => state.friend;
export default FriendSlice.reducer;
