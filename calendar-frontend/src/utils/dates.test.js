import {
  beforeDaysInMonth, daysInMonth, firstDayInMonth
} from './dates';

describe('test dates', () => {
  it('daysInMonth', () => {
    // 2019-04
    expect(daysInMonth(2019, 3)).toBe(30)
  })

  it('firstDayInMonth', () => {
    // 2019-04
    expect(firstDayInMonth(2019, 3)).toBe(1)
  })

  it('before daysInMonth', () => {
    // 2019-04, want 2019-03
    expect(beforeDaysInMonth(2019, 3)).toBe(31)
  })
})
