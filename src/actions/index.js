export const getTaskDetails = (data) => {
    return {
        type: 'TASK_DETAILS',
        payload: data
    }
}

export const addTask = (data) => {
    return {
        type: 'ADD_TASK',
        item: data
    }
}

export const removeTask = (data) => {
    return {
        type: 'REMOVE_TASK',
        item: data
    }
}

export const editTask = (data) => {
    return {
        type: 'EDIT_TASK',
        item: data
    }
}