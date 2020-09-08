import { combineReducers } from "redux";
import auth from "./auth";
import boards from "./boards";
import board from "./board";
import theme from "./theme";

export default combineReducers({ auth, boards, board, theme });