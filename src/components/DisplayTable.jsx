import React from 'react';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import './DisplayTable.css'



class DisplayTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableElement = this.renderTableElement.bind(this);
        this.renderTableFields = this.renderTableFields.bind(this);
    }

    static defaultProps = {
        itemList: [],
        route: '',
        fields: [],
        headers: []
    };

    onClickDelete(){
    }

    renderTableFields(){
        return this.props.headers.map((key, index) => {
            return <th className={'Table-header'} style={{width: '10%'}} key={index}>{key}</th>
        })
    }

    renderTableElement(item) {
        return (
            <tr key={item.id}>
                {this.props.fields.map((key) => {
                    return <td className={'Table-row'} key={key}>{item[key.toString()]}</td>
                })}
                <td className={'Table-row'}>
                    <button onClick={(e) => this.props.onClickDelete(item, e)}> Delete </button>
                </td>
                <td className={'Table-row'}>
                    <Link className='Link' to={this.props.route+`/modify/${item.id}`}>
                        <button>Modify</button>
                    </Link>
                </td>
                <td className={'Table-row'}>
                    <Link className='Link' to={this.props.route+`/${item.id}`}>
                        <button>View</button>
                    </Link>
                </td>
            </tr>
        )
    }

    render() {
        if(this.props.itemList.length > 0) {
            return(
                <Table className={'Table-content'}>
                    <thead>
                        <tr>
                            {this.renderTableFields()}
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.itemList.map(this.renderTableElement)}
                    </tbody>
                </Table>
            )
        }
    }
}

export {DisplayTable}