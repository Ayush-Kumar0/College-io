function setToken(name, value) {
  localStorage.setItem(name, value);
}
function getToken(name) {
  return localStorage.getItem(name);
}
function removeToken(name) {
  localStorage.removeItem(name);
}


export { getToken, setToken, removeToken };