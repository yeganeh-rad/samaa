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

              ></PersianField>
               <DatePicker
                                identity="dateOfBirth"
                                title="تاریخ تولد"
                                onErrorMessage="تاریخ تولد را انتخاب کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                callback={this.callbackFunction}
              ></DatePicker>
              
              <Location
                                identity="LocationOfBirth"
                                title="محل تولد"
                                onErrorMessage="محل تولد را انتخاب کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/Country"
              ></Location>
              <Gender
                                identity="personGender"
                                type="number"//number phone email nin text mobilePhone
                                title="جنسیت"
                                helperMessage=""
                                callback={this.callbackFunction}
              ></Gender>
              <DropDown
                                identity="personEducation"
                                type="number"//number phone email nin text mobilePhone
                                title="تحصیلات"
                                defaultValue="تحصیلات"
                                helperMessage=""
                                callback={this.callbackFunction}
                                url="form/educationList"
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

                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.submitFinal}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'نام', 'کدملی', 'عملیات']}
                                 
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

                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.submitFinal}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'نام', 'کدملی', 'عملیات']}
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
