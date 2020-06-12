export class LocalStorageMock {
  store: any

  constructor() {
    this.store = {}
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
