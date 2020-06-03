import { combineReducers } from "redux";
import auth from "./auth";
import boards from "./boards";
import board from "./board";

export default combineReducers({ auth, boards, board });