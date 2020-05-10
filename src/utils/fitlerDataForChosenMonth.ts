export const fitlerDataForChosenMonth = (data: any, month: number) => {
  return data.filter((item: any) => Number(item.date.split('-')[1]) === month)
}
