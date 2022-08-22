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

export const fixedNumber = function (str: string, fixed: number) {
  return Number(str) ? +(+Number(str)).toFixed(fixed) : 0;
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

export const abbreviateNumber = function (num: number = 0) {
  let number: number = num;
  let result: string = "";
  const decPlaces = 10;
  const suffix = ["k", "m", "b", "t"];

  for (let i = suffix.length - 1; i >= 0; i--) {
    let size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;
      if (number === 1000 && i < suffix.length - 1) {
        number = 1;
        i++;
      }
      result = number.toString();
      result += suffix[i];
      break;
    }
  }

  return result;
};
