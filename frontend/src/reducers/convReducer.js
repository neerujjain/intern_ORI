

import _ from 'lodash'

export default (state={},action)=>{
    switch(action.type) {
        case "CONVO_DISPLAY":
            {
            return {...state,..._.mapKeys(action.payload,'_id')};
            }
            case "CONVO_ADD":
            {
            return {...state,[action.payload._id]:action.payload};
            }
            case "BUTTON_INDEX_CHANGE":
            {
            return {...state,[action.payload._id]:action.payload};
            }
            case "UDATE_CONVO":
            {
                state=action.payload
            return state;
            }
            case "DELETE_WHOLE_CONVO":
            {
            return {};
            }


        default:
            return state;
    }
}