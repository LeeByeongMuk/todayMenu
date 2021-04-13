import React from 'react';
import styled from 'styled-components';
import {ResetBox} from '../../styles/grid.js';

import ControllerSection from "./ControllerSection.js";
import Map from './Map.js';

const Container = styled.section`
    ${ResetBox};
    padding: 50px 20px;
`;

class MapSearch extends React.Component {
    map = React.createRef();

    state = {
        lat: '33.450701',
        lng: '126.570667',
        center: {
            lat: '33.450701',
            lng: '126.570667'
        },
        level: 2
    }

    changeLatLng = (lat, lng) => {
        this.setState({
            lat: lat,
            lng: lng,
            center: {
                lat: lat,
                lng: lng
            }
        });
    }

    changeCenter = (lat, lng) => {
        this.setState({
            center: {
                lat: lat,
                lng: lng
            }
        });
    }

    changeMarker = () => {
        this.map.current.randomMarker();
    }

    resetLocation = () => {
        const lat = this.state.center.lat;
        const lng = this.state.center.lng;

        this.setState({
            lat: lat,
            lng: lng
        })
    }

    render() {
        return (
            <Container>
                <ControllerSection lat={this.state.lat}
                                   lng={this.state.lng}
                                   changeLatLng={this.changeLatLng}
                                   changeMarker={this.changeMarker}
                                   resetLocation={this.resetLocation}/>

                <Map ref={this.map}
                     lat={this.state.lat}
                     lng={this.state.lng}
                     level={this.state.level}
                     center={this.state.center}
                     changeLatLng={this.changeLatLng}
                     changeCenter={this.changeCenter}/>
            </Container>
        )
    }
}

export default MapSearch;
