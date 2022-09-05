import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Welcome from "../../pages";
import { Provider } from "react-redux";
import { persistor, store } from "../../app";
import "../../styles/globals.css";
import { FriendType, PostType } from "../../typing.d";
import Layout from "../../components/navbar/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PersistGate } from "redux-persist/integration/react";
config.autoAddCss = false;
export default {
  title: "Pages/Welcome",
  component: Welcome,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Welcome>;

interface Props {
  friendData: FriendType[];
  stories: PostType[];
}

const Wrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout> {children}</Layout>
      </PersistGate>
    </Provider>
  );
};
export const LoadingFriendData: ComponentStory<typeof Welcome> = ({
  friendData,
  stories,
}: Props) => (
  <Wrapper>
    <Welcome friendData={friendData} stories={stories} />
  </Wrapper>
);

const friendData: FriendType[] = [
  {
    id: "60d0fe4f5311236168a109e0",
    title: "miss",
    firstName: "Milly",
    lastName: "Norman",
    picture: "https://randomuser.me/api/portraits/med/women/31.jpg",
  },
  {
    id: "60d0fe4f5311236168a109e1",
    title: "mr",
    firstName: "James",
    lastName: "Black",
    picture: "https://randomuser.me/api/portraits/med/men/29.jpg",
  },
  {
    id: "60d0fe4f5311236168a109e2",
    title: "mr",
    firstName: "Heinz-Georg",
    lastName: "Fiedler",
    picture: "https://randomuser.me/api/portraits/med/men/81.jpg",
  },
  {
    id: "60d0fe4f5311236168a109e9",
    title: "mr",
    firstName: "Alfredo",
    lastName: "Omahony",
    picture: "https://randomuser.me/api/portraits/med/men/76.jpg",
  },
];
const stories: PostType[] = [
  {
    id: "62e104853c5d7ec48079bf97",
    image: "https://img.dummyapi.io/photo-1583784060971-611ac54c2096.jpg",
    likes: 5,
    tags: [],
    text: "Finished rebuilding AzriClone on July 2022",
    publishDate: "2022-07-27T09:25:25.116Z",
    owner: {
      firstName: "James",
      id: "60d0fe4f5311236168a109e1",
      lastName: "Black",
      picture: "https://randomuser.me/api/portraits/med/men/29.jpg",
      title: "mr",
    },
  },
  {
    id: "62df9eb3cc9f1df39d13759f",
    image: "https://img.dummyapi.io/photo-1589915282995-195fd3471fbc.jpg",
    likes: 21,
    tags: [],
    text: "This beautiful view",
    publishDate: "2022-07-26T07:58:43.101Z",
    owner: {
      firstName: "Edita",
      id: "60d0fe4f5311236168a109cb",
      lastName: "Vestering",
      picture: "https://randomuser.me/api/portraits/med/women/89.jpg",
      title: "miss",
    },
  },
  {
    id: "61d0c676c800481e0628b599",
    image: "https://img.dummyapi.io/photo-1558528021-a4925a5488c7.jpg",
    likes: 61,
    tags: [],
    text: "Happy New year 2022!! ",
    publishDate: "2022-01-01T21:24:06.457Z",
    owner: {
      firstName: "Edita",
      id: "60d0fe4f5311236168a109cb",
      lastName: "Vestering",
      picture: "https://randomuser.me/api/portraits/med/women/89.jpg",
      title: "miss",
    },
  },
  {
    id: "6193929d83eb34698a543978",
    image: "https://img.dummyapi.io/photo-1568480418648-be0346569876.jpg",
    likes: 8,
    tags: [],
    text: "What color do you see? ",
    publishDate: "2021-11-16T11:14:37.945Z",
    owner: {
      firstName: "Miguel",
      id: "60d0fe4f5311236168a109dd",
      lastName: "Lima",
      picture: "https://randomuser.me/api/portraits/med/men/31.jpg",
      title: "mr",
    },
  },
  {
    id: "618b01e12409bccab0f58cfa",
    image: "https://img.dummyapi.io/photo-1571164712078-972f26d5144d.jpg",
    likes: 0,
    tags: [],
    text: "I love this kind of weather",
    publishDate: "2021-11-09T23:18:57.862Z",
    owner: {
      firstName: "Friedrich-Karl",
      id: "60d0fe4f5311236168a109d3",
      lastName: "Brand",
      picture: "https://randomuser.me/api/portraits/med/men/7.jpg",
      title: "mr",
    },
  },
];

export const WithFriendData: ComponentStory<typeof Welcome> = () => (
  <Wrapper>
    <Welcome friendData={friendData} stories={stories} />
  </Wrapper>
);
