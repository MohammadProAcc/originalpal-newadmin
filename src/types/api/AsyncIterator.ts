type Callback = (item: any) => Promise<any>

export class AsyncIterator {
  items: any[]
  callback: Callback

  constructor(items: any[], callback: Callback) {
    this.items = items
    this.callback = callback
  }

  [Symbol.asyncIterator]() {
    return {
      items: this.items,
      callback: this.callback,
      async next() {
        const item = this.items.pop()
        const result = item ? await this.callback(this.items.pop()) : null
        if (item) {
          return { done: false, value: result }
        } else {
          return { done: true }
        }
      },
    }
  }
}
