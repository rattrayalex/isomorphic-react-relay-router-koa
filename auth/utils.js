
export function * protect (next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.throw(403, 'please login')
  }
}
