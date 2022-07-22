import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FullProfileType, PostType } from "../../typing.d";

export interface ProfileState {
  mainProfilePosts: PostType[];
  fullProfile: FullProfileType;
  guestPosts: PostType[];
  guestProfile: FullProfileType;
}

const initialState: ProfileState = {
  mainProfilePosts: [],
  guestPosts: [],
  fullProfile: {
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
    phone: "",
    picture: "",
    registerDate: "",
    title: "",
  },
  guestProfile: {
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
    phone: "",
    picture: "",
    registerDate: "",
    title: "",
  },
};
export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMainProfilePost: (state, action: PayloadAction<PostType[]>) => {
      state.mainProfilePosts = [...action.payload];
    },
    setMainFullProfile: (state, action: PayloadAction<FullProfileType>) => {
      state.fullProfile = action.payload;
    },
    setGuestProfilePost: (state, action: PayloadAction<PostType[]>) => {
      state.guestPosts = [...action.payload];
    },
    setGuestfullProfile: (state, action: PayloadAction<FullProfileType>) => {
      state.guestProfile = action.payload;
    },
    resetProfile: (state) => {
      state.mainProfilePosts = [];
      state.guestPosts = [];
      state.fullProfile = {
        dateOfBirth: "",
        email: "",
        firstName: "",
        gender: "",
        id: "",
        lastName: "",
        location: {
          street: "",
          city: "",
          state: "",
          country: "",
        },
        phone: "",
        picture: "",
        registerDate: "",
        title: "",
      };
      state.guestProfile = {
        dateOfBirth: "",
        email: "",
        firstName: "",
        gender: "",
        id: "",
        lastName: "",
        location: {
          street: "",
          city: "",
          state: "",
          country: "",
        },
        phone: "",
        picture: "",
        registerDate: "",
        title: "",
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.profile.mainProfilePosts) {
        return state;
      }
      if (!action.payload.profile.fullProfile) {
        return state;
      }
      if (!action.payload.profile.guestPosts) {
        return state;
      }
      if (!action.payload.profile.guestProfile) {
        return state;
      }
      state.mainProfilePosts = action.payload.profile.mainProfilePosts;
      state.fullProfile = action.payload.profile.fullProfile;
      state.guestProfile = action.payload.profile.guestProfile;
      state.guestPosts = action.payload.profile.guestPosts;
    },
  },
});

export const {
  setMainProfilePost,
  setMainFullProfile,
  resetProfile,
  setGuestProfilePost,
  setGuestfullProfile,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
