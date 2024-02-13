export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = () => {
  return {
    type: "LOGIN"
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

const initialState = {
  isUserLogIn: false
};

const authIsLogIn = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isUserLogIn: true };
    case "LOGOUT":
      return { ...state, isUserLogIn: false };
    default:
      return state;
  }
};

export default authIsLogIn;
