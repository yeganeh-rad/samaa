import React, { Component } from 'react';
import Tables from './tables/tables';
export class File extends Component {
    constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
        <div class="row">
            <div class="col-md-2 col-sm-0 col-0"></div>
            <div class="col-md-8 col-sm-12 col-12">
                <div class="boxer">
                    <div class="login-header">
                        <img class="logo" src="/image/imageedit.png" alt=""></img>
                    </div>
                    <div class="login-header-welcome">
                        <span>ثبت پرونده</span>
                    </div>
                    <div class="row">
                                <div class="col-md-6 leftBorder bottomBorder">
                                <span>شماره پرونده : 39239</span>
                                </div>
                                <div class="col-md-6 leftBorder bottomBorder">
                                    <span>تاریخ پرونده : 10/09/1399</span>
                                </div>
                            </div>
                    <div class="row">
                        <div className="col-md-12 leftBorder bottomBorder">
                            <div className="row">
                                <div className="col-md-12 bottomBorder">

                                    <div className="row">
                                        <div className="col-md-7"> <i class="fas fa-user"></i>لیست اشخاص</div>
                                        <div className="col-md-5">
                                            <div class="add-butt-holder">
                                                < a class="add-butt" href="" onClick={this.submitFinal}> <i class="far fa-plus-square"></i>اضافه کردن شخص جدید </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"><Tables headers={['ردیف', 'نام', 'کدملی', 'عملیات']}></Tables></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 leftBorder bottomBorder">
                                    <span>تعداد درخواست ها : 9</span>
                                </div>
                                <div class="col-md-6 leftBorder bottomBorder">
                                    <span>تاریخ آخرین درخواست : 10/09/1399</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <i class="fas fa-file-invoice"></i>درخواست های پرونده
                                        </div>
                                        <div className="col-md-5">
                                            <div class="add-butt-holder">
                                                < a class="add-butt" href="" onClick={this.submitFinal}> <i class="far fa-plus-square"></i>درخواست جدید </a>
                                            </div>
                                    </div>
                                    </div>
                                    
                                </div>

                               

                            </div>
                            <div className="row">
                                    <div className="col-md-12">
                                        <Tables headers={['شماره', 'درخواست', 'عملیات']}></Tables>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );};
}