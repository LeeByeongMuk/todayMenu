import React from 'react';
import styled from 'styled-components';
import {ResetBox} from '../../styles/grid.js';

import AddressInput from './AddressInput.js';
import AddressList from './AddressList.js';
import Map from './Map.js';

import {fetchGeocode} from "../../api/mapApi";

import debounce from '../../util/debounce.js'

const Container = styled.section`
    ${ResetBox};
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
            searchStatus: false,
            searchMessage: '',
            placeholder: '주소를 입력해 주세요.',
            lat: '33.450701',
            lng: '126.570667'
        }

        this.map = React.createRef();

        this.dataChange = this.dataChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.getAddresses = this.getAddresses.bind(this);
        this.getAddresses = debounce(this.getAddresses, 1000);
    }

    dataChange(name, data) {
        this.setState({
            [name]: data
        });
    }

    addressChange(event) {
        this.getAddresses(event.target.value);
    }

    async getAddresses(value) {
        if (!value) return false;

        const params = {
            address: value
        };

        const response = await fetchGeocode(params);

        if (response.success) {
            const addresses = response.data.addresses;
            let message = '',
                status = false;

            if (addresses.length === 0) {
                message = '검색 결과가 없습니다.';
            }

            this.setState({
                addresses: addresses,
                searchStatus: status,
                searchMessage: message
            });
        } else {
            console.log('오류');
        }
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
                    <AddressInput address={this.state.address}
                                  placeholder={this.state.placeholder}
                                  searchStatus={this.state.searchStatus}
                                  searchMessage={this.state.searchMessage}
                                  addressChange={this.addressChange}/>

                    <AddressList addresses={this.state.addresses}
                                 setMap={this.setMap.bind(this)}/>
                </AddressSection>

                <Map ref={this.map}
                     lat={this.state.lat}
                     lng={this.state.lng}
                     dataChange={this.dataChange}/>
            </Container>
        )
    }
}

export default MapSearch;
