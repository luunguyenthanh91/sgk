export class RateLimiter {
  constructor({ capacity = 2, refillIntervalMs = 2500, tokensPerInterval = 1 } = {}) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.queue = [];
    setInterval(() => {
      this.tokens = Math.min(this.capacity, this.tokens + tokensPerInterval);
      this._drain();
    }, refillIntervalMs);
  }
  schedule(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this._drain();
    });
  }
  _drain() {
    while (this.tokens > 0 && this.queue.length > 0) {
      this.tokens -= 1;
      const { fn, resolve, reject } = this.queue.shift();
      Promise.resolve()
        .then(fn)
        .then(resolve)
        .catch(reject)
        .finally(() => { /* giữ token đã dùng, refill bằng timer */ });
    }
  }
}
