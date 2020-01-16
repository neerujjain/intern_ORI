

import _ from 'lodash'
export default (state={},action)=>{
    switch(action.type) {
        case "BOT_LIST":
            {
            return {...state,..._.mapKeys(action.payload,'_id')};
            }
        case "ADD_BOT":
            return {...state,[action.payload.id]:action.payload};
        case "EDIT_BOT":
            {
            return {...state,[action.payload._id]:action.payload};
            }
        case "DELETE_EACH_BOT":
            {
            return {};
            }
        case "DELETE_BOT":
            {
                return _.omit(state,action.payload._id)
            }


        default:
            return state;
    }
}