import { actionTypes } from "./actionTypes";

export const addItems = (value, checked, id) => {
  return {
    type: actionTypes.ADD_ITEM,
    value,
    checked,
    id,
  };
};

export const checkItem = (id) => {
  return {
    type: actionTypes.CHECK_ITEM,
    id,
  };
};

export const editItem = (id, value) => {
  return {
    type: actionTypes.EDIT_ITEM,
    id,
    value,
  };
};

export const deleteItem = (id) => {
  return {
    type: actionTypes.DELETE_ITEM,
    id,
  };
};

export const selectAll = () => {
  return {
    type: actionTypes.SELECT_ALL,
  };
};

export const unselectAll = () => {
  return {
    type: actionTypes.UNSELECT_ALL,
  };
};

export const removeAll = () => {
  return {
    type: actionTypes.REMOVE_ALL,
  };
};

export const getAll = (items) => {
  return {
    type: actionTypes.GET_ALL,
    items,
  };
};
