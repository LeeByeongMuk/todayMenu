import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.article`
    width: 100%;
    height: 400px;
    margin-top: 20px;
`;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.map = null;
        this.ps = null;

        this.setMap = this.setMap.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.placesSearchCB = this.placesSearchCB.bind(this);
        this.displayMarker = this.displayMarker.bind(this);
    }

    loadCDN(callback) {
        let url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_KEY}&autoload=false&libraries=services`;

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

    initMap() {
        this.loadCDN(() => {
            window.kakao.maps.load(() => {
                let container = document.getElementById('map');
                let options = {
                    center: new window.kakao.maps.LatLng(this.props.lat, this.props.lng),
                    level: 1
                }

                this.map = new window.kakao.maps.Map(container, options);
            });
        });
    }

    setMap() {
        const latlng = new window.kakao.maps.LatLng(this.props.lat, this.props.lng);
        this.map.setCenter(latlng);
        this.getMenu();
    }

    getMenu() {
        this.ps = new window.kakao.maps.services.Places(this.map);
        this.ps.categorySearch('FD6', this.placesSearchCB, {useMapBounds: true});
    }

    placesSearchCB(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < data.length; i++) {
                this.displayMarker(data[i]);
            }
        }
    }

    displayMarker(place) {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
            clickable: true
        });

        let infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding: 10px 25px 10px 10px">${place.place_name}</div>`,
            removable: true
        });

        window.kakao.maps.event.addListener(marker, 'click', this.makeOverListener(this.map, marker, infowindow));
    }

    makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    componentDidMount() {
        this.initMap();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillMount() {
        this.removeCDN();
    }

    render() {
        return (
            <MapContainer id={'map'}></MapContainer>
        )
    }
}

export default Map;
