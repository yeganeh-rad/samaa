import React, { Component } from 'react';


export class Register3 extends Component {
  static displayName = Register3.name;

  constructor(props) {
    super(props);
    this.state = { email: '',
                    address:'',
                    postalCode:'',
                    tell:'',
                    message:''
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

  render() {
    return (
      <div class="row" hidden={this.props.hidden}>
        <div class="col-md-3 col-sm-0 col-0"></div>
        <div class="col-md-6 col-sm-12 col-12">
          <div class="boxer">
            <div class="login-header">
              <img class="logo" src="/image/imageedit.png" alt=""></img>
            </div>
            <div class="login-header-welcome">
              <span>ثبت نام شخص حقوقی</span>
            </div>
            <form>
            <div class="form-group">
                <label>مشخصات تماس را با دقت وارد کنید</label>
                <label>{this.state.message}</label>
            </div>
              <div class="form-group">
                <label for="name">پست الکترونیک</label>
                <input type="email" class="form-control" id="email" name="email" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="form-group">
                <label for="family">آدرس</label>
                <input type="text" class="form-control" id="address" name="address" onChange={this.onChangeHandler} ></input>
              </div>
              
              <div class="form-group">
                <label for="fatherName">کد پستی</label>
                <input type="text" class="form-control" id="postalCode" name="postalCode" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="form-group">
                <label for="birthNumber">شماره تلفن</label>
                <input type="phone" class="form-control" id="tell" name="tell" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="login-signup">
                <a class="go-butt" href="" onClick={this.submitChangeHandler}> ذخیره و تایید مشخصات فردی </a>
              </div>
            </form>
          </div>

        </div>
        <div class="col-md-3 col-sm-0 col-0"></div>
      </div>
        
        
      
    );
  }
}
