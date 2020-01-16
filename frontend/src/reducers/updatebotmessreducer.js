// import _ from 'lodash'
export default (state={},action)=>{
    switch(action.type) {
        case "UPDATE_BOT_TYPE":
            {
            return  {...state,["update_bot_type"]:action.payload};;
            }
            
        default:
            return state;
    }
}