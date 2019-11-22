import React from "react";
import {ShopMenuApi} from "../services";
import '../styles/PageStyles.css'
import {FoodieFooter} from "../components";

class ShopMenuModify extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            shopId: props.match.params.shopId,
            foodId: props.match.params.foodId,
            food: {},
        };
    }

    componentDidMount() {
        ShopMenuApi.getMenuFood(this.state.foodId)
            .then((u) => {
                this.setState({food: u})
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
        ShopMenuApi.modifyMenuFood(this.state.shopId, this.state.food)
            .then(() => {
                alert('Food Updated Successfully');
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
        let dummy = this.state.food;
        dummy[e.target.name] = e.target.value;
        this.setState({food: dummy})
    };

    render(){
        return(
            <div className={'Page'}>
                <div>
                    <header className='Page-header'>
                        <h5>
                            Modify Menu Shop Id N°{this.state.shopId}
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
                                   value={this.state.food.name}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Description</label>
                            <input className='Page-input'
                                   name='description'
                                   value={this.state.food.description}
                                   onChange={e => this.update(e)}
                            />
                            <br/>
                            <br/>
                        </div>
                        <div className={'Page-input-group'}>
                            <label className={'Page-label'}>Price</label>
                            <input className='Page-input'
                                   name='price'
                                   value={this.state.food.price}
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

export {ShopMenuModify};