import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './create-store.css';

class CreateStoreBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        }
    }

    handleInputChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleLocationChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            location: {
                ...this.state.location,
                [name]: value
            }
        })
    }

    handleHoursChange = (event) => {
        const {
            name,
            value
        } = event.target;

        this.setState({
            hours: {
                ...this.state.hours,
                [name]: value
            }
        })
    }


    handleCreate = () => {
        const hours = Object.keys(this.state.hours).reduce((accumulator, day, index, arr) => {
            if (index === arr.length - 1) {
                return `${accumulator} ${day}: ${this.state.hours[day]}`
            }

            return index === 0 ? `${day}: ${this.state.hours[day]};` : `${accumulator} ${day}: ${this.state.hours[day]};`
        }, '');

        const services = this.state.services.split('. ').slice(0, -1);

        const body = JSON.stringify({
            ...this.state,
            hours,
            services
        })

        fetch('/store-api/store/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => {
            throw error;
        })
    }

    render() {
        console.log(this.state);
        return (
            <>
                <Link to={'/'}>Back to Stores</Link>
                <form>
                    <label>
                        Type:
                        <input
                            name="type"
                            onChange={this.handleInputChange} 
                            value={this.state.type}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            name="address"
                            onChange={this.handleInputChange} 
                            value={this.state.address}
                        />
                    </label>
                    <label>
                        Address2:
                        <input
                            name="address2"
                            onChange={this.handleInputChange} 
                            value={this.state.address2}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            name="city"
                            onChange={this.handleInputChange} 
                            value={this.state.city}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            name="state"
                            onChange={this.handleInputChange} 
                            value={this.state.state}
                        />
                    </label>
                    <label>
                        Zip:
                        <input
                            name="zip"
                            onChange={this.handleInputChange} 
                            value={this.state.zip}
                        />
                    </label>
                    <label>
                        Location:
                        <label>
                            Lat:
                            <input
                                name="lat"
                                onChange={this.handleLocationChange} 
                                value={this.state.location.lat}
                            />
                        </label>
                        <label>
                            Lon:
                            <input
                                name="lon"
                                onChange={this.handleLocationChange} 
                                value={this.state.location.lon}
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
                                value={this.state.hours.Mon}
                        />
                        </label>
                        <label>
                            Tue:
                            <input
                                name="Tue"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Tue}
                        />
                        </label>
                        <label>
                            Wed:
                            <input
                                name="Wed"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Wed}
                        />
                        </label>
                        <label>
                            Thu:
                            <input
                                name="Thu"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Thu}
                        />
                        </label>
                        <label>
                            Fri:
                            <input
                                name="Fri"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Fri}
                        />
                        </label>
                        <label>
                            Sat:
                            <input
                                name="Sat"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Sat}
                        />
                        </label>
                        <label>
                            Sun:
                            <input
                                name="Sun"
                                placeholder='00:30-12:30'
                                onChange={this.handleHoursChange} 
                                value={this.state.hours.Sun}
                        />
                        </label>
                    </label>
                    <label>
                        Services:
                        <textarea
                            name="services"
                            placeholder='Enter services seperated by a period followed by space. Example: "Service1. Service2. Service3"'
                            onChange={this.handleInputChange} 
                            value={this.state.services}
                        />
                    </label>
                </form>
                <button onClick={this.handleCreate}>Submit</button>
            </>
        )
    }
}

export const CreateStore = withRouter(CreateStoreBase);