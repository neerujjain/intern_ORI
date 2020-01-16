import React from 'react';
import {Field,reduxForm} from 'redux-form';

import {fetchupdatedconvo,message_selected} from '../actions';
import {connect} from 'react-redux';
class  UserTextForm extends React.Component{
    renderInput=({input})=>{
        return (
        <div className="ui header ">
            <label>textmessage</label>
            <input {...input} autoComplete="off"  />
        </div>
        );
       
    }
    formSubmit =(formValues) =>{
        const message=
        {
            "sender":"customer",
            "type":"text",
            "payload":{"text":formValues.text}
        }
        if(this.props.conv_selected!=="none")
        {
          this.props.onsubmit(message,this.props.conv_selected._id);
        }
        else if(this.props.conv_selected==="none")
        {
          
          this.props.onsubmit(message,"none");
        }
    }
    render(){
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
                <Field name="text" component={this.renderInput}  />
            <button className="ui button positive" onClick={this.props.handleSubmit(this.formSubmit)}>submit</button>
        </form>
        
    );
    }
};
const formwrapped=reduxForm({
    form:'UserTextForm',
 
})(UserTextForm);


var mapStateToProps =(state)=>{
    return{
        conv_selected:state.message_selected.conv_selected
    };
}

export default connect(mapStateToProps,{fetchupdatedconvo,message_selected})(formwrapped)

