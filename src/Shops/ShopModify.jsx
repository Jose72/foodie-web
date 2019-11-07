import React from "react";
import {ShopApi} from "../services";
import '../styles/PageStyles.css'

class ShopModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            shopsId: props.match.params.id,
            shops: {},
        };
    }

    componentDidMount() {
        ShopApi.getShops(this.state.shopsId)
            .then((u) => {
                this.setState({shops: u})
            })
            .catch((t) => {
                alert(t);
            })
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        ShopApi.modifyShop(this.state.shops)
            .then(() => {
                alert('Shops Updated Successfully');
            })
            .catch((r) => {
                alert(r)
            });

    }

    onClickCancel(e){
        e.persist();
        e.preventDefault();
        this.props.history.goBack();
    }

    render(){
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Modify Shops {this.state.shops.id}
                        </h5>
                    </header>
                </div>

                <div className='Page-content'>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>First Name</label>
                            <input className='Page-input'
                                   size='150%'
                                   name='name'
                                   value={this.state.shops.name}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>

                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Description</label>
                            <input className='Page-input'
                                   name='description'
                                   value={this.state.shops.description}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Phone</label>
                            <input className='Page-input'
                                   name='phone'
                                   value={this.state.shops.phone}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Reputation</label>
                            <input className='Page-input'
                                   name='reputation'
                                   value={this.state.shops.reputation}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>

                        <div className={'ModifyShops-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Modify </button>
                            {" "}
                            <button onClick={(e) => this.onClickCancel(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export {ShopModify};