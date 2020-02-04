import React, {Component} from 'react';
import storesData from './stores.json';
import {Link} from 'react-router-dom';
import './stores.css';
import {Table} from 'react-bootstrap';

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
            return response.json();
        })
        .then((stores) => {
            this.setState({
                stores
            });
        })
        .catch((error) => {
            throw error;
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    BEST BUY STORES
                </header>
                {

                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    Store Name
                                </th>
                                <th>
                                    Store Address
                                </th>
                                <th>
                                    Store City
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {
                                this.state.stores.map(store => 
                                    <tr>
                                        <td>
                                        <Link className='store-item' key={store.id} to={`/item/${store.id}`}>{store.name}</Link>
                                        </td>
                                        <td>
                                            {store.address}
                                        </td>
                                        <td>
                                            {store.city}
                                        </td>
                                    </tr>

                                    
                                )
                            }
                        
                        </tbody>
                    </Table>
                  
                }
            </div>
        )
    }
}

