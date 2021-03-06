import React from 'react'
import styles from './addressType.module.css'

class AddressType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isValueExists:false,
            address:['خدماتی','تجاری','مسکونی'],
            hidden:true
        };
    }
    componentDidMount(){
        this.props.callback(this.props.identity,false,''); //register it self in parent
    }
      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        this.props.callback(this.props.identity,(event.target.value.length>0),event.target.value);  //return to parent component
    }
    render(){
        return(
            <div className="AddressType">
                
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                
                <select className="browser-default custom-select max-width-110" id={this.props.identity+'0'} name={this.props.identity+'0'} onChange={this.onChangeHandler}>
                  <option defaultValue="">آدرس </option>
                  {this.state.address.map((number)=><option value={number} key={number}>{number}</option>)}
                </select>
                                
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
export default AddressType;
