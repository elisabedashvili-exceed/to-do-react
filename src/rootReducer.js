const initialState = {
    hello: 'Vakho123123',
    goodBye: '',
    items: [],
    numberPerPage: 3,
    currentPage: 1
}
//    this function is used to create store
const reducer = (state = initialState, action) => {
    const { items, numberPerPage, currentPage } = state;
    switch (action.type) {
        case 'action_to_test': 
            return {
                ...state,
                goodBye: action.payload
            }

        case 'check':  console.log(state)
        break

        case 'ADD_ITEM':  
            return {
                ...state,
                items: [
                    ...items, 
                    {
                        value: action.value,
                        checked: action.checked,
                        id: action.id
                    }
                ],
                currentPage: Math.ceil((items.length + 1) / numberPerPage)
            }

        case 'CHECK_ITEM' :
            const checkedItems = items.map(item =>
                (item.id !== action.id) ? item : { ...item, checked: !item.checked });
            return {
                ...state,
                items: checkedItems
            }

        case 'EDIT_ITEM' :
            const editedItems = items.map(item =>
                (item.id !== action.id) ? item : { ...item, value: action.value });
            return {
                ...state,
                items: editedItems
            }

        case 'DELETE_ITEM' :
            return {
                ...state,
                items: items.filter(item => item.id !== action.id),
                currentPage: items.length % numberPerPage === 1 ? Math.ceil((items.length - 1) / numberPerPage) : currentPage  
            }

        case 'NEXT_PAGE' :
            return {
                ...state,
                currentPage: currentPage + 1
            }

        case 'PREV_PAGE' :
            return {
                ...state,
                currentPage: currentPage - 1
            }

        default:
            return state;
    }
}
export default reducer;