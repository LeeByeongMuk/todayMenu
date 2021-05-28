import React from 'react';
import styled from 'styled-components';
import {FontColor, PageColor} from "../../styles/variable";

const MapContainer = styled.article`
    width: 100%;
    height: 100vh;
`;

const kakaoMapUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JS_KEY}&autoload=false&libraries=services`;
const circleOptions = {
    strokeWeight: 2,
    strokeColor: '#FF00FF',
    strokeOpacity: 0.4,
    strokeStyle: 'dashed',
    fillColor: '#00EEEE',
    fillOpacity: 0.2
};
const categoryCode = 'FD6';

const removeCDN = () => {
    const element = document.getElementById('map-cdn');

    if (element) {
        element.remove();
    }
}

// geolocation 작업
const getCurrentLocation = async () => {
    let lat, lng;

    if (navigator.geolocation) {
        try {
            const position = await getCurrentPosition();
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

// get geolocation position
const getCurrentPosition = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

class Map extends React.Component {
    map = null;
    ps = null;
    markers = [];
    currentMarker = null;
    circle = null;

    loadCDN = (callback) => {
        let element = document.createElement('script');
        element.async = true;
        element.id = 'map-cdn';
        element.src = kakaoMapUrl;

        element.onload = () => {
            callback();
        }

        document.head.appendChild(element);
    }

    // map 초기 load 설정
    initMap = () => {
        this.loadCDN(() => {
            window.kakao.maps.load(async () => {
                const locPosition = await getCurrentLocation();
                const container = document.getElementById('map');
                const options = {
                    center: locPosition,
                    level: this.props.level
                };

                this.map = new window.kakao.maps.Map(container, options); // map 초기화
                this.props.changeLocation({
                    lat: locPosition.Ma,
                    lng: locPosition.La
                });
            });
        });
    }

    // center 위치 설정
    setCenter = ({lat, lng, radius}) => {
        const locPosition = new window.kakao.maps.LatLng(lat, lng);
        this.map.setCenter(locPosition);
        this.setCurrentMarker(locPosition);
        this.setCircle({
            center: locPosition,
            radius: radius || this.props.radius
        });
        this.getMenu({
            radius: radius || this.props.radius
        });
    }

    // 현재 위치 마커 설정
    setCurrentMarker = (locPosition) => {
        if (this.currentMarker) {
            this.currentMarker.setMap(null);
            this.currentMarker = null;
        }

        this.currentMarker = new window.kakao.maps.Marker({
            map: this.map,
            position: locPosition
        });
    }

    // 검색 범위 설정
    setCircle = (options) => {
        if (this.circle) {
            this.circle.setOptions(options);
        } else {
            this.circle = new window.kakao.maps.Circle({
                ...circleOptions,
                ...options,
                map: this.map
            });
        }
    }

    // 카테고리 검색 기능
    getMenu = ({radius}) => {
        const options = {
            radius: radius || this.props.radius,
            useMapCenter: true,
            useMapBounds: true
        }

        this.ps = new window.kakao.maps.services.Places(this.map);
        this.ps.categorySearch(categoryCode, this.placesSearchCB, options);
    }

    // 카테고리 검색 callback
    placesSearchCB = (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            this.clearMarkers();
            const randomKey = Math.floor(Math.random() * data.length);

            for (let i = 0; i < data.length; i++) {
                const place = data[i];
                const locPosition = new window.kakao.maps.LatLng(place.y, place.x);
                const visible = (randomKey === i);

                this.displayMarker(locPosition, place, visible);
            }
        }
    }

    // 마커 등록
    displayMarker = (locPosition, place, visible) => {
        let marker = new window.kakao.maps.Marker({
            map: this.map,
            position: locPosition,
            clickable: true
        });
        marker.setVisible(visible);

        // TODO:
        const content = `<div style="max-width: 280px; padding: 5px 10px; border: 1px solid rgb(118, 129, 168); background: #fff; font-size: 14px; line-height: 24px; color: ${FontColor}; text-align: center; word-break: keep-all">
            <a href="${place.place_url}" style="font-weight: bold; font-size: 16px; color: ${PageColor}" target="_blank">
                ${place.place_name}
            </a>
        </div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
            content: content,
            map: this.map,
            position: locPosition,
            yAnchor: 2.5
        });
        customOverlay.setVisible(visible);

        this.markers.push({
            visible: visible,
            marker: marker,
            overlay: customOverlay
        });
    }

    // 마커 램덤 변경
    randomMarker = () => {
        const visibleMarker = this.markers.filter(marker => marker.visible)[0];

        if (visibleMarker) { // TODO: 기능 개선 필요
            const markerIndex = this.markers.indexOf(visibleMarker);
            visibleMarker.marker.setVisible(false);
            visibleMarker.overlay.setVisible(false);
            this.markers[markerIndex].visible = false;
            // this.markers.splice(markerIndex, 1);
        }

        if (this.markers.length > 0) {
            const randomKey = Math.floor(Math.random() * this.markers.length);
            this.markers[randomKey].visible = true;
            this.markers[randomKey].marker.setVisible(true);
            this.markers[randomKey].overlay.setVisible(true);
        }
    }

    // 마커 삭제
    clearMarkers = () => {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
            this.markers[i].overlay.setMap(null);
        }

        this.markers = [];
    }

    componentDidMount() {
        this.initMap();
    }

    shouldComponentUpdate(nextProps) {
        const {lat, lng} = nextProps;
        const {lat: centerLat, lng: centerLng} = nextProps.center;

        if (lat === centerLat && lng === centerLng) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        this.setCenter({
            lat: this.props.lat,
            lng: this.props.lng,
            radius: this.props.radius
        });
    }

    componentWillMount() {
        removeCDN();
    }

    render() {
        return (
            <MapContainer id={'map'}></MapContainer>
        )
    }
}

export default Map;
