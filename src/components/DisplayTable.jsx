import React from 'react';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import './DisplayTable.css'
import logo from '../styles/logo192.png'



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
        headers: [],
        buttons: [],
        subComponentKey: ''
    };

    onClickDelete(){
    }

    renderTableFields(){
        return this.props.headers.map((key, index) => {
            return <th className={'Table-header'} style={{width: '10%'}} key={index}>{key}</th>
        })
    }

    getImage(item) {
        if(item['picture'] === null){
            return logo;
        }
        return item['picture'];
    }

    renderPicture(item){
        if(typeof item['picture'] !== undefined){
            return(
                <td className={'Table-row'} key={'picture'}>
                    <img
                    src={this.getImage(item)}
                    alt={'picture'}
                    width={'100px'}
                    height={'100px'}/>
                </td>
            )
        }
    }

    renderTableElementValue(item, key){
        if(key === 'picture'){
            console.log('pic');
            return(
                this.renderPicture(item)
            )
        } else{
            return(
                <td className={'Table-row'} key={key}>
                    {item[key.toString()]}
                </td>
            )
        }
    }

    renderSubComponent(item){
        if(this.props.subComponentKey.toString() !== ''){
            return(
                <div>
                    item.id
                </div>
            )
        }
    }

    renderTableElement(item) {
        return (
            <tr key={item.id}>

                {this.props.fields.map((key) => {
                    console.log(key);
                    return(
                        this.renderTableElementValue(item, key)
                    )
                })}
                <td className={'Table-row'}>
                    <button onClick={(e) => this.props.onClickDelete(item, e)}> Delete </button>
                </td>
                <td className={'Table-row'}>
                    <Link className='Link' to={this.props.route+`/modify/${item.id}`}>
                        <button>Modify</button>
                    </Link>
                </td>
                {this.props.buttons.map((b) => {
                    return (
                        <td className={'Table-row'} key={b.key}>
                            <Link className='Link' to={b.route+`${item.id}`}>
                                <button>{b.text}</button>
                            </Link>
                        </td>
                    )
                })}
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
                    SubComponent={(e) => {this.renderSubComponent(e)}}
                    {this.props.itemList.map(this.renderTableElement)}
                    </tbody>
                </Table>
            )
        }
    }
}

export {DisplayTable}