import React, {Component} from 'react';
import storesData from './stores.json';
import {StoreDetails} from './store-details.js';
import { StoreItem } from './store-item.js';

export class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: storesData,
            selectedStore: null
        }
    }

    handleSelection = (store) => {
        this.setState({
            selectedStore: store
        })
    }

    resetSelection = () => {
        this.setState({
            selectedStore: null
        })
    }

    render() {
        if (this.state.selectedStore) {
            return (
                <>
                    <button onClick={this.resetSelection}>Back to Stores</button>
                    <StoreDetails storeDetails={this.state.selectedStore}/>
                </>
            )
        }

        return this.state.stores.map((store) => {
            return <StoreItem key={store.id} handleSelection={this.handleSelection} store={store}>{store.name} {store.address}</StoreItem>
        })
    }
}

