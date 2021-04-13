import React from 'react';
import styled from 'styled-components';
import {ResetBox} from '../../styles/grid.js';

import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import Map from './Map.js';

import {fetchGeocode} from "../../api/mapApi";

const Container = styled.section`
    ${ResetBox};
    padding: 50px 20px;
`;

const AddressSection = styled.article`
    position: relative;
`;

class Copy extends React.Component {
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
        this.setCenter = this.setCenter.bind(this);
    }

    dataChange(name, data) {
        this.setState({
            [name]: data
        });
    }

    addressChange(event) {
        this.setState({
            address: event.target.value
        });
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

    setCenter() {
        console.log(this.map.current.getCenter());
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
                    <SearchInput address={this.state.address}
                                 placeholder={this.state.placeholder}
                                 searchStatus={this.state.searchStatus}
                                 searchMessage={this.state.searchMessage}
                                 addressChange={this.addressChange}/>

                    <SearchResult addresses={this.state.addresses}
                                  setMap={this.setMap.bind(this)}/>
                </AddressSection>

                <button type="button">위치 재설정</button>
                <button type="button">다른 식당 검색</button>

                <Map ref={this.map}
                     lat={this.state.lat}
                     lng={this.state.lng}
                     dataChange={this.dataChange}/>
            </Container>
        )
    }
}

export default Copy;
