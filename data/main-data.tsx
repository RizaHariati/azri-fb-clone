import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faBriefcaseClock,
  faBullhorn,
  faCalendarDays,
  faChartSimple,
  faClock,
  faFileVideo,
  faFlag,
  faHandHoldingHeart,
  faPeopleGroup,
  faPuzzlePiece,
  faRectangleAd,
  faSeedling,
  faShieldHeart,
  faStar,
  faStore,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export const mainLeftLinks = [
  {
    name: "Friends",
    icon: faUserGroup,
    href: "/main/friends",
    color: "text-sky-500",
  },
  {
    name: "Pages",
    icon: faFlag,
    href: "/main/pages",
    color: "text-red-500",
  },
  {
    name: "Watch",
    icon: faCirclePlay,
    a: "https://www.facebook.com/watch/",
    color: "text-sky-500",
  },
  {
    name: "Favourites",
    icon: faStar,
    href: "/main/pages",
    color: "text-yellow-500",
  },
  {
    name: "Fundraisers",
    icon: faShieldHeart,
    a: "https://www.facebook.com/fundraisers/explore",
    color: "text-red-500",
  },
  {
    name: "Messenger",
    icon: faFacebookMessenger,
    href: "/main/home",
    color: "text-sky-500",
  },
  {
    name: "Groups",
    icon: faPeopleGroup,
    a: "https://www.facebook.com/groups/feed/",
    color: "text-slate-100",
  },
  {
    name: "Ad Centre",
    icon: faBullhorn,
    a: "https://www.facebook.com/",
    color: "text-yellow-500",
  },
  {
    name: "Ads Manager",
    icon: faChartSimple,
    a: "https://www.facebook.com/coronavirus_info/",
    color: "text-sky-500",
  },
  {
    name: "Climate Science Center",
    icon: faSeedling,
    href: "/main/home",
    color: "text-green-500",
    a: "https://www.facebook.com/climatescienceinfo/",
  },
  {
    name: "Emotional Health",
    icon: faHandHoldingHeart,
    href: "/main/home",
    color: "text-yellow-500",
    a: "https://www.facebook.com/emotional_health/",
  },
  {
    name: "Events",
    icon: faCalendarDays,
    href: "/main/home",
    color: "text-red-500",
  },
  {
    name: "Gaming Video",
    icon: faPuzzlePiece,
    a: "https://www.facebook.com/gaming/",
    color: "text-sky-500",
  },
  {
    name: "Live Videos",
    icon: faFileVideo,
    a: "https://www.facebook.com/watch/",
    color: "text-red-500",
  },
  {
    name: "Marketplace",
    icon: faStore,
    a: "https://www.facebook.com/",
    color: "text-sky-500",
  },
  {
    name: "Memories",
    icon: faClock,
    href: "/main/home",
    color: "text-sky-500",
  },
  {
    name: "Messenger Kids",
    icon: faFacebookMessenger,
    href: "/main/home",
    color: "text-green-500",
  },
  {
    name: "Most Recent",
    icon: faBriefcaseClock,
    href: "/main/home",
    color: "text-sky-500",
  },
  {
    name: "Recent Ad Activity",
    icon: faRectangleAd,
    href: "/main/home",
    color: "text-yellow-500",
  },
  {
    name: "Saved",
    icon: faBookmark,
    href: "/main/home",
    color: "text-red-500",
  },
];

export const mainShortcuts = [
  {
    id: "shortcut-1",
    name: "Germany Tourism",
    url: "page1",
    link: "https://www.facebook.com/germanytourism",
    text: "This is the official Facebook page of the German National Tourist Board.",
  },
  {
    id: "shortcut-2",
    name: "City Car Community Indonesia",
    url: "page2",
    link: "https://www.facebook.com/groups/citycarcommunityindonesia",
    text: "Kami merangkul rr pemilik CityCar di seluruh Indonesia",
  },
  {
    id: "shortcut-3",
    name: "Community of single people",
    url: "page3",
    link: "https://www.facebook.com/groups/CommunityofSinglePeople",
    text: "This group has nothing to do with dating. Welcome to this Community of Single People who want to live their single lives fully,",
  },
  {
    id: "shortcut-4",
    name: "Horror movies forever",
    url: "page4",
    link: "https://www.facebook.com/groups/782532348471852",
    text: "Horror Movies Forever (HMF) is a place where fans of the genre can come together",
  },
  {
    id: "shortcut-5",
    name: "Autistic Adults with ADHD",
    url: "page5",
    link: "https://www.facebook.com/groups/125280534641344",
    text: "A group for adults who are both Autistic and also ADHD/ADD. ",
  },
];
