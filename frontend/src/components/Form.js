import React from 'react';
import {Field,reduxForm} from 'redux-form';

class  SignInForm extends React.Component{

    renderError({error,touched}){
        if(touched&&error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput=({input,label,type,meta})=>{
        return (
        <div className="field ">
            <label>{label}</label>
            <input {...input} type={type}   />
            {this.renderError(meta)}
        </div>
        );
    }
    formSubmit =(formValues) =>{
        
        this.props.onSubmit(formValues);
    }
    render(){
    return (
        <div className="ui form error">
        <form onSubmit={this.props.handleSubmit(this.formSubmit)}>
            <Field name="name" component={this.renderInput} label="name" type="text" />
            <Field name="password" component={this.renderInput} label="password" type="text"/>
            <button className="ui button primary">submit</button>
        </form>
        </div>
    );
    }

};

const validate=(formValues)=>{
    const errors={};
    if(!formValues.title)
    {
        errors.title='you must enter a title';
    }
    if(!formValues.description)
    {
        errors.description='you must enter a description';
    }
    return errors;
}
export default reduxForm({
    form:'signinForm',
    validate
})(SignInForm);
