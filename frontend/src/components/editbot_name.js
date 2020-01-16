
import React from 'react';
import {connect} from 'react-redux';
import {fetchBots,fetchConvo,edit_bot_name_action,cancel_bot_action} from '../actions';
import Editbotform from './editbot_nameform'
class Editbot extends React.Component{
    
onSubmit=(formvalues)=>{
    this.props.edit_bot_name_action(formvalues,this.props.bot_selected.id);
  }

render()
{
    var bot_name=this.props.bot_selected.bot_name
    return(<div><Editbotform onsubmit={this.onSubmit} initialValues={{text:bot_name}}  /><button onClick={()=>{this.props.cancel_bot_action()}} >cancel</button></div>)
}

}

const mapStateToProps =(state)=>{
    return{
        botIds: Object.values(state.auth.user.field_bots),
        isSignedIn:state.auth.isSignedIn,
        bots:Object.values(state.bots),
        bot_selected:state.updation_of_bot.updation_in_process
    };
}
export default connect(mapStateToProps,{fetchBots,fetchConvo,edit_bot_name_action,cancel_bot_action})(Editbot);