import React from 'react'
import styles from './tables.module.css'

export default class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [
                { id:12,names: 'آرش' },
                { id:13,names: 'آرش' },
                { id:14,names: 'آرش' },
                { id:15,names: 'آرش' }
            ],
            tableFields:['names', 'nin']
        }
    };
    onChangeHandler = (event) => {
    }
    render() {
        return (

            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        {this.props.headers.map(header =>
                            <th>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map(request =>
                        <tr data-id={request.id}>
                            {Object.values(request).map((value) => 
                                <td>{value}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

}

