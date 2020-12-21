import React from 'react'
import styles from './tellType.module.css'

class TellType extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isValueExists:false,
            tell:['منزل','محل کار','ثابت'],
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
            <div className="tellType">
                
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'0'} name={this.props.identity+'0'} onChange={this.onChangeHandler}>
                  <option defaultValue="">نوع </option>
                  {this.state.tell.map((number)=><option key={number} value={number}>{number}</option>)}
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
export default TellType;
