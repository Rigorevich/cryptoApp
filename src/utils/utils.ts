enum MonthList {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const fixedNumber = function (str: string, fixed: number) {
  return Number(str).toFixed(fixed);
};

export const growth = function (
  priceNow: number,
  priceThen: number,
  fix: number
) {
  return (((priceNow - priceThen) / priceThen) * 100).toFixed(fix);
};

export const todayDate = function () {
  const today = new Date(),
    day = String(today.getDate()).padStart(2, "0"),
    year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");

  return `${day} ${MonthList[Number(month) - 1]} ${year}`;
};

export const abbreviateNumber = function (num: number, fixed = 0) {
  if (num === null) {
    return null;
  }
  if (num === 0) {
    return "0";
  }
  let b = num.toPrecision(2).split("e"),
    k =
      b.length === 1 ? 0 : Math.floor(Math.min(Number(b[1].slice(1)), 14) / 3),
    c =
      k < 1
        ? num.toFixed(fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
    d = Number(c) < 0 ? c : Math.abs(Number(c));
  return d + ["", "k", "m", "b", "t"][k];
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
