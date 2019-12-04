import React from 'react';
import {Link} from "react-router-dom";
import {ShopMenuApi} from "../services";

import '../styles/PageStyles.css';
import {invalidMessage, productAddValidate} from "../utils";
import {FoodieFooter} from "../components";

class ShopMenuAdd extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            shopId: props.match.params.shopId,
            name: '',
            description: '',
            price: 0,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    change = (e) => {
        e.persist();
        this.setState({[e.target.name]:  e.target.value})
    };


    onSubmit(e){
        e.persist();
        e.preventDefault();
        if(productAddValidate(this.state)) {
            ShopMenuApi.addMenuFood(this.state.shopId, this.state)
                .then(() => {
                    alert('Food Added Successfully');
                })
                .catch((r) => {
                    alert(r)
                });
        } else {
            alert(invalidMessage);
        }
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
                    <form>
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
                            <label className={'Page-label'}>Price</label>
                            <input className='Page-input'
                                   name='price'
                                   value={this.state.price}
                                   onChange={e => this.change(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-buttons'}>
                            <button onClick={(e) => this.onSubmit(e)}> Add </button>
                            {" "}
                            <Link className='Link' to={`/shop/${this.state.shopId}/menu`}>
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
                <FoodieFooter/>
            </div>
        )
    }
}

export {ShopMenuAdd};