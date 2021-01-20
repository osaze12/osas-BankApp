export const initialState = {
        email: '',
        password: '',
        amount:0,
        loggedIn:false
};

export const rootReducer = (state= initialState, action) =>{

    switch(action.type){
        case 'LOGIN':
           return {...state, ...action.payload}
        case 'LOGOUT':
            return {...initialState};
        case 'CREDIT_ACCOUNT':
            //replace the old amount with a new amount
            let newAmount = Object.assign( {}, state, action.payload);
            return newAmount;
        default:
            return state;
            
    }
}
    