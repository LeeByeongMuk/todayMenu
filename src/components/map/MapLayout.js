import React from 'react';
import styled from 'styled-components';
import {ResetBox} from '../../styles/grid.js';

import Map from './Map.js';
import MapPanel from "./MapPanel";

const Container = styled.div`
    ${ResetBox};
    display: flex;
    flex-direction: row;
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
        level: 4,
        radius: 200
    }

    changeLatLng = (lat, lng) => {
        this.setState({
            lat: lat,
            lng: lng
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

    increaseCircleRadius = () => {
        if (this.state.radius >= 500) {
            alert('최대 범위 설정');
            return false;
        }

        this.setState((state) => {
            return {
                radius: state.radius + 50
            }
        });
    }

    decreaseCircleRadius = () => {
        if (this.state.radius <= 50) {
            alert('최소 범위 설정');
            return false;
        }

        this.setState((state) => {
            return {
                radius: state.radius - 50
            }
        });
    }

    render() {
        return (
            <Container>
                <Map ref={this.map}
                     lat={this.state.lat}
                     lng={this.state.lng}
                     level={this.state.level}
                     center={this.state.center}
                     radius={this.state.radius}
                     changeLatLng={this.changeLatLng}
                     changeCenter={this.changeCenter}/>

                <MapPanel changeMarker={this.changeMarker}
                          resetLocation={this.resetLocation}
                          increaseCircleRadius={this.increaseCircleRadius}
                          decreaseCircleRadius={this.decreaseCircleRadius}/>
            </Container>
        )
    }
}

export default MapSearch;
