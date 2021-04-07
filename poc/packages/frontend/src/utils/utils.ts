import tokenService from "../services/tokenService";

export const hashFromString = function (s: string) {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export const isAuthenticated = () => {
  return localStorage.getItem("accessToken") != null;
};
