import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarCheck,
  faFlag,
  faNewspaper,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBookOpen,
  faVideo,
  faBookmark,
  faBullhorn,
  faChartSimple,
  faHandHoldingHeart,
  faPeopleGroup,
  faPuzzlePiece,
  faSeedling,
  faStore,
  faUserGroup,
  faCirclePlay,
  faGamepad,
  faMemory,
  faLeaf,
  faSuitcase,
  faVirusCovid,
  faMoneyBill,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export const mainMenuRight = [
  {
    name: "Post",
    icon: faPenToSquare,
    text: "Share a post on News Feed",
    href: "/main/home",
  },
  {
    name: "Story",
    icon: faBookOpen,
    text: "Share a photo or something",
    href: "/main/home",
  },
  {
    name: "Room",
    icon: faVideo,
    text: "Video chat with anyone, on or off Facebook, without time limits",
    href: "/main/home",
  },
  {
    name: "Page",
    icon: faFlag,
    text: "Connect and share with customers or fans",
    href: "/main/pages",
  },
  {
    name: "Ad",
    icon: faBullhorn,
    text: "Advertise your business, brand or organisation",
    a: "https://www.facebook.com/fundraisers/",
  },
  {
    name: "Group",
    icon: faUserGroup,
    text: "Connect with people who share your interest",
    a: "https://www.facebook.com/climatescienceinfo/",
  },
  {
    name: "Event",
    icon: faCalendarCheck,
    text: "Bring people together with public or private event",
    a: "https://www.facebook.com/gaming/feed/",
  },
  {
    name: "MarketPlace",
    icon: faBagShopping,
    text: "Sell items to people in your community",
    a: "https://www.facebook.com/coronavirus_info/",
  },
];

export const mainMenuLeft = [
  {
    id: "menu-1",
    title: "social",

    links: [
      {
        link: "Pages",
        icon: faFlag,
        text: "discover and connect with businesses on Facebook",
        color: "text-sky-500",
        href: "/main/pages",
      },

      {
        link: "friends",
        icon: faUserGroup,
        text: "Search for friends or people you may know",
        color: "text-red-500",
        href: "/main/friends",
      },
      {
        link: "groups",
        icon: faPeopleGroup,
        text: "connect with people who share your interests",
        color: "text-green-500",
        a: "https://www.facebook.com/coronavirus_info/",
      },
      {
        link: "News Feed",
        icon: faNewspaper,
        text: "see relevant posts from people and Pages that you follow",
        color: "text-sky-500",
        href: "https://www.facebook.com/climatescienceinfo/",
      },
    ],
  },
  {
    id: "menu-2",
    title: "shopping",

    links: [
      {
        link: "Marketplace",
        icon: faStore,
        text: "Buy and sell in your community",
        color: "text-red-500",
        a: "https://www.facebook.com/climatescienceinfo/",
      },
    ],
  },
  {
    id: "menu-3",
    title: "entertainment",

    links: [
      {
        link: "Gaming videos",
        icon: faPuzzlePiece,
        text: "Watch and connect with your favourite games and streames",
        color: "text-green-500",
        a: "https://www.facebook.com/gaming/feed/",
      },
      {
        link: "Play games",
        icon: faGamepad,
        text: "Play your favourite games",
        color: "text-yellow-500",
        a: "https://www.facebook.com/gaming/feed/",
      },
      {
        link: "watch",
        icon: faCirclePlay,
        text: "a video destination personalised to your interest and connections",
        color: "text-red-500",
        a: "https://www.facebook.com/gaming/feed/",
      },
    ],
  },

  {
    id: "menu-4",
    title: "personal",

    links: [
      {
        link: "Recent ad activity",
        icon: faChartSimple,
        text: "See all of the ads you've interacted with on Facebook",
        color: "text-sky-500",
        a: "https://www.facebook.com/",
      },
      {
        link: "Memories",
        icon: faMemory,
        text: "Browse your old photos, videos and posts on Facebook",
        color: "text-green-500",
        href: "/main/home",
      },
      {
        link: "Saved",
        icon: faBookmark,
        text: "Find posts, photos, and videos that you've saved for later",
        color: "text-sky-500",
        href: "/main/home",
      },
      {
        link: "Weather",
        icon: faLeaf,
        text: "Check your local forecast and sign up for daily weather notifications",
        color: "text-green-500",
        a: "https://www.facebook.com/climatescienceinfo/",
      },
    ],
  },
  {
    id: "menu-5",
    title: "professional",

    links: [
      {
        link: "Ads",
        icon: faBullhorn,
        text: "Create, manage and track the performance of your ads",
        color: "text-yellow-500",
        a: "https://www.facebook.com/",
      },
      {
        link: "Jobs",
        icon: faSuitcase,
        text: "Find a job that's right for you",
        color: "text-sky-500",
        a: "https://www.facebook.com/",
      },
    ],
  },
  {
    id: "menu-6",
    title: "Community resources",

    links: [
      {
        link: "Climate Science centre",
        icon: faSeedling,
        text: "Learn about climate change and its effects",
        color: "text-green-500",
        a: "https://www.facebook.com/climatescienceinfo/",
      },
      {
        link: "COVID-19 Information Centre",
        icon: faVirusCovid,
        text: "See the lates prevention tips, community resources and updates from health organistion",
        color: "text-yellow-500",
        a: "https://www.facebook.com/coronavirus_info/",
      },
      {
        link: "Crisis Response",
        icon: faHandHoldingHeart,
        text: "Find the lates updates for recent crises heppening around the world",
        color: "text-red-500",
        a: "https://www.facebook.com/crisisresponse/?source=facebook_bookmark",
      },
      {
        link: "Fundraisers",
        icon: faMoneyBill,
        text: "Donate and raise money for charities and personal causes",
        color: "text-sky-500",
        a: "https://www.facebook.com/fundraisers/",
      },
    ],
  },
  {
    id: "menu-7",
    title: "More from Facebook",

    links: [
      {
        link: "messenger",
        icon: faFacebookMessenger,
        text: "Chat to your friends and connections instantly",
        color: "text-sky-500",
        a: "https://www.facebook.com/climatescienceinfo/",
      },
      {
        link: "Messenger Kids",
        icon: faMessage,
        text: "Let children message close friends and family",
        color: "text-sky-500",
        a: "https://www.facebook.com/climatescienceinfo/",
      },
    ],
  },
];

const menuBtn_Create = [
  {
    id: 1,
    links: [
      {
        index: "cre-1",
        name: "Post",
        icon: "post",
      },
      {
        index: "cre-2",
        name: "Group Post",
        icon: "postgroup",
      },
      {
        index: "cre-3",
        name: "Story",
        icon: "story",
      },
      {
        index: "cre-4",
        name: "Room",
        icon: "room",
      },
    ],
  },
  {
    id: 2,
    links: [
      {
        index: "cre-5",
        name: "page",
        icon: "pages",
      },
      {
        index: "cre-6",
        name: "Ad",
        icon: "ad",
      },
      {
        index: "cre-7",
        name: "group",
        icon: "groups",
      },
      {
        index: "cre-8",
        name: "event",
        icon: "event",
      },
      {
        index: "cre-9",
        name: "Marketplace listing",
        icon: "marketplace",
      },
      {
        index: "cre-10",
        name: "job",
        icon: "jobs",
      },
    ],
  },
];

const menuBtn_Account = [
  {
    id: 1,
    links: [
      {
        index: "acc-1",
        name: "feedback",
        icon: "feedback",
      },
    ],
  },
  {
    id: 2,
    links: [
      {
        index: "acc-2",
        name: "settings & privacy",
        icon: "setting",
      },
      {
        index: "acc-3",
        name: "Help & support",
        icon: "help",
      },
      {
        index: "acc-4",
        name: "Display & accessibility",
        icon: "display",
      },
    ],
  },
];
export { menuBtn_Create, menuBtn_Account };
