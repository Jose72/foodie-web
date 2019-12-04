import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class BChart extends React.Component {

    static defaultProps = {
        data: [],
        legend: 'n'
    };


    getWidth(){
        let base = 600;
        if(this.props.data === null){
            return base;
        }
        let l = this.props.data.length;
        if(typeof this.props.data !== undefined && l > 5){
            return (l - 5)*100 + base;
        }
        return base;
    }

    render(){
        return(
            <BarChart
                minwidth={800}
                width={this.getWidth()}
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