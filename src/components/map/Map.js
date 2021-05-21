import React from 'react';
import styled from 'styled-components';

import {FontColor, PageColor} from '../../styles/variable.js';

const MapContainer = styled.article`
    width: 100%;
    height: 100vh;
`;

class Map extends React.Component {
    map = null;
    ps = null;
    markers = [];
    currentMarker = null;
    circle = null;

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
            window.kakao.maps.load(async () => {
                let container = document.getElementById('map');
                const latlng = await this.getCurrentLocation();
                let options = {
                    center: latlng,
                    level: this.props.level
                };

                this.map = new window.kakao.maps.Map(container, options);
                this.props.changeLatLng(latlng.Ma, latlng.La);
                this.props.changeCenter(latlng.Ma, latlng.La);
                this.setCurrentMarker(latlng.Ma, latlng.La);
                this.getMenu();
                this.setCircle({
                    map: this.map,
                    center: latlng,
                    radius: 500,
                    strokeWeight: 2,
                    strokeColor: '#FF00FF',
                    strokeOpacity: 0.4,
                    strokeStyle: 'dashed',
                    fillColor: '#00EEEE',
                    fillOpacity: 0.2
                });

                let zoomControl = new window.kakao.maps.ZoomControl();
                this.map.addControl(zoomControl, window.kakao.maps.ControlPosition.LEFT);

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
        this.setCurrentMarker(lat, lng);
        this.setCircle({
            center: locPosition,
        });

        this.getMenu();
    }

    // geolocation 작업
    getCurrentLocation = async () => {
        let lat, lng;

        if (navigator.geolocation) {
            try {
                const position = await this.getCurrentPosition();
                lat = position.coords.latitude;
                lng = position.coords.longitude;
            } catch (e) {
                lat = this.props.center.lat;
                lng = this.props.center.lng;
            }
        } else {
            lat = this.props.center.lat;
            lng = this.props.center.lng;
        }

        return new window.kakao.maps.LatLng(lat, lng);
    }

    setCurrentMarker = (lat, lng) => {
        if (this.currentMarker) {
            this.currentMarker.marker.setMap(null);
            this.currentMarker.infowindow.close();
            this.currentMarker = [];
        }

        let markerPosition = new window.kakao.maps.LatLng(lat, lng);
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: markerPosition,
            title: '현재 검색 위치'
        });
        let infowindow = new window.kakao.maps.InfoWindow({
            position: markerPosition,
            content: '현재 검색 위치'
        });
        infowindow.open(this.map, marker);

        this.currentMarker = {
            marker: marker,
            infowindow: infowindow
        }
    }

    setCircle(options) {
        if (this.circle) {
            this.circle.setOptions(options);
        } else {
            this.circle = new window.kakao.maps.Circle(options);
        }
    }

    getCurrentPosition = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        })
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

                this.displayMarker(locPosition, place, visible);
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
    displayMarker = (locPosition, place, visible) => {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: locPosition,
            clickable: true
        });

        marker.setVisible(visible);

        const content = `<div style="max-width: 280px;padding: 5px 10px;font-size14px; line-height: 24px; ${FontColor};text-align: center;word-break: keep-all">
            <a href="${place.place_url}" style="font-weight: bold; font-size: 16px; color: ${PageColor}" target="_blank">
                ${place.place_name}
            </a><br>
            
            <p>주소: ${place.address_name}</p>
        </div>`;

        let infowindow = new window.kakao.maps.InfoWindow({
            content: content
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

    resizeMap = () => {
        let mapContainer = document.getElementById('map');
        mapContainer.style.width = document.body.clientWidth - 400 + 'px';
        mapContainer.style.width = '100%';
    }

    componentDidMount() {
        this.initMap();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((this.props.lat !== nextProps.lat ||
            this.props.lng !== nextProps.lng) &&
            (this.props.lat !== this.props.center.lat ||
                this.props.lng !== this.props.center.lng)) {
            this.setCenter(nextProps.lat, nextProps.lng);
        }

        if (this.props.showSection !== nextProps.showSection) {
            this.resizeMap();
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
