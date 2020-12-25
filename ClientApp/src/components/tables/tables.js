import React from 'react'
import style from './tables.module.css'

export default class Tables extends React.Component {
    static defaultProps={
      tableData:[{
        id:12,number: 'آرش',type:'تهران' }],typeRemover:false,editable:false,url:" ",urlDelete:" ",removable:false}
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            editable:this.props.editable,
            typeRemover:this.props.typeRemover,
            url:this.props.url,
            urlDelete:this.props.urlDelete,
            removable:this.props.removable,
            urlEdit:this.props.urlEdit
        }
        
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.tableData !== this.state.tableData) {
          this.setState({ tableData: nextProps.tableData });
        }
      }
    async componentDidMount() {
       if(this.state.url != " ") {
            const response = await fetch(this.props.url);
            const data = await response.json();
            this.setState({tableData:data});
       }
    }
    onDelete= (request,event)=>{
        event.preventDefault();
    if(this.state.removable)
    {
      var array=this.state.tableData;
      array.splice(array.indexOf(request),1);
      this.setState({tableData:array});
      this.props.onRemove(request.id);
    }else if(this.state.urlDelete!=" ")
      fetch(this.state.urlDelete, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"id":request.id}),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          if (data.statusCode ==200){
            this.setState({message:data.message});
            console.log(this.state.tableData.indexOf(request));
            console.log(request);
            var array=this.state.tableData;
            array.splice(array.indexOf(request),1)
            this.setState({tableData:array})
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });      
    }
    onEdit=(item,event)=>{
      event.preventDefault();
      this.props.onEdit(item.id);
      //if(this.state.urlEdit != " ") {
       // const response =  fetch(this.props.urlEdit+'/'+item.id);
       // const data =  response.json();
        //this.setState({tableData:data});
      
    }
    onChangeHandler = (event) => {
    }
    render() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        {this.props.headers.map(header =>
                            <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map(request =>
                        <tr key={request.id} data-id={request.id}>
                            
                            {Object.keys(request).map(key =>  (!this.state.typeRemover || key!='type'?
                            (
                              <td key={key}>
                                {request[key]}
                              </td>
                            ): null))
                            }
                            <td className={style.action}>
                                <a  href="" className={style.red} onClick={(ev) => this.onDelete(request, ev)}><i class="far fa-trash-alt"></i></a>
                                <a hidden={!this.state.editable} onClick={(ev) => this.onEdit(request, ev)} href="" className={style.green}><i class="far fa-edit"></i></a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

