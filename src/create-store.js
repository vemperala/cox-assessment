import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './create-store.css';
import {Button, Container, Row, Col, Form} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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
                Thurs: '',
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

        confirmAlert({
            title: 'Confirm to create',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const hours = Object.keys(this.state.hours).reduce((accumulator, day, index, arr) => {
                            if (index === arr.length - 1) {
                                return `${accumulator} ${day}: ${this.state.hours[day]}`
                            }
                
                            return index === 0 ? `${day}: ${this.state.hours[day]};` : `${accumulator} ${day}: ${this.state.hours[day]};`
                        }, '');
                
                        const services = this.state.services.split('.').slice(0, -1);
                
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
                },
                {
                    label: 'No',
                    onClick: () =>{}
                }
            ]
        });

    }

    cancel = () => {
        this.props.history.push('/');
    }


    render() {
        console.log(this.state);
        return (
            <>
                <Container>
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
                                                                value={this.state.name}
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
                                                                value={this.state.type}
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
                                                                value={this.state.address}
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
                                                                value={this.state.address2}
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
                                                                value={this.state.city}
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
                                                                value={this.state.state}
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
                                                                value={this.state.zip}
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
                                                                value={this.state.location.lat}
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
                                                                value={this.state.location.lon}
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
                                            name="Thurs"
                                            placeholder='00:30-12:30'
                                            onChange={this.handleHoursChange} 
                                            value={this.state.hours.Thurs}
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
                                        placeholder='Enter services seperated by a period . Example: Service1.Service2.Service3.'
                                        onChange={this.handleInputChange} 
                                        value={this.state.services}
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
                    <Button onClick={this.handleCreate}>Submit</Button>
                                </Col>
                                <Col xs="3">
                                </Col>
                                <Col xs="6">
                    <Button onClick={this.cancel}>Cancel</Button>
                                </Col>
                            </Row>
                 </Container>
            </>
        )
    }
}

export const CreateStore = withRouter(CreateStoreBase);