// import _ from 'lodash'
export default (state={},action)=>{
    switch(action.type) {
        case "SELECT_MESSAGE":
            {
            return  {...state,["conv_selected"]:action.payload};;
            }

        default:
            return state;
    }
}