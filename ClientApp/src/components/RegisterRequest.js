import React, { Component } from 'react';
import PersianField from './persianField/persianfield'
import Gender from './gender/gender'
import DatePicker from './datePicker/datePicker'
import Location from './location/location'
import DropDown from './dropDown/dropDown'
import AddressType from './addressType/addressType'
import Tables from './tables/tables'
import TellType from './tellType/tellType'


export class RegisterRequest extends Component {
    constructor(props) {
    super(props);
    this.state = { 
                    message:'',
                    isValid:true,
                    controls:{},
                    url:'request/save'
                   };
    
  }
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  gatherDataToSend=function(){
    return {            
              value:this.state.controls.fee.value,
              requestType:this.state.controls.requestType.value,
              currency:this.state.controls.currency.value,
              scoringFile:1
            };
  }
  checkValidationOfForm=function(){
    var valid=true;
    Object.entries(this.state.controls)
    .map(item=>{
      valid = valid && item[1].valid;
    });
    this.setState({isValid:valid});
    return valid
  }
  submitChangeHandler= (event)=>{
    event.preventDefault();
    if(this.checkValidationOfForm()){
      fetch(this.state.url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.gatherDataToSend()),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.statusCode ==200){
            this.setState({message:data.message});
            this.props.back();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        
    }else{

    }
  }
  back=(event)=>{
    event.preventDefault();
    this.props.back();
  }
  callbackFunction = (name, validation, value) => {
    this.setState(prevState => (
      {
        controls: {
          ...prevState.controls,
          [name]: {
            value: value, valid: validation
          }
        }
      })
    );
  }
  checkValidation=()=>{
    Object.keys(this.state.controls).map(function(key,index){
      console.log(key + ' : '+index );
      this.setState({isValid: this.state.isValid & this.state.controls[key].valid});
    });
  }

  render() {
    return (
     <div className="registerRequest" hidden={this.props.hidden}>
       <div class="row">
         <div class="col-md-3"></div>
         <div class="col-md-6" >
         <div className="boxer">
            <div className="login-header">
              <img className="logo" src="/image/imageedit.png" alt=""></img>
            </div>
            <div className="login-header-welcome">
              <span>ثبت درخواست</span>
            </div>
              <DropDown
                                identity="requestType"
                                type="number"//number phone email nin text mobilePhone
                                title="نوع درخواست"
                                defaultValue=" درخواست"
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/requestType"
                                validation={this.state.isValid}
                                onErrorMessage="یک گزینه را انتخاب کنید"
              ></DropDown>
              <PersianField
                                identity="fee"
                                type="number"//phone email nin text mobilePhone
                                title="مبلغ درخواستی"
                                placeholder=""
                                onErrorMessage="مبلغ را عدد وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}
              ></PersianField>
              <DropDown
                                identity="currency"
                                type="number"//number phone email nin text mobilePhone
                                title="واحد"
                                defaultValue="واحد"
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/currency"
                                validation={this.state.isValid}
                                onErrorMessage="یک گزینه را انتخاب کنید"
              ></DropDown>
              
              <div className="row topBorder">
                <div className="col-md-6">
                  <div className="login-signup">
                    <a className="go-butt" href="" onClick={this.submitChangeHandler}><i className="far fa-save"></i>ارسال به بانک </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="login-signup">
                    <a className="go-butt" href="" onClick={this.back}> <i className="fas fa-external-link-alt"></i>خروج </a>
                  </div>
                </div>
              </div>
              </div>
         </div>
         <div class="col-md-3"></div>
       </div>

     </div>
    );
  }
}
