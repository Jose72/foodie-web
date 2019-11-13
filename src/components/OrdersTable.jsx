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
        const o_columns = [{Header: "Order Id", accessor: "id"},
            {Header: "User Id", accessor: "userId"},
            {Header: "Delivery Id", accessor: "deliveryId"},
            {Header: "Shop Id", accessor: "shopId"},
            {Header: "Status", accessor: "status"}];
        if(this.props.itemList.length > 0) {
            return(
                <div>
                    <ReactTable
                        defaultPageSize={10}
                        data={this.props.itemList}
                        columns={o_columns}
                        showPagination={true}
                    />
                </div>
            )
        } else {
            return null
        }
    }

}

export {OrdersTable}