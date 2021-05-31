import React, {Component} from "react";
import styled from "styled-components";
import {ResetBox} from "../../constant/Grid";

import Map from "../../UI/organisms/Map"
import MapPanel from "../../UI/organisms/MapPanel";

const Container = styled.div`
    ${ResetBox};
    display: flex;
    flex-direction: row;
`;

class MapLayout extends Component {
    map = React.createRef();

    state = {
        lat: 33.450701,
        lng: 126.570667,
        center: {
            lat: 33.450701,
            lng: 126.570667
        },
        level: 4,
        radius: 200
    }

    changeLocation = ({lat, lng}) => {
        this.setState({
            lat: lat,
            lng: lng,
            center: {
                lat: lat,
                lng: lng
            }
        })
    }

    changeMarker = () => {
        this.map.current.randomMarker();
    }

    resetLocation = () => {
        const {Ma: lat, La: lng} = this.map.current.map.getCenter();

        this.setState({
            lat: lat,
            lng: lng,
            center: {
                lat: lat,
                lng: lng
            }
        })
    }

    increaseCircleRadius = () => {
        if (this.state.radius >= 800) {
            alert('최대 범위 설정');
            return false;
        }

        this.setState((state) => {
            return {
                radius: state.radius * 2
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
                radius: state.radius / 2
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.lat === nextState.center.lat &&
            nextState.lng === nextState.center.lng) {
            return true;
        }

        return false;
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
                     changeLocation={this.changeLocation}/>

                <MapPanel changeMarker={this.changeMarker}
                          resetLocation={this.resetLocation}
                          increaseCircleRadius={this.increaseCircleRadius}
                          decreaseCircleRadius={this.decreaseCircleRadius}/>
            </Container>
        )
    }
}

export default MapLayout;
