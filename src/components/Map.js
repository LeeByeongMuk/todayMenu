import React from 'react';
import styled from 'styled-components';

import debounce from '../util/debounce.js';

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
`;

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.map = null;
        this.marker = null;

        this.state = {
            addresses: []
        }

        this.addressChange = this.addressChange.bind(this);
        this.getAddresses = this.getAddresses.bind(this);
        this.getAddresses = debounce(this.getAddresses, 1000);
    }

    loadCDN(callback) {
        let url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCLOUD_CLIENT_ID}`;

        let element = document.createElement('script');
        element.async = true;
        element.src = url;

        element.onload = () => {
            callback();
        }

        document.body.appendChild(element);
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
            console.log(res.addresses);
            this.setState({
                addresses: res.addresses
            });
        });
    }

    initMap() {
        this.loadCDN(() => {
            this.map = new window.naver.maps.Map('map', {
                center: new window.naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 17
            });

            this.marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(37.3595704, 127.105399),
                map: this.map
            });
        });
    }

    componentDidMount() {
        this.initMap();
    }

    render() {
        return (
            <React.Fragment>
                <input type="text"
                    name="address"
                    value={this.state.address}
                    onChange={this.addressChange} />
                <section>
                    <ul>
                        { this.state.addresses.map((address, index) => {
                            return (
                                <li key={index}>{ address.jibunAddress }</li>
                            );
                        })}
                        <li>

                        </li>
                    </ul>
                </section>
                <MapContainer id={'map'}></MapContainer>
            </React.Fragment>
        )
    }
}
