import React from "react";
import {ShopApi} from "../services";
import '../styles/PageStyles.css'
import {FoodieFooter} from "../components";

class ShopModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            shopsId: props.match.params.id,
            shop: {},
        };
    }

    componentDidMount() {
        ShopApi.getShop(this.state.shopsId)
            .then((u) => {
                this.setState({shop: u})
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
        ShopApi.modifyShop(this.state.shop)
            .then(() => {
                alert('Shop Updated Successfully');
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

    update = (e) => {
        e.persist();
        let dummy = this.state.shop;
        dummy[e.target.name] = e.target.value;
        this.setState({shop: dummy})
    };

    render(){
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Modify Shop Id N°{this.state.shop.id}
                        </h5>
                    </header>
                </div>

                <div className='Page-content'>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className='Page-label'>Name</label>
                            <input className='Page-input'
                                   size='150%'
                                   name='name'
                                   value={this.state.shop.name}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Address</label>
                            <input className='Page-input'
                                   name='address'
                                   value={this.state.shop.address}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Description</label>
                            <input className='Page-input'
                                   name='description'
                                   value={this.state.shop.description}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Picture</label>
                            <input className='Page-input'
                                   name='photoUrl'
                                   value={this.state.shop.photoUrl}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Latitude</label>
                            <input className='Page-input'
                                   name='latitude'
                                   value={this.state.shop.latitude}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Longitude</label>
                            <input className='Page-input'
                                   name='longitude'
                                   value={this.state.shop.longitude}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'} >
                            <label className={'Page-label'}>Rating</label>
                            <input className='Page-input'
                                   name='rating'
                                   value={this.state.shop.rating}
                                   onChange={e => this.update(e)}
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
                <FoodieFooter/>
            </div>
        )
    }
}

export {ShopModify};