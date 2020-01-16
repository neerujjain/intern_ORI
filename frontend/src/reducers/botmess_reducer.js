// import _ from 'lodash'
export default (state={},action)=>{
    switch(action.type) {
        case "BOT_TYPE":
            {
            return  {...state,["bot_type"]:action.payload};;
            }
            

        default:
            return state;
    }
}