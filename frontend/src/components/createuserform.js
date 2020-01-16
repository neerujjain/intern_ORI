import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  CreateuserForm extends React.Component{
    
    renderError({error,touched}){
        if(touched&&error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput=({title,label,input,meta})=>{
        return (
        <div className="field ">
            <label>{title}</label>
            <input {...input} autoComplete="off" placeholder={label} />
            {this.renderError(meta)}
        </div>
        );
       
    }
    formSubmit =(formValues) =>{
        const message=
        {
            "name":formValues.username,
            "password":formValues.password
        }
        this.props.onsubmit(message);
    }
    render(){
        
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
                <Field name="username" component={this.renderInput} label="enter user name" title="name" />
                <Field name="password" component={this.renderInput} label="enter password" title="password" />
                <Field name="password2" component={this.renderInput} label=" password" title="confirm password"/>
            <button className="ui button primary" onClick={this.props.handleSubmit(this.formSubmit)}>submit</button>
        </form>
        
    );
    }
};

const validate=(formValues)=>{
    const errors={};
    if(formValues.password!==formValues.password2)
    {
        errors.password="passwords do not match"
    }
    return errors;
}
export default reduxForm({
    form:'CreateuserForm',
 validate
})(CreateuserForm);
