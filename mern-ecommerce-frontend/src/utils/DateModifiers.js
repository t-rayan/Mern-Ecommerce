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

const getAllDays = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days;
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

export const getCurrentDateWithDayName = () => {
  let currentDate = new Date();
  const days = getAllDays();
  const months = getAllMonths();
  const today = days[currentDate.getDay()];
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${today} ${day} ${month} ${year}`;
};
