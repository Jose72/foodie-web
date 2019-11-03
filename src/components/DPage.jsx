import React from 'react';
import { Table } from 'reactstrap';
import queryString from 'query-string';
import {DeliveryApi} from "../services";

class DisplayPage extends React.Component {
    constructor(props) {
        super(props);

        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = {
            itemList: [],
            currentPageIndex: q.p,
            pageSize: q.pSize,
            totalItems: 0,
        };

        this.renderTableElement = this.renderTableElement.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidMount() {
        let q = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        let route = q.route;
        if (pageSize === undefined || pageIndex === undefined) {
            this.props.history.push({
                pathname: route,
            });
            this.setState({currentPageIndex: 1});
            this.setState({pageSize: 10});
        } else {
            DeliveryApi.getDeliveries(pageIndex, pageSize)
                .then((d) => {
                        console.log(d);
                        this.setState({deliveryList: d.items});
                        this.setState({totalItems: d.totalItems});
                        this.setState({currentPageIndex: pageIndex});
                        this.setState({pageSize: pageSize});
                    }
                )
                .catch((t) => {
                    alert(t);
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        let q = queryString.parse(nextProps.location.search, {ignoreQueryPrefix: true});
        let pageIndex = q.p;
        let pageSize = q.pSize;
        if(this.state.currentPageIndex !== pageIndex || this.state.pageSize !== pageSize) {
            DeliveryApi.getDeliveries(pageIndex, pageSize)
                .then((d) => {
                        console.log(pageIndex, pageSize);
                        console.log(d);
                        this.setState({deliveryList: d.items});
                        this.setState({totalItems: d.totalItems});
                        this.setState({currentPageIndex: pageIndex});
                        this.setState({pageSize: pageSize});
                    }
                )
                .catch((t) => {
                    alert(t);
                });
        }
    }



    //Next page of table
    onClickNext = (e) => {
        e.persist();
        e.preventDefault();
        if (parseInt(this.state.currentPageIndex, 10) * parseInt(this.state.pageSize, 10) < parseInt(this.state.totalItems, 10)){
            console.log(this.state.currentPageIndex, this.state.pageSize);
            this.props.history.push({
                pathname: '/deliveries',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) + 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };

    //Previous page of table
    onClickPrevious = (e) => {
        e.persist();
        e.preventDefault();
        if(parseInt(this.state.currentPageIndex, 10) <= 1){
        } else {
            console.log(this.state.currentPageIndex, this.state.pageSize);
            this.props.history.push({
                pathname: '/deliveries',
                search: '?' + 'p=' + (parseInt(this.state.currentPageIndex, 10) - 1).toString() + '&' + 'pSize=' + this.state.pageSize,
            });
            window.location.reload();
        }
    };


}