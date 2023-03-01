export const getDataMember = (index: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[Math.floor(Math.random() * 11)];
  let location = "Jakarta, Indonesia";
  let member = 2010;
  if (index % 2 === 0) {
    location = "Kuala Lumpur, Malaysia";
    member = member + index / 2;
  }
  if (index % 3 === 0) {
    location = "Perth, Australia";
    member = member + index / 3;
  }
  if (member + index > 2022) {
    member = 2022;
  }
  return { month, member, location };
};
