export const abbreviateNumber = function (num, fixed) {
  num = Number(num);
  if (num === null) {
    return null;
  }
  if (num === 0) {
    return "0";
  }
  fixed = !fixed || fixed < 0 ? 0 : fixed;
  let b = num.toPrecision(2).split("e"),
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
    d = c < 0 ? c : Math.abs(c),
    e = d + ["", "k", "m", "b", "t"][k];
  return e;
};

export const fixedNumber = function (str, fixed) {
  return Number(str).toFixed(fixed);
};

export const todayDate = function () {
  const today = new Date(),
    day = String(today.getDate()).padStart(2, "0"),
    year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  const monthWord = [
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
  month = monthWord[Number(month) - 1];

  return `${day} ${month} ${year}`;
};

export const labels = [
  "10pm",
  "11pm",
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
];
