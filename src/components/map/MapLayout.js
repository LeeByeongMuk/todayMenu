import React from 'react';
import styled from 'styled-components';
import {ResetBox} from '../../styles/grid.js';

import ControllerSection from "./ControllerSection.js";
import Map from './Map.js';

const Container = styled.div`
    ${ResetBox};
    display: flex;
    flex-direction: row;
`;

class MapSearch extends React.Component {
    controller = React.createRef();
    map = React.createRef();

    state = {
        showSection: false,
        lat: '33.450701',
        lng: '126.570667',
        center: {
            lat: '33.450701',
            lng: '126.570667'
        },
        level: 2
    }

    toggleSection = () => {
        this.setState((state) => ({
            showSection: !state.showSection
        }));
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
                <ControllerSection ref={this.controller}
                                   showSection={this.state.showSection}
                                   lat={this.state.lat}
                                   lng={this.state.lng}
                                   toggleSection={this.toggleSection}
                                   changeLatLng={this.changeLatLng}
                                   changeMarker={this.changeMarker}
                                   resetLocation={this.resetLocation}/>

                <Map ref={this.map}
                     showSection={this.state.showSection}
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
