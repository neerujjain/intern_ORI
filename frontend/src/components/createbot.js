import React from 'react';
import {connect} from 'react-redux';
import {fetchBots,fetchConvo,create_bot,cancel_bot_action} from '../actions';
import Createbotform from './createbotform'
class Createbot extends React.Component{
    
    

onSubmit=(formvalues)=>{
    this.props.create_bot(formvalues);
  }

render()
{
    return(<div><Createbotform onsubmit={this.onSubmit} /><button onClick={()=>{this.props.cancel_bot_action()}} >cancel</button></div>)
}

}

const mapStateToProps =(state)=>{
    return{
        botIds: Object.values(state.auth.user.field_bots),
        isSignedIn:state.auth.isSignedIn,
        bots:Object.values(state.bots)
    };
}
export default connect(mapStateToProps,{fetchBots,fetchConvo,create_bot,cancel_bot_action})(Createbot);


// export const update_user = () => async (dispatch, getState) => {
    
//     const token=localStorage.getItem('token')
//     console.log(token)
//     const response = await base.get('http://localhost:3001/user/me',{
        
//         headers: {'Authorization': "Bearer " + token}
//     });
//     console.log(response.data)
//     await dispatch({ type: 'UPDATE_USER', payload: response.data })
//     // localStorage.setItem("token",response.data.token)
//     //  history.push('/bot-list')
     
// };
