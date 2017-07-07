export function store (field, value) {
  window.localStorage.setItem(field, JSON.stringify(value))
}

export function get (field) {
  return JSON.parse(window.localStorage.getItem(field))
}

export function remove (field) {
  window.localStorage.removeItem(field)
}
