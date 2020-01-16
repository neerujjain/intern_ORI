import React from 'react';
import {connect} from 'react-redux';
import Form from './Form'
import {signInUser,link_to_create_user_action,cleanauth} from '../actions';
class SignIn extends React.Component{
    componentDidMount()
    {
        this.props.cleanauth()
    }
    link_to_create_user()
    {
        this.props.link_to_create_user_action()
    }
    onSubmit=(formValues)=>{
        
        this.props.signInUser(formValues);
    }
    render(){
        
        return (
            <div className="ui form error">
            <div><h3>sign in</h3><button onClick={()=>{this.link_to_create_user()}}>not a user?<br />sign up</button>
            <Form onSubmit={this.onSubmit}/>
            </div>
            </div>
        );
        }
    
    
}
export default connect(null,{signInUser,link_to_create_user_action,cleanauth})(SignIn);