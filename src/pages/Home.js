import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
`;

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.map = null;
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

    initMap() {
        this.loadCDN(() => {
            this.map = new window.naver.maps.Map('map', {
                center: new window.naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 10
            });
        })
    }

    componentDidMount() {
        this.initMap();
    }

    render() {
        return (
            <React.Fragment>
                <MapContainer id={'map'}></MapContainer>
            </React.Fragment>
        )
    }
}
