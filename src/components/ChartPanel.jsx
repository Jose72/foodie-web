import React from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

const months_n = {January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7,
    August: 8, September: 9, October: 10, November: 11, December: 12};

const years = ['2017', '2018', '2019', '2020', '2021'];

class ChartPanel extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            from_year: this.subtractDateYearMonth(d.getFullYear(), this.getMonth(), 5)['n_year'],
            from_month: this.getMonthNameByNumber(this.subtractDateYearMonth(d.getFullYear(), this.getMonth(), 5)['n_month']),
            to_year: d.getFullYear(),
            to_month: this.getMonthNameByNumber(this.getMonth()),
            fromList: [],
            toList: []
        };

        console.log(this.state);

        this.onClickDisplay = this.onClickDisplay.bind(this);
        this.change = this.change.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
    }

    componentDidMount() {
        this.onClickDisplay();
    }

    getMonth() {
        return new Date().getMonth() + 1;
    }

    subtractDateYearMonth(year, month, n){
        let n_month = month - n;
        let n_year = year;
        if(n_month < 1){
            n_month = n_month + 12;
            n_year = year - 1;
        }
        return({n_year,n_month})
    }

    getMonthNumberByName(m){
        console.log('mn', m, months_n[m]);
        return months_n[m];
    }

    getMonthNameByNumber(m){
        return months[m-1];
    }

    updateChart(year_from, month_from, year_to, month_to){
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
    };

    changeMonth = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value});
        console.log(this.state);
    };

    onClickDisplay(){
        this.props.updateChart(this.state.from_year, this.getMonthNumberByName(this.state.from_month),
            this.state.to_year,  this.getMonthNumberByName(this.state.to_month));
    }

    render(){
        return(
            <div>
                From
                <select name='from_year' value={this.state.from_year} onChange={e => this.change(e)}>
                    {years.map((m) =>
                        <option key={m} value={m}> {m} </option>
                    )};
                </select>
                <select name='from_month' value={this.state.from_month} onChange={e => this.changeMonth(e)}>
                    {months.map((m) =>
                        <option key={m} value={m}> {m} </option>
                    )};
                </select>
                To
                <select name='to_year' value={this.state.to_year} onChange={e => this.change(e)}>>
                    {years.map((m) =>
                        <option key={m} value={m}> {m} </option>
                    )};
                </select>
                <select name='to_month' value={this.state.to_month} onChange={e => this.changeMonth(e)}>>
                    {months.map((m) =>
                        <option key={m} value={m}> {m} </option>
                    )};
                </select>
                {" "}{" "}
                <button onClick={this.onClickDisplay}> Submit </button>


            </div>
        )
    }


}

export {ChartPanel}