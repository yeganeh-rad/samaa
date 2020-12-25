import React from 'react'
import styles from './modal.module.css'

export default class Modal extends React.Component {
    static defaultProps={
        showModal:false}
    constructor(props) {
      super(props)
      this.state = { showModal: this.props.showModal }

    }
  
    renderModal() {
      console.log("the link " + this.props.url + " was clicked.")
  
      return (
        <div className="modal show">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">انجام شد</h5>
  
               
                
                
              </div>
              <div className="modal-body">
               درخواست شما با موفقیت انجام شد
              </div>
              <div className="modal-footer">
                <button onClick={() => this.setState({showModal: false})} type="button" className="btn btn-secondary" data- 
                 dismiss="modal">بستن</button>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    render() {
      return (
        <div>
          <button onClick={() => this.setState({showModal: true})} value="MOdal">Modal</button>
          {this.state.showModal && this.renderModal()}
        </div>
      );
    }
  }