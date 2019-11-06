import React from 'react';
import { Link } from 'react-router-dom';
import { StatisticsApi } from "../services";
import '../styles/PageStyles.css'


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
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={'Page'}>
                <header className={'Page-header'}>
                    <h5>
                        Statistics
                    </h5>
                    <Link to={'/menu'}>
                        <button> Back </button>
                    </Link>
                </header>
                <div className={'Page-content'}>
                    <div>
                        Usuarios Registrados
                    </div>
                    <div>
                        Deliveris Registrados
                    </div>
                    <div>
                        Pedidos Completados
                    </div>
                    <div>
                        Pedidos Cancelados
                    </div>
                </div>
                <footer className={'Page-footer'}>
                </footer>
            </div>
        )
    }

}

export {StatisticsPage};