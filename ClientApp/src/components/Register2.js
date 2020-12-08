import React, { Component } from 'react';

export class Register2 extends Component {
  static displayName = Register2.name;

  constructor(props) {
    super(props);
    this.state = { 
                    money:0,
                    description:'',
                    requestDate:990122,
                    documentDate:990313,
                    requests: [],
                     loading: true ,
                     registrationID:0,
                     finalHidden:0,
                     finalHidden2:1,
                     imgName:'image/2.png'
                  };
  }
  componentDidMount() {
    //this.populateRequests();
  }
  
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  previousePage= (event)=>{
    event.preventDefault();
    this.props.previousePage(0);
  }
  submitFinal= (event)=>{
    event.preventDefault();
    this.finalRegister();  
    }
      async finalRegister() {
      const response = await fetch('register/registrationFinal/'+this.props.userId);
      const data = await response.json();
      console.log(data);
      this.setState({registrationID : data.registrationID,finalHidden:1,finalHidden2:0,imgName:'image/3.png'})
    }

  submitChangeHandler= (event)=>{
    event.preventDefault();
    let dataToSend={
                      id:this.props.userId,
                      description:this.state.description,
                      monwyRequested:this.state.money,
                      documentDate:this.state.documentDate,
                      requestDate:this.state.requestDate
                    };
    
    fetch('register/saveRequest', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.id > 0){
          //this.props.getId(data.id);
          this.populateRequests();
        }
          
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  static renderRequestsTable(requests) {
    console.log(requests);
    return (
      
                <tbody>
                  {requests.map(request =>
                    <tr key={request.id}>
                      <td>{request.description}</td>
                      <td>{request.monwyRequested}</td>
                      <td><a href="#">ویرایش</a><span> - </span><a href="#">حذف</a></td>
                      
                    </tr>
                  )}
                </tbody>
              
      );
    }

  render() {
    let contents = this.state.loading
                    ? <p><em>درخواستی ثبت نشده است...</em></p>
                    : Register2.renderRequestsTable(this.state.requests);
    return (   
      <div class="row" hidden={this.props.hidden}>
        <div class="col-md-3 col-sm-0 col-0"></div>
        <div class="col-md-6 col-sm-12 col-12">
          <div class="boxer" >
            <div class="login-header">
              <img class="logo" src="/image/imageedit.png" alt=""></img>
            </div>
            <div class="login-header-welcome">
              <span>ثبت درخواست</span>
            </div>
            <div><img class="imgCenter" src={this.state.imgName}></img></div>
            <form hidden={this.state.finalHidden}>
              <div class="form-group">
                <label for="name">تاریخ درخواست</label>
                <input type="text" value="1399-01-22" disabled="true"  class="form-control" id="name" name="name" onChange={this.onChangeHandler} ></input>
              </div>
              <div class="form-group">
                <label for="family">تاریخ ارايه مدارک</label>
                <input type="phone" value="1399-03-13" disabled="true" class="form-control" id="family" name="family" onChange={this.onChangeHandler} ></input>
              </div>
              
              <div class="form-group">
                <label for="type">نوع درخواست</label>
                <select class="browser-default custom-select " id="description" name="description" onChange={this.onChangeHandler}>
                  <option selected>انتخاب </option>
                  <option value="تسهیلات ریالی">تسهیلات ریالی</option>
                  <option value="تسهیلات ارزی">تسهیلات ارزی</option>
                </select>
              </div>
              <div class="form-group">
                <label for="money">مبلغ درخواستی</label>
                <input type="text" class="form-control" id="money" name="money" onChange={this.onChangeHandler} ></input>
              </div>
               <div class="login-signup">
                <a class="go-butt" href="" onClick={this.submitChangeHandler}>اضافه شود</a>
              </div>

              <div>
              <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                  <tr>
                    <th>نوع درخواست</th>
                    <th>مبلغ</th>
                    <th>عملیات</th>
                    
                  </tr>
                </thead>
               
                    {contents}
                </table>
              </div>

              <div class="login-signup">
                <a class="go-butt" href="" onClick={this.submitFinal}> ثبت نهایی درخواست </a>
              </div>
              <div class="login-signup">
                <a class="go-butt" href="" onClick={this.previousePage}> صفحه قبل  </a>
              </div>
            </form>
            <div hidden={this.state.finalHidden2}>
              <p></p>
              <h2>درخواست شما با موفقیت ثبت شد</h2>
              <h3>کد رهگیری : </h3><h3>{this.state.registrationID}</h3>
              <p></p>
              <input type="button" value="چاپ درخواست"></input>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-0 col-0"></div>
      </div>
    );
  }
  async populateRequests() {
    
    const response = await fetch('register/getUserRequests/'+this.props.userId);
    const data = await response.json();
    console.log(data);

    this.setState({ requests: data, loading: false });
  }
}
