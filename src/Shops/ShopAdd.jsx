import React from 'react';
import {Link} from "react-router-dom";
import {ShopApi} from "../services";

import '../styles/PageStyles.css';
import {invalidMessage, shopAddGoogleValidate, shopAddValidate} from "../utils";
import {FoodieFooter} from "../components";

class ShopAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            description: '',
            longitude: '',
            latitude: '',
            radius: 0,
            photoUrl: 'https://p7.hiclipart.com/preview/3/10/517/computer-icons-shopping-cart-retail-sales-thumbnail.jpg',
            showGoogleAdd: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitGoogle = this.onSubmitGoogle.bind(this);
        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.getPageContent = this.getPageContent.bind(this);
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };

    onSubmit(e){
        e.persist();
        e.preventDefault();
        if(shopAddValidate(this.state)) {
            ShopApi.addShop(this.state)
                .then(() => {
                    alert('Shop Added Successfully');
                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }
    }

    onSubmitGoogle(e){
        e.persist();
        e.preventDefault();
        if(shopAddGoogleValidate(this.state)) {
            ShopApi.addShopGoogle(this.state)
                .then(() => {
                    alert('Shop Added Successfully');
                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }

    }

    handleChangeChk(){
        this.setState({showGoogleAdd: !this.state.showGoogleAdd})
    }

    getPageContent(){
        if(this.state.showGoogleAdd){
            return(
                <div>
                    <form>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Latitude</label>
                            <input className='Page-input'
                                   name='latitude'
                                   value={this.state.latitude}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Longitude</label>
                            <input className='Page-input'
                                   name='longitude'
                                   value={this.state.longitude}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Radius</label>
                            <input className='Page-input'
                                   name='radius'
                                   value={this.state.radius}
                                   onChange={e => this.change(e)}
                                   autoComplete="off"
                            />
                            <br/>
                            <br/>
                        </div>
                    </form>
                    <div className={'Page-buttons'}>
                        <button onClick={(e) => this.onSubmitGoogle(e)}> Add</button>
                        {" "}
                        <Link className='Link' to='/shops'>
                            <button>Cancel</button>
                        </Link>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <img src={this.state.photoUrl} alt={''} width={200} height={200}/>
                <form>
                    <div className={'Page-input-group'}>
                        <label className={'Page-label'}>Picture</label>
                        <input className='Page-input-url'
                               name='photoUrl'
                               value={this.state.photoUrl}
                               onChange={e => this.change(e)}
                               autoComplete="off"
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-input-group'}>
                        <label className='Page-label'>Name</label>
                        <input className='Page-input'
                               size='150%'
                               name='name'
                               value={this.state.name}
                               onChange={e => this.change(e)}
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-input-group'}>
                        <label className={'Page-label'}>Address</label>
                        <input className='Page-input'
                               name='address'
                               value={this.state.address}
                               onChange={e => this.change(e)}
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-input-group'}>
                        <label className={'Page-label'}>Description</label>
                        <input className='Page-input'
                               name='description'
                               value={this.state.description}
                               onChange={e => this.change(e)}
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-input-group'}>
                        <label className={'Page-label'}>Latitude</label>
                        <input className='Page-input'
                               name='latitude'
                               value={this.state.latitude}
                               onChange={e => this.change(e)}
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-input-group'}>
                        <label className={'Page-label'}>Longitude</label>
                        <input className='Page-input'
                               name='longitude'
                               value={this.state.longitude}
                               onChange={e => this.change(e)}
                        />
                        <br/>
                        <br/>
                    </div>
                    <div className={'Page-buttons'}>
                        <button onClick={(e) => this.onSubmit(e)}> Add</button>
                        {" "}
                        <Link className='Link' to='/shops'>
                            <button>Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }

    render(){
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Add New Shop
                        </h5>
                    </header>
                </div>
                <div className='Page-content'>
                    <div>
                        <label className={'Page-label'}>Google API</label>
                        <br/>
                        <input
                            className='Page-input'
                            type="checkbox"
                            defaultChecked={this.state.showGoogleAdd}
                            onChange={this.handleChangeChk}
                            placeholder={'Use Google API'}
                        />
                        <br/>
                        <br/>
                        <br/>
                    </div>

                    {this.getPageContent()}
                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {ShopAdd};