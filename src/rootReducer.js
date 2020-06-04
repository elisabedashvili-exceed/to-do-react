const initialState = {
    hello: 'Vakho123123',
    stateProp: '',
}
//    this function is used to create store
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'action_to_test': 
        return {
            ...state,
            stateProp: action.payload,
        }
        default:
        return state;
    }
}
export default reducer;         