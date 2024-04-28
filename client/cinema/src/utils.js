
const check_permissions = (permissions,dispatch) => {
    // TODO - Check users permissions based on the permissions array thats 
    // passed to this function
    // update redux state with the users permissions
    // dispatch({type:'SET_IS_ADMIN',payload:isAdmin})
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i] === 'System Admin') {
            dispatch({ type: 'SET_IS_ADMIN', payload: true })
        }
        if (permissions[i] === 'View Movies') {
            dispatch({ type: 'VIEW_MOVIES', payload: true })
        }
        if (permissions[i] === 'View Subscriptions') {
            dispatch({ type: 'VIEW_SUBSCRIPTION', payload: true })
        }
        if (permissions[i] === 'Create Subscriptions') {
            dispatch({ type: 'CREATE_SUBSCRIPTION', payload: true })
        }
        if (permissions[i] === 'Create Movies') {
            dispatch({ type: 'CREATE_MOVIE', payload: true })
        }
        if (permissions[i] === 'Delete Subscriptions') {
            dispatch({ type: 'DELETE_SUBSCRIPTION', payload: true })
        }
        if (permissions[i] === 'Delete Movies') {
            dispatch({ type: 'DELETE_MOVIE', payload: true })
        }
        if (permissions[i] === 'Update Subscriptions') {
            dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: true })
        }
        if (permissions[i] === 'Update Movies') {
            dispatch({ type: 'UPDATE_MOVIE', payload: true })
        }


    }
}

export { check_permissions }