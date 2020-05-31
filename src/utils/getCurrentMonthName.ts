export const getCurrentMonthName = (month: number) => {
  const lang = localStorage.getItem('language')
  const months: Record<number, string> = {
    1: lang === 'pl' ? 'Styczeń' : 'January',
    2: lang === 'pl' ? 'Luty' : 'February',
    3: lang === 'pl' ? 'Marzec' : 'March',
    4: lang === 'pl' ? 'Kwiecień' : 'April',
    5: lang === 'pl' ? 'Maj' : 'May',
    6: lang === 'pl' ? 'Czerwiec' : 'June',
    7: lang === 'pl' ? 'Lipiec' : 'July',
    8: lang === 'pl' ? 'Sierpień' : 'August',
    9: lang === 'pl' ? 'Wrzesień' : 'September',
    10: lang === 'pl' ? 'Październik' : 'October',
    11: lang === 'pl' ? 'Listopad' : 'November',
    12: lang === 'pl' ? 'Grudzień' : 'December',
  }

  return months[month]
}
