import React from 'react';
import {connect} from 'react-redux';
import {create_user_action,logout_user} from '../actions';
import Createuserform from './createuserform'
class Createuser extends React.Component{
    
onSubmit=(formvalues)=>{
    this.props.create_user_action(formvalues);
  }

render()
{
    return(<div><Createuserform onsubmit={this.onSubmit} /><button onClick={()=>{this.props.logout_user()}} >cancel</button></div>)
}

}

const mapStateToProps =(state)=>{
    return{
        isSignedIn:state.auth.isSignedIn
    };
}
export default connect(mapStateToProps,{create_user_action,logout_user})(Createuser);