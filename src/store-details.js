import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import storesData from './stores.json';
import {Link} from 'react-router-dom';
import './store-details.css';
import {Button, Container, Row, Col, Form} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 


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
                    Thurs: '',
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

            const storeServices = details.services;

            const services = storeServices.length ? (storeServices.length === 1 ? `${storeServices[0]}.` : `${storeServices.join('.')}.`) : storeServices;

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
                    services
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

                const storeServices = details.services;

                const services = storeServices.length ? (storeServices.length === 1 ? `${storeServices[0]}.` : `${storeServices.join('.')}.`) : storeServices;
    

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
                        services
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

    startCancel = () => {
        const details = this.state.details;
        const hours = details.hours.split('; ').reduce((accumulator, dayHours) => {
            const [key, value] = dayHours.split(': ');
            accumulator[key] = value;
            return accumulator;
        }, {});

        const storeServices = details.services;

        const services = storeServices.length ? (storeServices.length === 1 ? `${storeServices[0]}.` : `${storeServices.join('.')}.`) : storeServices;

        this.setState({
            editing: false,
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
                services
            }
        })

    }

    deleteStore = () => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`/store-api/store/delete/${this.props.match.params.id}`, {
                            method: 'DELETE'
                        })
                        .then(() => {
                            this.props.history.push('/');
                        })
                        .catch((error) => {
                            throw error;
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () =>{}
                }
            ]
        });


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
                    ...this.state.editedDetails.hours,
                    [name]: value
                }
            }
        })
    }


    updateStore = () => {
        console.log(this.state.editedDetails.hours);
        const hours = Object.keys(this.state.editedDetails.hours).reduce((accumulator, day, index, arr) => {
            if (index === arr.length - 1) {
                return `${accumulator} ${day}: ${this.state.editedDetails.hours[day]}`
            }

            return index === 0 ? `${day}: ${this.state.editedDetails.hours[day]};` : `${accumulator} ${day}: ${this.state.editedDetails.hours[day]};`
        }, '');

        const services = this.state.editedDetails.services.split('.').slice(0, -1);

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
                {
                    this.state.editing ? (
                        <>
                        <Container>
                            <Row>
                                <Col className="App-header">
                            StoreDetails Edit
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Store Name:  
                                                            <input
                                                                name="name"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.name}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Store Type:  
                                                            <input
                                                                name="type"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.type}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Address:  
                                                            <input
                                                                name="address"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.address}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Address2:  
                                                            <input
                                                                name="address2"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.address2}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>City:  
                                                            <input
                                                                name="city"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.city}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>State:  
                                                            <input
                                                                name="state"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.state}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col>
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Zip:  
                                                            <input
                                                                name="zip"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.zip}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                            <Col xs="2">
                                                <b>Location:</b>
                                            </Col>
                                            <Col xs="5">
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Lat:  
                                                            <input
                                                                name="lat"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.location.lat}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs="5">
                                                <Form.Group controlId="formGroupStore">
                                                    <Form.Label>Lon:  
                                                            <input
                                                                name="lon"
                                                                onChange={this.handleInputChange} 
                                                                value={this.state.editedDetails.location.lon}
                                                            />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                    </Form.Row>
                                    <Form.Row>
                                                <b>Hours:</b>
                                    </Form.Row>
                                    <Form.Row>      
                                            <Col >
                                  <label >
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
                                            name="Thurs"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.editedDetails.hours.Thurs}
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
                                            </Col>
                                    </Form.Row>

                                    <Form.Row>
                                        <Col>
                                        <label>
                                            Services:
                                        </label>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                    <textarea
                                        name="services"
                                        placeholder='Enter services seperated by a period . Example: "Service1.Service2.Service3."'
                                        onChange={this.handleInputChange} 
                                        value={this.state.editedDetails.services}
                                        rows="4"
                                        cols="100"
                                        
                                    />
                                        
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <em>Enter services seperated by a period . Example: Service1.Service2.Service3.</em>
                                        </Col>
                                    </Form.Row>
                                </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="3">

                    <Button onClick={this.updateStore}>Update</Button>
                                </Col>
                                <Col xs="3">
                                </Col>
                                <Col xs="6">
                    <Button onClick={this.startCancel}>Cancel</Button>
                                </Col>
                            </Row>
                 </Container>
                        </>
                    ) : (
                        <>
                        <Container>
                            <Row>
                                <Col className="App-header">
                            StoreDetails
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b>Store Name</b> <span> : {storeDetails.name}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b>Store Type</b> <span> : {storeDetails.type}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b> Address</b> <span> : {storeDetails.address}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b>Address2</b> <span> : {storeDetails.address2}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b> City</b> <span> : {storeDetails.city}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b> State</b> <span> : {storeDetails.state}</span>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                <b> Zip</b> <span> : {storeDetails.zip}</span>
                                </Col>
                                
                            </Row>
                            <Row>
                                
                                
                            </Row>
                            <Row>

                            <Col xs="2">
                                <b> Location -></b> 
                                    
                                </Col>
                                        <Col>
                                        <b> Lattitude</b> <span> : {storeDetails.location.lat}</span>
                                        </Col>
                                        <Col>
                                        <b> Longitude</b> <span> : {storeDetails.location.lon}</span>
                                        </Col>
                            </Row>
                            <Row>
                                <Col>
                                <b> Services </b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <ul>
                                    {
                                        storeDetails.services.map((service) => {
                                            return <li key={service}>{service}</li>
                                        })
                                    }
                                </ul>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                <b> Hours of operation </b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <ul>
                                    {
                                        storeDetails.hours.split('; ').map((value) => {
                                            return <li key ={value}>{value}</li>
                                        })
                                    }
                                </ul>
                                </Col>
                                
                            </Row>

                            <Row>
                                <Col xs="3">
                    <Button onClick={this.startEditing}>Edit</Button>
                                </Col>
                                <Col xs="3">
                                </Col>
                                <Col xs="6">
                    <Button color="danger" onClick={this.deleteStore}>Delete</Button>
                                </Col>
                            </Row>
                </Container>
                        </>
                    )
                }
                
                
            </>
        )
    }

}

export const StoreDetails = withRouter(StoreDetailsBase);