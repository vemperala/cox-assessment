import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import storesData from './stores.json';
import {Link} from 'react-router-dom';
import './store-details.css';

class StoreDetailsBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: storesData[0],
            editing: false,
            editedDetails: {
                id: '',
                type: '',
                name: '',
                address: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                location: {
                    lat: '',
                    lon: ''
                },
                hours: {
                    Mon: '',
                    Tue: '',
                    Wed: '',
                    Thu: '',
                    Fri: '',
                    Sat: '',
                    Sun: ''
                },
                services: ''
            },
            updated: false
        }
    }

    componentDidMount() {
        fetch(`/store-api/store/id/${this.props.match.params.id}`)
        .then((response) => {
            return response.json();
        })
        .then((details) => {
            const hours = details.hours.split('; ').reduce((accumulator, dayHours) => {
                const [key, value] = dayHours.split(': ');
                accumulator[key] = value;
                return accumulator;
            }, {});

            this.setState({
                details,
                editedDetails: {
                    id: details.id,
                    type: details.type,
                    name: details.name,
                    address: details.address,
                    address2: details.address2,
                    city: details.city,
                    state: details.state,
                    zip: details.zip,
                    location: {
                        lat: details.location.lat,
                        lon: details.location.lon
                    },
                    hours,
                    services: details.services.join('. ')
                }
            })
        })
        .catch((error) => {
            throw error;
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.updated && this.state.updated) {
            fetch(`/store-api/store/id/${this.props.match.params.id}`)
            .then((response) => {
                return response.json();     
            })
            .then((details) => {
                const hours = details.hours.split('; ').reduce((accumulator, dayHours) => {
                    const [key, value] = dayHours.split(': ');
                    accumulator[key] = value;
                    return accumulator;
                }, {});

                this.setState({
                    details,
                    editedDetails: {
                        id: details.id,
                        type: details.type,
                        name: details.name,
                        address: details.address,
                        address2: details.address2,
                        city: details.city,
                        state: details.state,
                        zip: details.zip,
                        location: {
                            lat: details.location.lat,
                            lon: details.location.lon
                        },
                        hours,
                        services: details.services.join('. ')
                    },
                    updated: false
                })
            })
            .catch((error) => {
                throw error;
            })
        }
    }

    startEditing = () => {
        this.setState({
            editing: true
        })
    }

    deleteStore = () => {
        fetch(`/store-api/store/id/7${this.props.match.params.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => {
            throw error;
        })
    }

    handleInputChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            editedDetails: {
                ...this.state.editedDetails,
                [name]: value
            }
        })
    }

    handleLocationChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            editedDetails: {
                ...this.state.editedDetails,
                location: {
                    ...this.state.editedDetails.location,
                    [name]: value
                }
            }
        })
    }

    handleHoursChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            editedDetails: {
                ...this.state.editedDetails,
                hours: {
                    ...this.state.hours,
                    [name]: value
                }
            }
        })
    }


    updateStore = () => {
        const hours = Object.keys(this.state.editedDetails.hours).reduce((accumulator, day, index, arr) => {
            if (index === arr.length - 1) {
                return `${accumulator} ${day}: ${this.state.editedDetails.hours[day]}`
            }

            return index === 0 ? `${day}: ${this.state.editedDetails.hours[day]};` : `${accumulator} ${day}: ${this.state.editedDetails.hours[day]};`
        }, '');

        const services = this.state.editedDetails.services.split('. ').slice(0, -1);

        const body = JSON.stringify({
            ...this.state.editedDetails,
            hours,
            services
        })

        fetch('/store-api/store/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        .then(() => {
            this.setState({
                editing: false,
                updated: true
            })
        })
        .catch((error) => {
            throw error;
        })
    }

    render() {
        const storeDetails = this.state.details;

        return (
            <>
                <Link to={'/'}>Back to Stores</Link>
                <h3>{storeDetails.name}</h3>

                {
                    this.state.editing ? (
                        <>
                            <Link to={'/'}>Back to Stores</Link>
                            <form>
                                <label>
                                    Type:
                                    <input
                                        name="type"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.type}
                                    />
                                </label>
                                <label>
                                    Name:
                                    <input
                                        name="name"
                                        onChange={this.handleInputChange}
                                        value={this.state.editedDetails.name}
                                    />
                                </label>
                                <label>
                                    Address:
                                    <input
                                        name="address"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.address}
                                    />
                                </label>
                                <label>
                                    Address2:
                                    <input
                                        name="address2"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.address2}
                                    />
                                </label>
                                <label>
                                    City:
                                    <input
                                        name="city"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.city}
                                    />
                                </label>
                                <label>
                                    State:
                                    <input
                                        name="state"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.state}
                                    />
                                </label>
                                <label>
                                    Zip:
                                    <input
                                        name="zip"
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.zip}
                                    />
                                </label>
                                <label>
                                    Location:
                                    <label>
                                        Lat:
                                        <input
                                            name="lat"
                                            onChange={this.handleLocationChange} 
                                            value={this.state.editedDetails.location.lat}
                                        />
                                    </label>
                                    <label>
                                        Lon:
                                        <input
                                            name="lon"
                                            onChange={this.handleLocationChange} 
                                            value={this.state.editedDetails.location.lon}
                                        />
                                    </label>
                                </label>
                                <label className='hours'>
                                    Hours:
                                    <label>
                                        Mon:
                                        <input
                                            name="Mon"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Mon}
                                    />
                                    </label>
                                    <label>
                                        Tue:
                                        <input
                                            name="Tue"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Tue}
                                    />
                                    </label>
                                    <label>
                                        Wed:
                                        <input
                                            name="Wed"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Wed}
                                    />
                                    </label>
                                    <label>
                                        Thu:
                                        <input
                                            name="Thu"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Thu}
                                    />
                                    </label>
                                    <label>
                                        Fri:
                                        <input
                                            name="Fri"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Fri}
                                    />
                                    </label>
                                    <label>
                                        Sat:
                                        <input
                                            name="Sat"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Sat}
                                    />
                                    </label>
                                    <label>
                                        Sun:
                                        <input
                                            name="Sun"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Sun}
                                    />
                                    </label>
                                </label>
                                <label>
                                    Services:
                                    <textarea
                                        name="services"
                                        placeholder='Enter services seperated by a period followed by space. Example: "Service1. Service2. Service3"'
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.services}
                                    />
                                </label>
                            </form>
                        </>
                    ) : (
                        <>
                            <div>
                                <h4>Type</h4>
                                <span>{storeDetails.type}</span>
                            </div>
                            <div>
                                <h4>Name</h4>
                                <span>{storeDetails.name}</span>
                            </div>
                            <div>
                                <h4>Address</h4>
                                <span>{storeDetails.address}</span>
                            </div>
                            <div>
                                <h4>Address2</h4>
                                <span>{storeDetails.address2}</span>
                            </div>
                            <div>
                                <h4>City</h4>
                                <span>{storeDetails.city}</span>
                            </div>
                            <div>
                                <h4>State</h4>
                                <span>{storeDetails.state}</span>
                            </div>
                            <div>
                                <h4>Zip</h4>
                                <span>{storeDetails.zip}</span> 
                            </div>
                            <div>
                                <h4>Location</h4>
                                <div className='location-details'>
                                    <label>
                                        Lat: 
                                        <span>{storeDetails.location.lat}</span>
                                    </label>
                                    <label>
                                        Lon: 
                                        <span>{storeDetails.location.lon}</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h4>Services</h4>
                                <ul>
                                    {
                                        storeDetails.services.map((service) => {
                                            return <li key={service}>{service}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h4>Hours of operation</h4>
                                <ul>
                                    {
                                        storeDetails.hours.split('; ').map((value) => {
                                            return <li key ={value}>{value}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                    )
                }
                
                <div>
                    <button onClick={this.startEditing}>Edit</button>
                    <button onClick={this.deleteStore}>Delete</button>
                    <button onClick={this.updateStore}>Update</button>
                </div>
            </>
        )
    }

}

export const StoreDetails = withRouter(StoreDetailsBase);