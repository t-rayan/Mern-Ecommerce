const getAllMonths = () => {
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
  return months;
};

export const convertDate = (date) => {
  const months = getAllMonths();
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

export const getDayOnly = (date) => {
  const months = getAllMonths();
  let dayOnly = "";

  if (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const day = d.getDate();
    const month = months[d.getMonth()];
    dayOnly = `${day}`;

    return dayOnly;
  }
};

export const getMonthOnly = (date) => {
  const months = getAllMonths();
  let dayOnly = "";

  if (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const day = d.getDate();
    const month = months[d.getMonth()].slice(0, 3);

    return month;
  }
};
export const getFullDate = (date) => {
  const months = getAllMonths();

  let fulldate = "";

  if (date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const day = d.getDate();
    const month = months[d.getMonth()].slice(0, 3);
    fulldate = `${day}/${month}/${year}`;

    return fulldate;
  }
};
export const getTime = (date) => {
  let myDate = new Date(date);
  return myDate.toLocaleTimeString();
};
