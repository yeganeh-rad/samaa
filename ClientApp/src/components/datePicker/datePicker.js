import React from 'react'
import styles from './datePicker.module.css'

class DatePicker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isValueExists:false,
            years:this.createYears(1300,1400),
            month:this.createYears(1,12),
            day:this.createDays(1),
            hidden:false
        };
        
    }
    componentDidMount(){
        this.props.callback(this.props.identity,false,'-'); //register it self in parent
    }
      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        if(event.target.name.includes('1')) this.setState({day:this.createDays(event.target.value)});
        let finalDate=this.getValue(event.target.name,event.target.value)
        this.props.callback(this.props.identity,!isNaN(finalDate),finalDate); 
        if(isNaN(finalDate)){this.state.hidden=false;}else{this.state.hidden=true;} //return to parent component
    }
    getValue=function(item,value){
        if(item.includes('0'))
            return value+this.state[this.props.identity+'1']+this.state[this.props.identity+'2']; 
        else if(item.includes('1'))
            return this.state[this.props.identity+'0']+value+this.state[this.props.identity+'2'];
        else
            return this.state[this.props.identity+'0']+this.state[this.props.identity+'1']+value;
    }

    createYears=function(min,max){
        let year=[]
        for (let i=min;i<=max;i++)
            year.push(i);
        return year;
    }
    createDays=function(month){
        let monthMap=[31,31,31,31,31,31,30,30,30,30,30,29];
        return this.createYears(1,monthMap[month-1]);
    }

    render(){
        return(
            <div className="datePickers">
                <div className={styles.firstDiv}>
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                </div>
                <div className={styles.secondDiv}>
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'0'} name={this.props.identity+'0'} onChange={this.onChangeHandler}>
                <option defaultValue="0">سال</option>
                  {this.state.years.map((number)=><option value={number} key={number}>{number}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'1'} name={this.props.identity+'1'} onChange={this.onChangeHandler}>
                <option defaultValue="0">ماه</option>
                  {this.state.month.map((number)=><option value={number}  key={number}>{number}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity+'2'} name={this.props.identity+'2'} onChange={this.onChangeHandler}>
                <option defaultValue="0">روز</option>
                  {this.state.day.map((number)=><option value={number}  key={number}>{number}</option>)}
                </select>
                </div>
                <small id={this.props.identity+"help"}  className="form-text text-muted">{this.props.helperMessage}</small>
                <div className={styles.errr} role="alert" hidden={this.state.hidden|| this.props.validation}>
                    {this.props.onErrorMessage}
                </div>
                <div className={styles.recover} role="recover" hidden={(!this.state.hidden || !this.state.isValueExists)}>
                    {this.props.onRecoveryMessage}
                </div>
            </div>
        )
    }
    
}
export default DatePicker;
