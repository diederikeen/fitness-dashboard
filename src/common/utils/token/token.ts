export function getToken() {
  return sessionStorage.getItem("auth-token");
}

export function setToken(token: string) {
  sessionStorage.setItem("auth-token", token);
}
