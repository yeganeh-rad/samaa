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
                          
                    isValid:false
                   };
    
  }
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  submitChangeHandler= (event)=>{
    event.preventDefault();
    let dataToSend={
                      id:this.props.userId,
                      
                      email:this.state.email,
                      address:this.state.address,
                      postalCode:this.state.postalCode,
                      fatherName:this.state.tell
                    };
    
    fetch('register/saveContact', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.id > 0)
          this.setState({message:'مشخصات شما با موفقیت ثبت گردید'});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
     <div className="registerRequest">
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
                                defaultValue="نوع درخواست"
                                helperMessage=""
                                callback={this.callbackFunction}
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
              ></PersianField>
              <DropDown
                                identity="currency"
                                type="number"//number phone email nin text mobilePhone
                                title="واحد"
                                defaultValue="واحد"
                                helperMessage=""
                                callback={this.callbackFunction}
              ></DropDown>
              <div className="login-signup">
                <a className="go-butt" href="" onClick={this.submitChangeHandler}>  ذخیره درخواست </a>
              </div>
              </div>
         </div>
         <div class="col-md-3"></div>
       </div>

     </div>
    );
  }
}
