import React, { Component } from 'react';

export  class SaveAndExit extends Component {
    constructor(props) {
    super(props);
    this.state = {             
      url:"customer/saveFile",
      code:""
  }
}
 
componentDidMount() {
      fetch(this.state.url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"ID":"1"}),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.statusCode ==200){
            this.setState({code:data.message})
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }
  render() {
    return (
     <div className="registerRequest" hidden={this.props.hidden}>
       <div>
              <p></p>
              <h2>درخواست شما با موفقیت ثبت شد</h2>
              <h3>کد رهگیری : </h3><h3>{this.state.code}</h3>
              <p></p>
              <input type="button" value="چاپ درخواست"></input>
            </div>
     </div>
    );
  }
}
