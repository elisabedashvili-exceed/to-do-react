const initialState = {
  items: [],
  numberPerPage: 3,
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  const { items, numberPerPage, currentPage } = state;
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...items,
          {
            value: action.value,
            checked: action.checked,
            _id: action.id,
          },
        ],
        currentPage: Math.ceil((items.length + 1) / numberPerPage),
      };

    case "CHECK_ITEM":
      const checkedItems = items.map((item) =>
        item._id !== action.id ? item : { ...item, checked: !item.checked }
      );
      return {
        ...state,
        items: checkedItems,
      };

    case "EDIT_ITEM":
      const editedItems = items.map((item) =>
        item._id !== action.id ? item : { ...item, value: action.value }
      );
      return {
        ...state,
        items: editedItems,
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: items.filter((item) => item._id !== action.id),
        currentPage:
          items.length % numberPerPage === 1
            ? Math.ceil((items.length - 1) / numberPerPage)
            : currentPage,
      };

    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: currentPage + 1,
      };

    case "PREV_PAGE":
      return {
        ...state,
        currentPage: currentPage - 1,
      };

    case "SELECT_ALL":
      const selectedItems = items.map((item) => ({ ...item, checked: true }));
      return {
        ...state,
        items: selectedItems,
      };

    case "UNSELECT_ALL":
      const unselectedItems = items.map((item) => ({
        ...item,
        checked: false,
      }));
      return {
        ...state,
        items: unselectedItems,
      };

    case "REMOVE_ALL":
      let numberOfPages = Math.ceil(items.length / numberPerPage);
      const checkItems = [];
      items.forEach((item) => {
        if (item.checked) checkItems.push(item);
      });
      return {
        ...state,
        items: items.filter((item) => item.checked === false),
        currentPage:
          items.length % numberPerPage >= 0 &&
          items.length % numberPerPage < numberPerPage &&
          currentPage === numberOfPages
            ? Math.ceil((items.length - checkItems.length) / numberPerPage)
            : currentPage,
      };

    case "GET_ALL":
      return {
        ...state,
        items: action.items,
      };

    default:
      return state;
  }
};
export default reducer;
