export const convertDate = (date) => {
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
  let fullDate = "";
  if (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const day = d.getDate();
    const month = months[d.getMonth()];
    fullDate = `${day} ${month.slice(0, 3)} ${year}`;

    return fullDate;
  }
};
