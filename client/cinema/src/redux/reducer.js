// write reducer template here
const initialState = {
    // write initial state here
    isAdmin:false,
    view_movies:false,
    view_subscription:false,
    create_subscription:false,
    create_movie:false,
    update_subscription:false,
    update_movie:false,
    delete_subscription:false,
    delete_movie:false,
    selected_member:null,
    selected_movie:null,

    routed:false,

    loggedIn: false,
};

const reducer = (state = initialState, action) => {
    // write reducer here
    switch(action.type){
        case 'SET_IS_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }

        case 'VIEW_MOVIES':
            return {
                ...state,
                view_movies: action.payload
            }
        case 'VIEW_SUBSCRIPTION':
            return {
                ...state,
                view_subscription: action.payload
            }
        
        case 'CREATE_SUBSCRIPTION':
            return {
                ...state,
                create_subscription: action.payload
            }
        case 'UPDATE_SUBSCRIPTION':
            return {
                ...state,
                update_subscription: action.payload
            }
        
        case 'CREATE_MOVIE':
            return {
                ...state,
                create_movie: action.payload
            }

        case 'UPDATE_MOVIE':
            return {
                ...state,
                update_movie: action.payload
            }
        case 'DELETE_SUBSCRIPTION':
            return {
                ...state,
                delete_subscription: action.payload
            }

        case 'DELETE_MOVIE':
            return {
                ...state,
                delete_movie: action.payload
            }
        case 'RESET':
            return initialState

        case 'SELECTED_MEMBER':
            return {
                ...state,
                selected_member: action.payload
            }

        case 'SELECTED_MOVIE':
            return {
                ...state,
                selected_movie: action.payload
            }
        case 'ROUTED':
            return {
                ...state,
                routed: action.payload
            }
            
        
        default:
            return state;
    }
}

export default reducer;