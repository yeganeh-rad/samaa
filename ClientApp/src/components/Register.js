import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);
    this.state = {
                      alarm:"-",
                      lockControls:false,
                      isUserValid:false,
                      loading: true,
                      nin:null,
                      name:'',
                      family:'',
                      address:'',
                      postalCode:'',
                      country:'',
                      city:'',
                      towm:'',
                      hiddenAlert:true
                  };
   
  }
  submitChangeHandler= (event)=>{
    let dataToSend = { 
      nin: this.state.nin,
      name:this.state.name,
      family:this.state.family,
      country:this.state.country,
      city:this.state.city,
      address:this.state.address,
      town:this.state.town,
      postalCode:this.state.postalCode
    };
    event.preventDefault();
    fetch('register/savePersonal', {
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
          this.props.getId(data.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  checkingTokenHandler = () => {
    // handling the 6 digit token was sent by SMS.
  }
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  render() {
    return (
      <div class="row"  hidden={this.props.hidden}>
        <div class="col-md-2 col-sm-0 col-0"></div>
        <div class="col-md-8 col-sm-12 col-12">
          <div class="boxer">
            <div class="login-header">
                  <img class="logo" src="/image/imageedit.png" alt=""></img>
                </div>
                <div class="login-header-welcome">
                  <span>ثبت مشخصات متقاضی</span>
                </div>
                <div><img class="imgCenter" src="image/1.png"></img></div>
            <div class="row">
              <div class="col-md-6 leftBorder bottomBorder">
              <div class="form-group">
                <label class="title">مشخصات عمومی</label>
              </div>
              <div class="alert alert-danger" role="alert" hidden={this.state.hiddenAlert}>
                {this.state.alarm}
              </div>
              
              <div class="form-group">
                <label for="name">نام</label>
                <input type="text"  class="form-control" id="name" name="name" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="form-group">
                <label for="family">نام خوانوادگی</label>
                <input type="phone" class="form-control" id="family" name="family" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="form-group">
                <label for="username">کد ملی</label>
                <input type="text" class="form-control" id="username" name="nin" 
                onChange={this.onChangeHandler} disabled={this.state.lockControls}></input>
                
                
              </div>
              
              
            
              </div>
              <div class="col-md-6 bottomBorder">
              <div class="form-group">
                <label class="title">نشانی</label>
              </div>
              <div class="form-group">
                <label for="family">کشور</label>
                <select class="browser-default custom-select " id="country" name="country" onChange={this.onChangeHandler}>
                  <option selected>انتخاب کشور</option>
                  <option value="1">ایران</option>
                  <option value="2">عراق</option>
                  <option value="3">افغانستان</option>
                  <option value="4">ترکیه</option>
                  <option value="5">فرانسه</option>
                  <option value="6">سوریه</option>
                  <option value="7">پاکستان</option>
                </select>
              </div>
              <div class="form-group">
               
                <select class="browser-default custom-select fiftyPercent" id="city" name="city" onChange={this.onChangeHandler}>
                  <option selected>انتخاب استان</option>
                  <option value="1">تهران</option>
                  <option value="2">همدان</option>
                  <option value="4">کرج</option>
                  <option value="5">اهواز</option>
                  <option value="6">اصفهان</option>
                  <option value="7">زنجان</option>
                  <option value="8">کرمان</option>
                </select>
                <select class="browser-default custom-select fiftyPercent" id="town" name="town" onChange={this.onChangeHandler}>
                  <option selected>انتخاب شهر</option>
                  <option value="1">تهران</option>
                  <option value="2">همدان</option>
                  <option value="4">کرج</option>
                  <option value="5">اهواز</option>
                  <option value="6">اصفهان</option>
                  <option value="7">زنجان</option>
                  <option value="8">کرمان</option>
                </select>
              </div>
              <div class="form-group">
                <label for="family">آدرس</label>
                <input type="text" class="form-control" id="address" name="address" onChange={this.onChangeHandler} ></input>
              </div>
              
              
              <div class="form-group">
                <label for="fatherName">کد پستی</label>
                <input type="text" class="form-control" id="postalCode" name="postalCode" onChange={this.onChangeHandler} ></input>
              </div>
              </div>
            </div>        
            
            <div class="login-signup">
                <a class="go-butt" href="" onClick={this.submitChangeHandler}> ذخیره و ادامه ثبت نام</a>
              </div>
              
          </div>

        </div>
        <div class="col-md-2 col-sm-0 col-0"></div>
      </div>
        
        
      
    );
  }
}
