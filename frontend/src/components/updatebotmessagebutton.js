import React from 'react';
import {Field,reduxForm} from 'redux-form';
class  ButtonForm extends React.Component{

    renderInput=({input,label,button})=>{
        // if(button===undefined)
        // {
            if(label==="subtitle")
            {
            return (
            <div className="ui mini icon input ">
            <br/>
            <label className="ui header">{label}</label>
            <textarea  rows="5" cols="20" {...input} autoComplete="off"  />
            <br/>
            </div>
            );
            }
            else
            {
                return (
                    <div className="ui mini icon input ">
                    <br/>
                    <label className="ui header">{label}</label>
                    <input  {...input} autoComplete="off"  />
                    <br/>
                    </div>
                    );

            }
        // }
        // else 
        // {
        //     if(label==="subtitle")
        //     {
        //     return (
        //     <div className="ui mini icon input ">
        //     <br/>
        //     <label className="ui header">{label}</label>
        //     <textarea  rows="5" cols="20" {...input} autoComplete="off"  />
        //     <br/>
        //     </div>
        //     );
        //     }
        //     else
        //     {
        //         return (
        //             <div className="ui mini icon input ">
        //             <br/>
        //             <label className="ui header">{label}</label>
        //             <input  {...input} autoComplete="off"  />
        //             <br/>
        //             </div>
        //             );

        //     }

        //     return (
        //         <div className="field ">
        //    <br/>
           
        //    <label>{label}</label>
        //    <input  {...input}  />
        //    <br/>
        //         </div>
        //         );
        // }

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
                "subtitle":formValues.subtitle,
                "buttons":arr
              }
        this.props.onsubmit(message);
    }
    render(){
    return (
        <form onSubmit={this.props.handleSubmit(this.formSubmit)} >
            <div className="ui segment">
                <Field name="subtitle" component={this.renderInput} label="subtitle"   />
                <Field name="button1" component={this.renderInput} label="button1"   />
                <Field name="button2" component={this.renderInput}  label="button2" />
                <Field name="button3" component={this.renderInput}  label="button3"  />
            </div>
            <button className="ui button positive">submit</button>
        </form>
        
    );
    }
};
export default reduxForm({
    form:'updatebotButtonForm',
 
})(ButtonForm);
