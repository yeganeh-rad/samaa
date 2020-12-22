import React from 'react'
import styles from './persianfield.module.css'

class Persianfield extends React.Component{
    constructor(props){
        super(props);
        this.state={
                        hidden:true,
                        [this.props.identity]:' ',
                        isValueExists:false
        };
        
    }
    componentDidMount(){
        this.props.callback(this.props.identity,false,'-'); //register it self in parent
    }
    
    selectTypeOfRegex=()=>{
        switch (this.props.type) {
            case 'text':
                return /^[\u0600-\u06FF\u08A0-\u08FF\s]+$/i

            case 'number':
                return /^\d+$/ // find none digit

            case 'nin':
                return /^\d{10}$/ // find nin digit

            case 'mobilePhone':
                return /^\s*[0][9]\d{9}$/ // mobile number like 09183134346

            case 'phone':
                return /^\s*[0][1-8]\d{9}$/ // phone number like 09183134346
                
            case 'email':
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ //email keremlin@yahoo.com

            default://text
                return /^[\u0600-\u06FF\u08A0-\u08FF\s]+$/i

        }
    }

    fieldValidation = function (values){
        let result=(new RegExp(this.selectTypeOfRegex())).test(values);
        this.setState({
            hidden : result
            });
        return result;
      }

      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        this.setState({isValueExists:(event.target.value.length>0)})
        this.props.callback(this.props.identity,this.fieldValidation(event.target.value),event.target.value);//return to parent component
      }

    render(){
        return(
            <div className="persianField">
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                {
                this.state.isValueExists
                    ? <div className={this.state.hidden ? styles.valid : styles.invalid}>
                        <input class="form-control inlineinput"  name={this.props.identity} id={this.props.identity} onChange={this.onChangeHandler} type="text" aria-describedby={this.props.identity+"help"} placeholder={this.props.placeholder}></input>
                        </div>
                    : <div className={styles.edit}>
                            <input className="form-control inlineinput"  name={this.props.identity} id={this.props.identity} onChange={this.onChangeHandler} type="text" aria-describedby={this.props.identity+"help"} placeholder={this.props.placeholder}></input>
                        </div>
                }
                
                    
                <small id={this.props.identity+"help"}  className="form-text text-muted">{this.props.helperMessage}</small>
                <div className={styles.errr} role="alert" hidden={this.state.hidden}>
                    {this.props.onErrorMessage}
                </div>
                <div className={styles.recover} role="recover" hidden={(!this.state.hidden || !this.state.isValueExists)}>
                    {this.props.onRecoveryMessage}
                </div>
            </div>
        )
    }
    
}
export default Persianfield;
