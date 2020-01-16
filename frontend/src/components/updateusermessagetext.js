import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  UserTextForm extends React.Component{
    renderInput=({input})=>{
        
        
            const val=this.props.prefilled
            return (
                <div className="ui mini icon input ">
                    <label className="ui header" >textmessage</label>
                    <input {...input} placeholder={val}  />
                </div>)
        
    }
    formSubmit =(formValues) =>{
        const message=
        {
            "sender":"customer",
            "type":"text",
            "text":formValues.text
        }
        this.props.onsubmit(message);
    }
    render(){
        
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
            
        <div className="ui segment">
                <Field name="text" component={this.renderInput}   />
                </div>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.formSubmit)}>submit</button>
        </form>
        
    );
    }
};
export default reduxForm({
    form:'updateuserTextForm',
 
})(UserTextForm);
