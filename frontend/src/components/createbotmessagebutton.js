import React from 'react';
import {Field,reduxForm} from 'redux-form';

import {fetchupdatedconvo,message_selected} from '../actions';
import {connect} from 'react-redux';
class  ButtonForm extends React.Component{

    renderInput=({input,label,type})=>{
        if(label==="subtitle")
        {
            return (
                <div className="ui container" >
           <br/>
           <label className="mini ui icon button" style={{cursor:"initial"}}>{label}</label>
           <textarea rows="5" cols="20" {...input} autoComplete="off" type={type} placeholder='enter subtitle'/>
           
           <br/>
                </div>
                );
        }
        else
        {
            return (
            <div className="ui mini icon input field   ">
            <br/>
    
            <label className="mini ui button" style={{cursor:"initial"}}>{label}</label>
            <input   {...input} autoComplete="off" type={type} placeholder='enter text'/>
            <br/>
            </div>
            );
    }
}
    formSubmit =(formValues) =>{
        var arr=[]

            for (const [ key,value] of Object.entries(formValues)) {
                if(key!=="subtitle")
                {
                arr.push({"text": `${value}`});
                }
              }

            const message={
                "sender":"chatbot",
                "type":"text_with_buttons",
                "payload":{"subtitle":formValues.subtitle,"buttons":arr}
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
                <Field name="subtitle" component={this.renderInput} label="subtitle" type="text" />
                <Field name="button1" component={this.renderInput} label="button1" type="text" />
                <Field name="button2" component={this.renderInput}  label="button2" type="text"/>
                <Field name="button3" component={this.renderInput}  label="button3" type="text"/>
            <button className="ui button positive ">submit</button>
        </form>
        
    );
    }
};
const formwrapped=reduxForm({
    form:'ButtonForm',
 
})(ButtonForm);


 
var mapStateToProps =(state)=>{
    return{
        conv_selected:state.message_selected.conv_selected
    };
}
export default connect(mapStateToProps,{fetchupdatedconvo,message_selected})(formwrapped)



