import React from 'react';
import { StatisticsApi } from "../services";
import {BChart} from "../components";
import {ChartPanel} from "../components";
import {OptPanel} from "../components";
import '../styles/PageStyles.css'
import {Loader} from "../components/Loader";


class StatisticsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            currentRegisteredUsers: 0,
            currentRegisteredDeliveries: 0,
            currentCompletedOrders: 0,
            currentCanceledOrders: 0,

            listRegisteredUsers: [],
            listRegisteredDeliveries: [],
            listCompletedOrders: [],
            listCanceledOrders: [],

            isLoading: true,
        };

        this.getListRegisteredUsers = this.getListRegisteredUsers.bind(this);
        this.getListRegisteredDeliveries = this.getListRegisteredDeliveries.bind(this);
        this.getListCompletedOrders = this.getListCompletedOrders.bind(this);
        this.getListCanceledOrders = this.getListCanceledOrders.bind(this);
    }

    componentDidMount() {
        this.getCurrentStatistics();
    }

    getYear() {
        return new Date().getFullYear();
    }

    getMonth() {
        return new Date().getMonth() + 1;
    }

    getCurrentStatistics(){
        StatisticsApi.getCurrentStatistics()
            .then((s) => {
                    this.setState({currentRegisteredUsers: s.users});
                    this.setState({currentRegisteredDeliveries: s.deliveries});
                    this.setState({currentCompletedOrders: s.completedOrders});
                    this.setState({currentCanceledOrders: s.canceledOrders});
                    this.setState({isLoading: false});
                }
            )
            .catch((t) => {
                alert(t);
                }
            );
    }

    getListRegisteredUsers(year_from, month_from, year_to, month_to){
        StatisticsApi.getUsersStatistics(year_from, month_from, year_to, month_to)
            .then((s) => {
                    this.setState({listRegisteredUsers: s});
                }
            )
    }

    getListRegisteredDeliveries(year_from, month_from, year_to, month_to){
        StatisticsApi.getDeliveriesStatistics(year_from, month_from, year_to, month_to)
            .then((s) => {
                    this.setState({listRegisteredDeliveries: s});
                }
            )
    }

    getListCompletedOrders(year_from, month_from, year_to, month_to){
        StatisticsApi.getCompletedOrdersStatistics(year_from, month_from, year_to, month_to)
            .then((s) => {
                    this.setState({listCompletedOrders: s});
                }
            )
    }

    getListCanceledOrders(year_from, month_from, year_to, month_to){
        StatisticsApi.getCanceledOrdersStatistics(year_from, month_from, year_to, month_to)
            .then((s) => {
                    this.setState({listCanceledOrders: s});
                }
            )
    }

    render() {
        if (this.state.isLoading) return <Loader />;
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Statistics
                    </h5>
                </header>
                <div className={'Page-opt-panel'}>
                    <OptPanel/>
                </div>
                <div className={'Page-content'}>
                    <div>
                        <h2>{this.getYear()} / {this.getMonth()}</h2>
                        <table>
                            <tr>
                                <td>Usuarios Registrados (totales)</td>
                                <td>Deliveris Registrados (totales)</td>
                                <td>Pedidos Completedos (este mes)</td>
                                <td>Pedidos Cancelados (este mes)</td>
                            </tr>
                            <tbody>
                                <td>{this.state.currentRegisteredUsers}</td>
                                <td>{this.state.currentRegisteredDeliveries}</td>
                                <td>{this.state.currentCompletedOrders}</td>
                                <td>{this.state.currentCanceledOrders}</td>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3>Usuarios Registrados</h3>
                        <br/>
                        <ChartPanel
                            updateChart={this.getListRegisteredUsers}
                            legend={'users'}
                        >
                        </ChartPanel>
                        <BChart data={this.state.listRegisteredUsers}
                                legend={'users'}
                        >
                        </BChart>
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <h3>Deliveris Registrados</h3>
                        <br/>
                        <ChartPanel
                            updateChart={this.getListRegisteredDeliveries}
                        >
                        </ChartPanel>
                        <BChart data={this.state.listRegisteredDeliveries}
                                legend={'deliveries'}
                        >
                        </BChart>
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <h3>Pedidos Completados</h3>
                        <br/>
                        <ChartPanel
                            updateChart={this.getListCompletedOrders}
                        >
                        </ChartPanel>
                        <BChart data={this.state.listCompletedOrders}
                                legend={'orders'}
                        >
                        </BChart>
                        <br/>
                        <br/>
                    </div>
                    <div>
                        <h3>Pedidos Cancelados</h3>
                        <ChartPanel
                            updateChart={this.getListCanceledOrders}
                        >
                        </ChartPanel>
                        <BChart data={this.state.listCanceledOrders}
                                legend={'orders'}
                        >
                        </BChart>
                        <br/>
                        <br/>
                    </div>
                </div>
                <footer className={'Page-footer'}>
                </footer>
            </div>
        )
    }

}

export {StatisticsPage};