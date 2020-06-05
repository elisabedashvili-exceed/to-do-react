export const testAction = (payload, helloText) => {
    return {
        type: 'action_to_test',
        payload: payload,
        helloText: helloText
    }
}

export const checkAction = () => {
    return {
        type: 'check'
    }
}