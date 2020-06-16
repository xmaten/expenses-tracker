export class LocalStorageMock {
  store: any
  length: number

  constructor() {
    this.store = {}
    this.length = 0
  }

  key(index: number) {
    return this.store[index] || null
  }

  clear() {
    this.store = {}
  }

  getItem(key: any) {
    return this.store[key] || null
  }

  setItem(key: any, value: any) {
    this.store[key] = value.toString()
  }

  removeItem(key: any) {
    delete this.store[key]
  }
}
