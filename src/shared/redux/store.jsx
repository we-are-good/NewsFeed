import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authIsLogIn from "./authIsLogIn";

const persistConfigReducer1 = {
  key: "authIsLogIn",
  storage
};

export const rootReducer = combineReducers({
  authIsLogIn
});

export default persistReducer(persistConfigReducer1, rootReducer);
