import React from 'react'
import styles from './location.module.css'

class Location extends React.Component{
    static defaultProps={
        disableValidation:false}
    constructor(props){
        super(props);
        this.state={
            isValueExists:false,
            value:1,
            listData:{
                country:['ایران','ترکیه','عراق'],
                city:['تهران','استانبول','بغداد'],
                provinces:['ازمیر','نجف','کرج'],
            },
            hidden:false,
            disableValidation:this.props.disableValidation,
            [this.props.identity+'0']:1,
            [this.props.identity+'1']:1,
            [this.props.identity+'2']:1
        };
    }
     componentDidMount(){
        this.props.callback(this.props.identity,this.state.disableValidation,''); //register it self in parent
         this.update('-2',
                        '-2');
    }
      onChangeHandler= (event) => {
        this.setState({[event.target.name]:event.target.value});
        if(event.target.name.includes('0')){
            this.update(event.target.value,-1); 
        }
        else if(event.target.name.includes('1')){
            this.update(this.state[this.props.identity+'0'],event.target.value)
        }
        else if(event.target.name.includes('2')){
            this.props.callback(this.props.identity,true,event.target.value);  //return to parent component
            this.state.hidden=true;
        }
    }
    update=async function(url1,url2){
        const response = await fetch("form/countries");
        const data = await response.json();
        const response2 = await fetch('form/provinces/'+url1);
        const data2 = await response2.json();
        const response3 = await fetch('form/cities/'+url2+'/'+url1);
        const data3 = await response3.json();
        console.log(data);
        console.log(data2);
        console.log(data3);
        this.setState(
            {listData:{
                            city:data3,
                            provinces:data2,
                            country:data
                        },
                        value:data3[0].id
                    }
         );
    }
    render(){
        return(
            <div className="Location">
                <label htmlFor={this.props.identity}>{this.props.title}</label>
                <select className="browser-default custom-select max-width-85" id={this.props.identity + '0'} name={this.props.identity + '0'} onChange={this.onChangeHandler}>
                    {this.state.listData.country.map((number) => <option value={number.id} key={number.id}>{number.name}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity + '1'} name={this.props.identity + '1'} onChange={this.onChangeHandler}>
                    {this.state.listData.provinces.map((number) => <option value={number.id} key={number.id}>{number.name}</option>)}
                </select>
                <select className="browser-default custom-select max-width-85" id={this.props.identity + '2'} name={this.props.identity + '2'} onChange={this.onChangeHandler}>
                    <option defaultValue="0">شهر</option>
                    {this.state.listData.city.map((number) => <option value={number.id} key={number.id}>{number.name}</option>)}
                </select>
                <small id={this.props.identity + "help"} className="form-text text-muted">{this.props.helperMessage}</small>
                <div className={styles.errr} role="alert" hidden={this.props.validation || this.state.hidden || this.props.disableValidation}>
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
