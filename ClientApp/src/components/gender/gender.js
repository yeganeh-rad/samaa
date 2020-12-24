import React from 'react'
import styles from './gender.module.css'

class Gender extends React.Component{
    constructor(props){
        super(props);
        this.state={
            [this.props.identity]:' ',
            isValueExists:false,
            hidden:false
        };
        
    }
    componentDidMount(){
        this.props.callback(this.props.identity,false,''); //register it self in parent
    }
      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        this.setState({isValueExists:(event.target.value.length>0)});
        this.setState({hidden:(event.target.value.length>0)});
        this.props.callback(this.props.identity,event.target.value.length>0,event.target.value);//return to parent component
      }

    render(){
        return(
            <div className="gender">
                
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={this.props.identity} id={this.props.identity+'1'} onChange={this.onChangeHandler} value="1"></input>
                <label className={styles.formchecklabel} htmlFor={this.props.identity+'1'}>مرد</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={this.props.identity} id={this.props.identity+'0'} onChange={this.onChangeHandler} value="0"></input>
                <label className={styles.formchecklabel} htmlFor={this.props.identity+'0'}>زن</label>
                </div>
                
                <small id={this.props.identity+"help"}  className="form-text text-muted">{this.props.helperMessage}</small>
                <div className={styles.errr} role="alert" hidden={this.state.hidden || this.props.validation}>
                    {this.props.onErrorMessage}
                </div>
                <div className={styles.recover} role="recover" hidden={(!this.state.hidden || !this.state.isValueExists)}>
                    {this.props.onRecoveryMessage}
                </div>
            </div>
        )
    }
    
}
export default Gender;
