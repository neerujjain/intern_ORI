// import _ from 'lodash'
export default (state={},action)=>{
    switch(action.type) {
        case "UPDATE_BOT_NAME":
            {
            return  {...state,["updation_in_process"]:action.payload};;
            }
            
        default:
            return state;
    }
}