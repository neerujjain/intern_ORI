import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  EditbotnameForm extends React.Component{
    // }
    renderInput=({input})=>{
        
        
            return (
                <div className="field ">
                    <label>textmessage</label>
                    <input {...input} type="text" autoComplete="off"  />
                </div>)
        
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
    form:'editbotnameForm',
 
})(EditbotnameForm);




