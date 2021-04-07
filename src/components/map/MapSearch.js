import React from 'react';
import styled from 'styled-components';
import { ResetBox } from '../../styles/grid.js';

import AddressInput from './AddressInput.js';
import AddressList from './AddressList.js';
import Map from './Map.js';

import debounce from '../../util/debounce.js';

const Container = styled.section`
    ${ResetBox}
    padding: 50px 20px;
`;

const AddressSection = styled.article`
    position: relative;
`;

class MapSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            addresses: [],
            lat: '33.450701',
            lng: '126.570667'
        }

        this.map = React.createRef();

        this.getAddresses = this.getAddresses.bind(this);
        this.getAddresses = debounce(this.getAddresses, 1000);
    }

    addressChange(event) {
        this.getAddresses(event.target.value);
    }

    getAddresses(value) {
        if (!value) return false;

        const params = new URLSearchParams({
            address: value
        });

        fetch(`${process.env.REACT_APP_API_URL}/api/map/geocode?${params}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                addresses: res.addresses
            });
        });
    }

    setMap(event) {
        const target = event.target;

        this.setState({
            lat: target.dataset.lat,
            lng: target.dataset.lng,
            addresses: []
        }, () => {
            this.map.current.setMap();
        });
    }

    render() {
        return (
            <Container>
                <AddressSection>
                    <AddressInput type="text"
                        address={this.state.address}
                        addressChange={this.addressChange.bind(this)} />

                    <AddressList addresses={this.state.addresses}
                        setMap={this.setMap.bind(this)} />
                </AddressSection>

                <Map ref={this.map}
                    lat={this.state.lat}
                    lng={this.state.lng} />
            </Container>
        )
    }
}

export default MapSearch;
