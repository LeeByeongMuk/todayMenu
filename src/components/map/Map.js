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
        this.geocoder = null;
        this.markers = [];

        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.setMap = this.setMap.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.searchAddrFromCoords = this.searchAddrFromCoords.bind(this);
        this.placesSearchCB = this.placesSearchCB.bind(this);
        this.displayMarker = this.displayMarker.bind(this);
        this.displayCenterInfo = this.displayCenterInfo.bind(this);
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
                    level: 2
                }

                this.map = new window.kakao.maps.Map(container, options);
                this.geocoder = new window.kakao.maps.services.Geocoder();

                this.getCurrentLocation();

                window.kakao.maps.event.addListener(this.map, 'dragend', () => {
                    this.getMenu();
                    this.searchAddrFromCoords(this.map.getCenter());
                });
            });
        });
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            const success = (position) => {
                let lat = position.coords.latitude,
                    lng = position.coords.longitude;
                let locPosition = new window.kakao.maps.LatLng(lat, lng);

                this.map.setCenter(locPosition);
                this.getMenu();
                this.searchAddrFromCoords(this.map.getCenter());
            };

            const error = (err) => {
                console.log(err);
            };

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }

    searchAddrFromCoords(coords) {
        // 좌표로 행정동 주소 정보를 요청합니다
        this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo);
    }

    setMap() {
        const latlng = new window.kakao.maps.LatLng(this.props.lat, this.props.lng);
        this.map.setCenter(latlng);
        this.getMenu();
    }

    getMenu() {
        this.ps = new window.kakao.maps.services.Places(this.map);
        this.ps.categorySearch('FD6', this.placesSearchCB, {
            radius: 500,
            useMapCenter: true,
            useMapBounds: true
        });
    }

    placesSearchCB(data, status) {
        if (status === window.kakao.maps.services.Status.OK) {
            this.clearMarkers(); // 기존 마커 제거
            const randomKey = Math.floor(Math.random() * data.length);

            for (let i = 0; i < data.length; i++) {
                const place = data[i];
                let locPosition = new window.kakao.maps.LatLng(place.y, place.x);
                const visible = (randomKey === i);

                this.displayMarker(locPosition, place.place_name, visible);
            }
        }
    }

    clearMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }

        this.markers = [];
    }

    displayMarker(locPosition, message, visible) {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: locPosition,
            clickable: true
        });

        marker.setVisible(visible);

        let infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding: 10px 25px 10px 10px">${message}</div>`,
            removable: true
        });

        window.kakao.maps.event.addListener(marker, 'click', this.makeOverListener(this.map, marker, infowindow));
        this.markers.push(marker);
    }

    displayCenterInfo(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    this.props.dataChange('address', result[i].address_name);
                    break;
                }
            }
        }
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
