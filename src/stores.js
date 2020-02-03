import React, {Component} from 'react';
import storesData from './stores.json';
import {Link} from 'react-router-dom';
import './stores.css';

export class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: []
        }
    }

    componentDidMount() {
        fetch('/store-api/store/list')
        .then((response) => {
            const stores = response.json();
            
            this.setState({
                stores
            });

            return response.json();
        })
        .catch((error) => {
            // throw error;
            this.setState({
                stores: storesData
            })
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    BEST BUY STORES
                </header>
                <Link to='/create'>Create a store</Link>
                {
                    this.state.stores.length ? (
                        <section className='store-list'>
                            {
                                this.state.stores.map((store) => {
                                    return <Link className='store-item' key={store.id} to={`/item/${store.id}`}>{store.name} {store.address}</Link>
                                })
                            }
                            
                        </section>
                    ) : null
                }
            </div>
        )
    }
}

