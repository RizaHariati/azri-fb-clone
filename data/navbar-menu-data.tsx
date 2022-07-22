import {
  faBarChart,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBarsProgress,
  faEnvelope,
  faExclamation,
  faGear,
  faGlobeAsia,
  faListCheck,
  faLock,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

export const settingData = [
  { text: "Settings", icon: faGear },
  { text: "Privacy Checkup", icon: faUserLock },
  { text: "Privacy Centre", icon: faLock },
  { text: "Activity Log", icon: faListCheck },
  { text: "Feed", icon: faBarsProgress },
  { text: "Language", icon: faGlobeAsia },
];

export const supportData = [
  { text: "Help Centre", icon: faCircleQuestion },
  { text: "Support Inbox", icon: faEnvelope },
  { text: "Report Problem", icon: faExclamation },
];
