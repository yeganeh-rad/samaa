import React from 'react'
import styles from './location.module.css'

class Location extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isValueExists:false,
            country:['ایران','ترکیه','عراق'],
            city:['تهران','استانبول','بغداد'],
            town:['ازمیر','نجف','کرج'],
            hidden:true
            
        };
        
    }
    componentDidMount(){
        this.props.callback(this.props.identity,false,''); //register it self in parent
    }
      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        this.props.callback(this.props.identity,false,1);  //return to parent component
    }
    

    render(){
        return(
            <div className="Location">
                
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'0'} name={this.props.identity+'0'} onChange={this.onChangeHandler}>
                  <option defaultValue="1399">کشور </option>
                  {this.state.country.map((number)=><option value={number}  key={number}>{number}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'1'} name={this.props.identity+'1'} onChange={this.onChangeHandler}>
                  <option defaultValue="12">استان</option>
                  {this.state.city.map((number)=><option value={number}  key={number}>{number}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'2'} name={this.props.identity+'2'} onChange={this.onChangeHandler}>
                  <option defaultValue="29">شهر </option>
                  {this.state.town.map((number)=><option value={number}  key={number}>{number}</option>)}
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
export default Location;
