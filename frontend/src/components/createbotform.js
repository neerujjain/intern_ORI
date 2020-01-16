import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  CreatebotForm extends React.Component{
    renderInput=({input})=>{
        return (
        <div className="field ">
            <label>botname</label>
            <input {...input} autoComplete="off" placeholder="enter bot name"  />
        </div>
        );
       
    }
    formSubmit =(formValues) =>{
        const message=
        {
            "bot_name":formValues.text
        }
        this.props.onsubmit(message);
    }
    render(){
        
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
                <Field name="text" component={this.renderInput}  />
            <button className="ui button primary" onClick={this.props.handleSubmit(this.formSubmit)}>submit</button>
        </form>
        
    );
    }
};
export default reduxForm({
    form:'CreatebotForm',
 
})(CreatebotForm);
