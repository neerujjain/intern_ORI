
const INITIAL_STATE={
    isSignedIn:null,
    user:null,
    token:null
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type) {
        case 'SIGN_IN':
            return {...state,isSignedIn:true,user:action.payload.user,token:action.payload.token};
        case 'SIGN_OUT':
            return {...state,isSignedIn:false,user:null,token:null};
        default:
                return state;
    }

};