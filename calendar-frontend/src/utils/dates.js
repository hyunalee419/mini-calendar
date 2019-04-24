/**
 * day count in month
 * @param year: full year
 * @param month: month index
 * @returns {number}
 */
function daysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

/**
 * first day index in month
 * @param year: full year
 * @param month: month index
 * @returns {number}
 */
function firstDayInMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * day count in before month
 * @param year: full year
 * @param month: current month index
 * @returns {number}
 */
function beforeDaysInMonth(year, month) {
  const today = new Date(year, month);
  today.setMonth(today.getMonth() - 1);
  return daysInMonth(today.getFullYear(), today.getMonth());
}

export {
  daysInMonth,
  firstDayInMonth,
  beforeDaysInMonth,
};
