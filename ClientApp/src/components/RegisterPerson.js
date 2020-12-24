import React, { Component } from 'react';
import PersianField from './persianField/persianfield'
import Gender from './gender/gender'
import DatePicker from './datePicker/datePicker'
import Location from './location/location'
import DropDown from './dropDown/dropDown'
import AddressType from './addressType/addressType'
import Tables from './tables/tables'
import TellType from './tellType/tellType'


export class RegisterPerson extends Component {
    constructor(props) {
    super(props);
    this.state = { 
                    message:'',
                    isValid:true,
                    isPhoneValid:true,
                    isAddressValid:true,
                    phoneTable:[ ],
                    addressTable:[ ],
                    url:'customer/save'

                   };
    
  }
  gatherDataToSend=function(){
    return {            
              personName:this.state.controls.personName.value,
              personFamily:this.state.controls.personFamily.value,
              nin:this.state.controls.nin.value,
              personFather:this.state.controls.personFather.value,
              registrationNumber:this.state.controls.registrationNumber.value,
              dateOfBirth:this.state.controls.dateOfBirth.value,
              LocationOfBirth:this.state.controls.LocationOfBirth.value,
              personGender:this.state.controls.personGender.value,
              personEducation:this.state.controls.personEducation.value,
              bussinessCode:this.state.controls.bussinessCode.value,
              email:this.state.controls.email.value,
              scoringFile:1,
              phones:this.state.phoneTable,
              addresses:this.state.addressTable
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
  addPhone=(event)=>{
    event.preventDefault();
    if(this.state.controls.typeOfTell.valid && this.state.controls.tellNumber.valid)
      this.setState({phoneTable:this.state.phoneTable.concat(
         { id:this.state.phoneTable.length+1,number: this.state.controls.tellNumber.value ,type:this.state.controls.typeOfTell.value}
      )
    });
    else
      this.setState({isPhoneValid:false});
  }
  addAddress=(event)=>{
    event.preventDefault();
    if(this.state.controls.LocationOfaddress.valid && this.state.controls.postalCode.valid
      && this.state.controls.CountryOfAddress.valid && this.state.controls.postalAddress.valid)
      this.setState({addressTable:this.state.addressTable.concat(
        [ { id:this.state.addressTable.length+1,postalCode: this.state.controls.postalCode.value 
          ,desc:this.state.controls.postalAddress.value,type:this.state.controls.LocationOfaddress.value}]
      )
      });
    else
      this.setState({isAddressValid:false})
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
          if (data.statusCode ==200)
            this.setState({message:data.message});
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }else{

    }
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
  callbackFunction = (name, validation, value,label) => {
    this.setState(prevState => (
      {
        controls: {
          ...prevState.controls,
          [name]: {
            value: value, valid: validation,label:label
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
      <div className="row personal-form" hidden={this.props.hidden}>
        <div className="col-md-1 col-sm-0 col-0"></div>
        <div className="col-md-10 col-sm-12 col-12">
          <div className="boxer">
            <div className="login-header">
              <img className="logo" src="/image/imageedit.png" alt=""></img>
            </div>
            <div className="login-header-welcome">
              <span>مشخصات متقاضی</span>
            </div>
            <form>
            
            <div className="row">
              <div className="col-md-6 leftBorder bottomBorder">
              <div className="form-group">
                <label className="title-small">مشخصات عمومی </label>
              </div>
              <PersianField
                                identity="personName"
                                type="text"//phone email nin text mobilePhone
                                title="نام"
                                placeholder=""
                                onErrorMessage="نام را فارسی وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
              <PersianField
                                identity="personFamily"
                                type="text"//phone email nin text mobilePhone
                                title="نام خانوادگی   "
                                placeholder=""
                                onErrorMessage="نام خانوادگی را فارسی وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
              <PersianField
                                identity="nin"
                                type="nin"//phone email nin text mobilePhone
                                title="کد ملی"
                                placeholder="1234567890"
                                onErrorMessage="ده رقم عدد"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
             
              <PersianField
                                identity="personFather"
                                type="text"//phone email nin text mobilePhone
                                title="نام پدر"
                                placeholder=""
                                onErrorMessage="نام را فارسی وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
              <PersianField
                                identity="registrationNumber"
                                type="number"//number phone email nin text mobilePhone
                                title="شماره شناسنامه"
                                placeholder=""
                                onErrorMessage="شماره شناسنامه فقط عدد"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
               <DatePicker
                                identity="dateOfBirth"
                                title="تاریخ تولد"
                                onErrorMessage="تاریخ تولد را انتخاب کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}
              ></DatePicker>
              
              <Location
                                identity="LocationOfBirth"
                                title="محل تولد"
                                onErrorMessage="محل تولد را انتخاب کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/Country"
                                validation={this.state.isValid}
              ></Location>
              <Gender
                                identity="personGender"
                                type="number"//number phone email nin text mobilePhone
                                title="جنسیت"
                                helperMessage=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}
                                onErrorMessage="جنسیت  را انتخاب کنید"
              ></Gender>
              <DropDown
                                identity="personEducation"
                                type="number"//number phone email nin text mobilePhone
                                title="تحصیلات"
                                defaultValue="تحصیلات"
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/educationList"
                                validation={this.state.isValid}
                                onErrorMessage="تحصیلات  را انتخاب کنید"
              ></DropDown>
               <PersianField
                                identity="bussinessCode"
                                type="number"//number phone email nin text mobilePhone
                                title="کد اقتصادی"
                                placeholder=""
                                onErrorMessage="کد اقتصادی را وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
              <PersianField
                                identity="email"
                                type="email"//number phone email nin text mobilePhone
                                title="پست الکترونیک"
                                placeholder="hassan@gmail.com"
                                onErrorMessage="صحیح وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid}

              ></PersianField>
              </div>
              <div className="col-md-6 leftBorder bottomBorder">
                <div className="row ">
                  <div className="col-md-12 ">
                    <div className="form-group">
                      <label className="title-small">نشانی </label>
                    </div>
                      
                        
                        <DropDown
                                identity="LocationOfaddress"
                                type="number"//number phone email nin text mobilePhone
                                title="موقعیت آدرس"
                                defaultValue="موقعیت "
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/addressLocation"
                                validation={this.state.isValid && this.state.isAddressValid}
                                onErrorMessage="موقعیت  را انتخاب کنید"
                         ></DropDown>
                         <PersianField
                                identity="postalCode"
                                type="number"//number phone email nin text mobilePhone
                                title="کد پستی"
                                placeholder="3372343434"
                                onErrorMessage="کد پستی را وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid && this.state.isAddressValid}
                          ></PersianField>
                          <Location
                                identity="CountryOfAddress"
                                title="آدرس"
                                onErrorMessage="آدرس را انتخاب کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                callback={this.callbackFunction}
                                inline="true"
                                url="form/Country"
                                validation={this.state.isValid && this.state.isAddressValid}
                               
                            ></Location>
                             <PersianField
                                identity="postalAddress"
                                type="text"//number phone email nin text mobilePhone
                                title="آدرس"
                                placeholder="خیابان ..کوچه ..."
                                onErrorMessage="آدرس را فارسی وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid && this.state.isAddressValid}
                                
                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.addAddress}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'کدپستی', 'آدرس', 'عملیات']}
                                 tableData={this.state.addressTable}
                                 
                            ></Tables>                         
                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="form-group">
                      <label className="title-small">تلفن </label>
                      </div>
                        <DropDown
                                identity="typeOfTell"
                                type="number"//number phone email nin text mobilePhone
                                title="موقعیت تلفن"
                                defaultValue="موقعیت "
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/phoneLocation"
                                validation={this.state.isValid && this.state.isPhoneValid}
                                onErrorMessage="موقعیت  را انتخاب کنید"
                         ></DropDown>
                        <PersianField
                                identity="tellNumber"
                                type="phone"//number phone email nin text mobilePhone
                                title="تلفن"
                                placeholder="02166554799"
                                onErrorMessage="تلفن را صحیح وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid && this.state.isPhoneValid}
                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.addPhone}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'تلفن', 'موقعیت', 'عملیات']}
                                 tableData={this.state.phoneTable}
                                 url=" "
                                  urlDelete=" "
                            ></Tables> 
                    
                  </div>
                </div>
              </div>
            </div>
              
              <div className="login-signup">
                <a className="go-butt" href="" onClick={this.submitChangeHandler}> ذخیره و تایید مشخصات فردی </a>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-1 col-sm-0 col-0"></div>
      </div>
    );
  }
}
