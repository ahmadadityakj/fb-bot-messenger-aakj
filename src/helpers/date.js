import dayjs from 'dayjs';

const countNextBirthDay = (date) => {
  const today = dayjs();
  const birthDate = dayjs(date);
  const monthBirth = birthDate.month();
  const dayBirth = birthDate.date();
  let nextBirthDate = today.month(monthBirth).date(dayBirth);
  if (nextBirthDate.isBefore(today)) {
    nextBirthDate = nextBirthDate.add(1, 'year');
  }
  
  return nextBirthDate.diff(today, 'day');
};

module.exports = {
  countNextBirthDay: countNextBirthDay
};