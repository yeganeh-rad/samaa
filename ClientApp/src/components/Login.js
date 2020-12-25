import React, { Component } from 'react';
// login frame
export class Login extends Component {
  static displayName = Login.name;
  constructor(probs) {
    super(probs);
    //get the current location
    console.log("herer");
    console.log(this.props.location);
    this.state = {
      loginURL: 'person/login', username: '', password: '', usernames: {
        "id": 0,
        "username": '',
        "password": '',
        "user": null
      }
    }
  };
  componentDidUpdate() {
    console.log("triggerd");
  }
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  submitChangeHandler = (event) => {
    event.preventDefault();
    const data = this.state.usernames;
    data.username = this.state.username;
    data.password = this.state.password;
    fetch(this.state.loginURL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.state.usernames.id = data.id;
        this.state.usernames.username = data.username;
        if (data.id > 0)
          this.props.history.push('/fetch-data');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  gotoRegister=(event)=>{
  }
  render() {
    return (
      <div class="row">
        <div class="col-md-3 col-sm-0 col-0"></div>
        <div class="col-md-5 col-sm-12 col-12">
          <div class="center">
            <div class="login-header">
              <img class="logo" src="/image/imageedit.png"></img>

            </div>
            <div class="login-header-welcome"><span>به سامانه اعتبار سنجی سما خوش آمدید</span></div>
            <div class="login-signup">
              <a class="go-butt" href="/registerer" onClick={this.gotoRegister}>ثبت نام شخص حقیقی</a>
            </div>

            <div class="login-header-welcome">
              <span>ورود کاربران سامانه سما</span>
            </div>
            <div class="login-form">
              <form onSubmit={this.submitChangeHandler}>
                <div class="controls">
                  <div class="form-label"><span>نام کاربری </span></div>
                  <input name="username" type="text" onChange={this.onChangeHandler}></input>
                </div>
                <div class="controls">
                  <div class="form-label"><span>کلمه عبور</span></div>
                  <input name="password" type="text" onChange={this.onChangeHandler}></input>
                </div>
                <div class="login-signup">
                  <a class="go-butt" href="" onClick={this.submitChangeHandler}> ورود به سامانه سما</a>
                </div>
                <div class="form-label">
                  <span></span>
                </div>
              </form>
            </div>

          </div>
        </div>
        <div class="col-md-4 col-sm-0 col-0"></div>
      </div>
    );
  }
}
