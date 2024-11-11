//access
const USER = "USER";
const PARTY = "PARTY";
const ACCESSES = [USER, PARTY];

//response message
const SERVER_ERROR = "Internal server error";
const HEADER_ERROR = {
  AUTHORIZATION: "Authorization header not found",
};

//auth
const LOGIN = "login";
const SIGNUP = "signup";

module.exports = {
  USER,
  PARTY,
  ACCESSES,
  SERVER_ERROR,
  HEADER_ERROR,
  LOGIN,
  SIGNUP,
};