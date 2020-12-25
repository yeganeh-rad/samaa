import React, { Component } from 'react';
import PersianField from './persianField/persianfield'
import Gender from './gender/gender'
import DatePicker from './datePicker/datePicker'
import Location from './location/location'
import DropDown from './dropDown/dropDown'
import AddressType from './addressType/addressType'
import Tables from './tables/tables'
import TellType from './tellType/tellType'
import Modal from './modal/modal';


export class RegisterPerson extends Component {
  static defaultProps={
                          urlEdit:" "}
    constructor(props) {
    super(props);
    this.state = { 
                    message:'',
                    isValid:true,
                    isPhoneValid:true,
                    isAddressValid:true,
                    phoneTable:[ ],
                    addressTable:[ ],
                    url:'customer/save',
                    urlEdit:this.props.urlEdit,
                    editData:{
                     id:-1
                  }
    }
    
  }
    componentDidMount() {
    console.log('mount...'+this.state.editData.id);
    if(this.props.editId > 0) {
       fetch(this.props.urlEdit+'/'+this.props.editId)
      .then(response => response.json())
      .then(data => this.setState({ editData: data,
      
        controls:
        {
          "personName":{"value":data.personName,"valid":true},
          "personFamily":{"value":data.personFamily,"valid":true},
          "nin":{"value":data.nin,"valid":true},
          "personFather":{"value":data.personFather,"valid":true},
          "registrationNumber":{"value":data.registrationNumber,"valid":true},
          "dateOfBirth":{"value":data.dateOfBirth,"valid":true},
          "LocationOfBirth":{"value":data.locationOfBirth,"valid":true},
          "personGender":{"value":data.personGender,"valid":true},
          "personEducation":{"value":data.personEducation,"valid":true},
          "bussinessCode":{"value":data.bussinessCode,"valid":true},
          "email":{"value":data.email,"valid":true},
          "LocationOfaddress":{"value":0,"valid":true},
          "postalCode":{"value":0,"valid":true},
          "CountryOfAddress":{"value":0,"valid":true},
          "postalAddress":{"value":0,"valid":true},
          "typeOfTell":{"value":0,"valid":true},
          "tellNumber":{"value":0,"valid":true}
        },phoneTable:data.phones,addressTable:data.addresses
      
      }));
 }
}
getPerson=(event)=>{
  event.preventDefault();
  if(this.state.urlEdit != " ") {
    fetch(this.props.urlEdit+'/'+this.props.editId)
    .then(response => response.json())
    .then(data => this.setState({ editData: data }));
    console.log(this.state.editData);
}

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
              addresses:this.state.addressTable,
              id:this.props.editId
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
      console.log('validate');
      console.log(this.gatherDataToSend());
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
            {this.setState({message:data.message});
            this.props.back();}
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
  onRemoveFromPhoneTable=(phoneId)=>{
    var i=0
    for(i=0;i<this.state.phoneTable.length;i++){
      if(this.state.phoneTable[i].id == phoneId){
         break;
      }
    }
    this.state.phoneTable.splice(i,1);
  }
  onRemoveFromAddressTable=(addressId)=>{
    var i1=0
    //TODO:use find instead of for
    for(i1=0;i1<this.state.addressTable.length;i1++){
      if(this.state.addressTable[i1].id == addressId){
         break;
      }
    }
    this.state.addressTable.splice(i1,1);
  
  }
  onChangeHandler= (event) => {
    this.setState({[event.target.name]:event.target.value});
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
                                editName={this.state.editData.personName}                  

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
                                editName={this.state.editData.personFamily}

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
                                editName={this.state.editData.nin}
                                maxLength="10"

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
                                editName={this.state.editData.personFather}

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
                                editName={this.state.editData.registrationNumber}
                                maxLength="10"
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
                                editName={this.state.editData.bussinessCode}

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
                                editName={this.state.editData.email}

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
                                disableValidation="true"
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
                                disableValidation="true"
                                maxLength="10"
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
                                disableValidation="true"
                            ></Location>
                             <PersianField
                                identity="postalAddress"
                                type="textAndNumber"//number phone email nin text mobilePhone
                                title="آدرس"
                                placeholder="خیابان ..کوچه ..."
                                onErrorMessage="آدرس را فارسی وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid && this.state.isAddressValid}
                                disableValidation="true"
                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.addAddress}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'کدپستی', 'آدرس', 'عملیات']}
                                 tableData={this.state.addressTable}
                                 typeRemover="true"
                                 onRemove={this.onRemoveFromAddressTable}
                                 removable="true"
                                 scroll="true"
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
                                disableValidation="true"
                         ></DropDown>
                        <PersianField
                                identity="tellNumber"
                                type="allPhone"//number phone email nin text mobilePhone
                                title="تلفن"
                                placeholder="02166554799"
                                onErrorMessage="تلفن را صحیح وارد کنید"
                                onRecoveryMessage="" 
                                helperMessage=""
                                regex=""
                                callback={this.callbackFunction}
                                validation={this.state.isValid && this.state.isPhoneValid}
                                disableValidation="true"
                                maxLength="11"
                          ></PersianField>
                           <div className="add-butt-holder">
                               < a className="add-butt" href="" onClick={this.addPhone}> <i className="far fa-plus-square"></i>اضافه شود </a>
                            </div>
                            <Tables
                                 headers={['ردیف', 'تلفن', 'عملیات']}
                                 tableData={this.state.phoneTable}
                                  url=" "
                                  urlDelete=" "
                                  typeRemover="true"
                                  onRemove={this.onRemoveFromPhoneTable}
                                 removable="true"
                                 scroll="true"
                            ></Tables> 
                    
                  </div>
                </div>
              </div>
            </div>
              <div class="row topBorder">
                
                <div class="col-md-1"></div>
                <div class="col-md-5">
                  <div className="login-signup">
                    <a className="go-butt" href="" onClick={this.submitChangeHandler}> <i className="far fa-save"></i>ذخیره و تایید مشخصات فردی </a>
                    
                  </div>
                </div>
                <div class="col-md-3">
                  <div className="login-signup">
                    <a className="go-butt" href="" onClick={this.back}> <i className="fas fa-external-link-alt"></i>بازگشت  </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-1 col-sm-0 col-0"></div>
        
      </div>
    );
  }
}
