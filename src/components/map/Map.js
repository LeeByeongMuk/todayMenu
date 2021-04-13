import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.article`
  width: 100%;
  height: 400px;
  margin-top: 20px;
`;

class Map extends React.Component {
    map = null;
    ps = null;
    markers = [];

    state = {
        markerKey: ''
    }

    loadCDN = (callback) => {
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

    removeCDN = () => {
        let element = document.getElementById('map-cdn');

        if (element) {
            element.remove();
        }
    }

    initMap = () => {
        this.loadCDN(() => {
            window.kakao.maps.load(() => {
                let container = document.getElementById('map');
                let options = {
                    center: new window.kakao.maps.LatLng(this.props.center.lat, this.props.center.lng),
                    level: this.props.level
                }

                this.map = new window.kakao.maps.Map(container, options);

                this.getCurrentLocation();

                // center event 등록
                window.kakao.maps.event.addListener(this.map, 'dragend', () => {
                    const latlng = this.map.getCenter();
                    this.props.changeCenter(latlng.Ma, latlng.La);
                });
            });
        });
    }

    setCenter = (lat, lng) => {
        let locPosition = new window.kakao.maps.LatLng(lat, lng);
        this.props.changeLatLng(lat, lng);
        this.map.setCenter(locPosition);

        this.getMenu();
    }

    // geolocation 작업
    getCurrentLocation = () => {
        if (navigator.geolocation) {
            const success = (position) => {
                let lat = position.coords.latitude,
                    lng = position.coords.longitude;

                this.setCenter(lat, lng);
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

    // 카테고리 검색 기능
    getMenu = () => {
        // TODO: 개선 필요
        let option = {
            radius: 500,
            useMapCenter: true,
            useMapBounds: true
        }

        this.ps = new window.kakao.maps.services.Places(this.map);
        this.ps.categorySearch('FD6', this.placesSearchCB, option);
    }

    // 카테고리 검색 callback
    placesSearchCB = (data, status) => {
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

    // 마커 초기화
    clearMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
            this.markers[i].infowindow.close();
        }

        this.markers = [];
    }

    // 마커 등록
    displayMarker = (locPosition, message, visible) => {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: locPosition,
            clickable: true
        });

        marker.setVisible(visible);

        let infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding: 10px 15px">${message}</div>`
        });

        if (visible) {
            infowindow.open(this.map, marker);
        }

        this.markers.push({
            visible: visible,
            marker: marker,
            infowindow: infowindow
        });
    }

    randomMarker() {
        const visibleMarker = this.markers.filter(marker => marker.visible)[0];

        if (visibleMarker) {
            const markerIndex = this.markers.indexOf(visibleMarker);

            visibleMarker.marker.setMap(null);
            visibleMarker.infowindow.close();
            this.markers.splice(markerIndex, 1);
        }

        if (this.markers.length > 0) {
            const randomKey = Math.floor(Math.random() * this.markers.length);

            this.markers[randomKey].visible = true;
            this.markers[randomKey].marker.setVisible(true);
            this.markers[randomKey].infowindow.open(this.map, this.markers[randomKey].marker);
        }
    }

    componentDidMount() {
        this.initMap();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // TODO: 추후 개선
        if ((this.props.lat !== nextProps.lat ||
            this.props.lng !== nextProps.lng) &&
            (this.props.lat !== this.props.center.lat ||
            this.props.lng !== this.props.center.lng)) {
            this.setCenter(nextProps.lat, nextProps.lng);
        }

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
