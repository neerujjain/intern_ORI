import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  UserTextForm extends React.Component{
    renderInput=({input})=>{
        
            return (
                <div className="ui mini icon input  ">
                    <label className="ui header" >textmessage</label>
                    <input {...input}   />
                </div>)
        
    }
    formSubmit =(formValues) =>{
        const message=
        {
            "sender":"chatbot",
            "type":"text",
            "text":formValues.text
        }
        this.props.onsubmit(message);
    }
    render(){
        
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
            <div className="ui segment">
                <Field name="text" component={this.renderInput}  />
                </div>
            <button className="ui button positive" onClick={this.props.handleSubmit(this.formSubmit)}>submit</button>
        </form>
        
    );
    }
};
export default reduxForm({
    form:'updatebotTextForm',
 
})(UserTextForm);

// const formwrapped=reduxForm({
//     form:'editbotnameForm',
 
// })(EditbotnameForm);

// export default connect(null,{EditbotnameForm})(formwrapped)



