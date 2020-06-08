export const addItems = (value, checked, id) => {
  return {
    type: "ADD_ITEM",
    value,
    checked,
    id,
  };
};

export const checkItem = (id) => {
  return {
    type: "CHECK_ITEM",
    id,
  };
};

export const editItem = (id, value) => {
  return {
    type: "EDIT_ITEM",
    id,
    value,
  };
};

export const deleteItem = (id) => {
  return {
    type: "DELETE_ITEM",
    id,
  };
};

export const selectAll = () => {
  return {
    type: "SELECT_ALL",
  };
};

export const unselectAll = () => {
  return {
    type: "UNSELECT_ALL",
  };
};

export const removeAll = () => {
  return {
    type: "REMOVE_ALL",
  };
};

export const getAll = (items) => {
  return {
    type: "GET_ALL",
    items,
  };
};
