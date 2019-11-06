import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './DisplayTable.css'

class BChart extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: [],
        legend: 'n'
    };


    render(){
        return(
            <BarChart
                width={800}
                height={300}
                data={this.props.data.map((d) => {
                    return(
                        {l: d.year.toString() + '/' + d.month.toString(), m: d.amount}
                    )
                })}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="l" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name={this.props.legend} dataKey={'m'} fill="#8884d8" />
            </BarChart>
        )

    };
}

export {BChart}