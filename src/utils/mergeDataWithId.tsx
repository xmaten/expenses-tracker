export const mergeDataWithId = (data: any) => {
  const dataWithId = []
  for (const val in data) {
    const valuesWithId = {
      ...data[val],
      id: val,
    }

    dataWithId.push(valuesWithId)
  }

  return dataWithId
}
