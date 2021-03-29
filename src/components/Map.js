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
    padding-left: 15px;
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
    max-height: 200px;
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
            lat: '33.450701',
            lng: '126.570667'
        }

        this.addressChange = this.addressChange.bind(this);
        this.getAddresses = this.getAddresses.bind(this);
        this.getAddresses = debounce(this.getAddresses, 1000);
        this.setMap = this.setMap.bind(this);
    }

    loadCDN(callback) {
        let url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_KEY}&autoload=false`;

        let element = document.createElement('script');
        element.async = true;
        element.id = 'map-cdn'
        element.src = url;

        element.onload = () => {
            callback();
        }

        document.head.appendChild(element);
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
            console.log(res);
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
            const latlng = new window.kakao.maps.LatLng(this.state.lat, this.state.lng);
            this.map.setCenter(latlng);
        });
    }

    initMap() {
        this.loadCDN(() => {
            window.kakao.maps.load(() => {
                let container = document.getElementById('map');
                let options = {
                    center: new window.kakao.maps.LatLng(this.state.lat, this.state.lng),
                    zoom: 10
                }

                this.map = new window.kakao.maps.Map(container, options);
            });
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
                                    {address.address_name}
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
