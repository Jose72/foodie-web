import React from 'react';
import { Table } from 'reactstrap';
import ReactTable from 'react-table';
import {Link} from "react-router-dom";
import './DisplayTable.css'
import logo from '../styles/logo192.png'




const columns_a = [
    {
        Header: "Orders",
        columns: [
            {
                Header: "Order Id",
                accessor: "orderId"
            },
            {
                Header: "Last Name",
                id: "lastName",
                accessor: d => d.lastName
            }
        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Status",
                accessor: "status"
            }
        ]
    },
    {
        Header: "Stats",
        columns: [
            {
                Header: "Visits",
                accessor: "visits"
            }
        ]
    }
];



class OrdersTable extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        itemList: [],
        fields: [],
        headers: [],
    };


    renderRow(item){
        return(
            <tr key={item.id}>
                {this.props.fields.map((key) => {
                    console.log(key);
                    return(
                        this.renderTableElementValue(item, key)
                    )
                })}
            </tr>
        )
    }

    render() {
        if(this.props.itemList.length > 0) {
            return(
                <Table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Shop Id</th>
                            <th>User Id</th>
                            <th>Delivery Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle">
                            <td>OBS Name</td>
                            <td>OBS Description</td>
                            <td>hpcloud</td>
                            <td>nova</td>
                            <td> created</td>
                        </tr>
                        <tr>
                            <td colspan="12" className="hiddenRow">
                                <div className="accordian-body collapse" id="demo1">
                                    <h1>Hi from the hiddenRow</h1>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }
}

export {OrdersTable}