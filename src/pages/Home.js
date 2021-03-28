import React from 'react';

import Map from '../components/Map.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.address = null;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Map address={this.address} />
            </React.Fragment>
        )
    }
}
