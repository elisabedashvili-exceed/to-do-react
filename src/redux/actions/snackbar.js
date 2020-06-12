import { actionTypes } from "./actionTypes";

export const snackbar = (show, message) => {
  return {
    type: actionTypes.SNACKBAR,
    show,
    message
  };
};