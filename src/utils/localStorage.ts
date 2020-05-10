export const getFromStorage = (key: string): string | undefined => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : undefined
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const saveToStorage = (key: string, value: any = null): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(error)
  }
}

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}
