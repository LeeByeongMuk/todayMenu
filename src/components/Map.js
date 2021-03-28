import React from 'react';
import styled from 'styled-components';

import debounce from '../util/debounce.js';

const Container = styled.section`
    overflow: hidden;
    padding: 50px 20px;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
    margin-top: 20px;
`;

const AddressSection = styled.article`
    position: relative;
`;

const AddressInput = styled.input`
    width: 100%;
    height: 30px;
    padding-left: 10px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
`;

const AddressList = styled.ul`
    display: ${props => props.visibility ? 'block' : 'none'};
    overflow-y: scroll;
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    background: #fff;
    box-sizing: border-box;
`;

const AddressListItem = styled.li`
    padding: 5px 0 5px 20px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        background: #2a3b4b;
        color: #fff;
    }
`;

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.map = null;
        this.marker = null;

        this.state = {
            addresses: [],
            lat: '37.3595704',
            lng: '127.105399'
        }

        this.addressChange = this.addressChange.bind(this);
        this.getAddresses = this.getAddresses.bind(this);
        this.getAddresses = debounce(this.getAddresses, 1000);
        this.setMap = this.setMap.bind(this);
    }

    loadCDN(callback) {
        let url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCLOUD_CLIENT_ID}`;

        let element = document.createElement('script');
        element.async = true;
        element.id = 'map-cdn'
        element.src = url;

        element.onload = () => {
            callback();
        }

        document.body.appendChild(element);
    }

    removeCDN() {
        let element = document.getElementById('map-cdn');

        if (element) {
            element.remove();
        }
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
            const latlng = new window.naver.maps.LatLng(this.state.lat, this.state.lng);
            this.map.setCenter(latlng);
        });
    }

    initMap() {
        this.loadCDN(() => {
            this.map = new window.naver.maps.Map('map', {
                center: new window.naver.maps.LatLng(this.state.lat, this.state.lng),
                zoom: 17
            });

            // this.marker = new window.naver.maps.Marker({
            //     position: new window.naver.maps.LatLng(this.state.lat, this.state.lng),
            //     map: this.map
            // });
        });
    }

    componentDidMount() {
        this.initMap();
    }

    componentWillMount() {
        this.removeCDN();
    }

    render() {
        return (
            <Container>
                <AddressSection>
                    <AddressInput type="text"
                        name="address"
                        value={this.state.address}
                        onChange={this.addressChange} />

                    <AddressList visibility={this.state.addresses.length > 0 ? 1 : 0}>
                        { this.state.addresses.map((address, index) => {
                            return (
                                <AddressListItem key={index}
                                    data-lat={address.y}
                                    data-lng={address.x}
                                    onClick={this.setMap}>
                                    {address.jibunAddress}
                                </AddressListItem>
                            )
                        })}
                    </AddressList>
                </AddressSection>
                <MapContainer id={'map'}></MapContainer>
            </Container>
        )
    }
}
