import React, { Component } from 'react';
import Tables from './tables/tables';
export class File extends Component {
    constructor(props) {
    super(props);
    this.state = {}
  }
  addNewPerson=(event)=>{
    event.preventDefault();
      this.props.addNewPerson();
  }
  addNewRequest=(event)=>{
    event.preventDefault();
    this.props.addNewRequest();
  }
    onEdit=(item2)=>{
        this.props.onEdit(item2);
    }
  render() {
    return (
        <div className="row" hidden={this.props.hidden2}>
            <div className="col-md-2 col-sm-0 col-0"></div>
            <div className="col-md-8 col-sm-12 col-12">
                <div className="boxer">
                    <div className="login-header">
                        <img className="logo" src="/image/imageedit.png" alt=""></img>
                    </div>
                    <div className="login-header-welcome">
                        <span>ثبت پرونده</span>
                    </div>
                    <div className="row">
                        <div className="col-md-6 leftBorder bottomBorder">
                            <span>شماره پرونده : 39239</span>
                        </div>
                        <div className="col-md-6 leftBorder bottomBorder">
                            <span>تاریخ پرونده : 10/09/1399</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 leftBorder bottomBorder">
                            <div className="row">
                                <div className="col-md-12 bottomBorder">

                                    <div className="row">
                                        <div className="col-md-7 title-x-large"> <i className="fas fa-user"></i>لیست اشخاص</div>
                                        <div className="col-md-5">
                                            <div className="add-butt-holder">
                                                < a className="add-butt" href="" onClick={this.addNewPerson}> <i className="far fa-plus-square"></i>شخص جدید </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Tables  
                                                                headers={['ردیف', 'نام', 'نام خانوادگی', 'کدملی','عملیات']}
                                                                url="customer/table/1"
                                                                urlDelete="customer/delete"
                                                                editable="true"
                                                                
                                                                onEdit={this.onEdit}
                                            ></Tables></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 leftBorder bottomBorder">
                                    <span>تعداد درخواست ها : 9</span>
                                </div>
                                <div className="col-md-6 leftBorder bottomBorder">
                                    <span>تاریخ آخرین درخواست : 10/09/1399</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-7 title-x-large">
                                            <i className="fas fa-file-invoice"></i>لیست درخواست ها
                                        </div>
                                        <div className="col-md-5">
                                            <div className="add-butt-holder">
                                                < a className="add-butt" href="" onClick={this.addNewRequest}> <i className="far fa-plus-square"></i>درخواست جدید </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Tables 
                                                headers={[, 'ردیف','درخواست', 'مبلغ', 'عملیات']}
                                                url="request/table/1"
                                                urlDelete="request/delete"
                                     ></Tables>
                                </div>
                            </div>
                            <div className="row topBorder">
                                <div className="col-md-6">
                                    <div className="login-signup">
                                        <a className="go-butt" href="" onClick={this.submitChangeHandler}><i className="far fa-save"></i>ارسال به بانک </a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="login-signup">
                                        <a className="go-butt" href="" onClick={this.submitChangeHandler}> <i className="fas fa-external-link-alt"></i>خروج </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );};
}