export const addItems = (value, checked, id) => {
    return {
        type: 'ADD_ITEM',
        value,
        checked,
        id
    }
}

export const checkItem = (id) => {
    return {
        type: 'CHECK_ITEM',
        id
    }
}

export const editItem = (id, value) => {
    return {
        type: 'EDIT_ITEM',
        id,
        value
    }
}

export const deleteItem = (id) => {
    return {
        type: 'DELETE_ITEM',
        id
    }
}