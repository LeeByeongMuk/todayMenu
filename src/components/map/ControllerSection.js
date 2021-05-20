import React from 'react';
import styled from 'styled-components';

// component
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";

// api
import {fetchGeocode} from "../../api/mapApi";

import {ResetBox} from '../../styles/grid.js';
import {PageColor, White} from '../../styles/variable.js';

// styled components
const Layout = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: auto;
    height: calc(100vh - 60px);
`;

const ControllerWrapper = styled.aside`
    display: ${props => props.visibility ? 'block' : 'none'};
    width: ${props => props.visibility ? '400px' : '0'};
    height: 100%;
    padding: 25px 15px;
    border-right: 2px solid ${PageColor};
    background: ${White};
    box-sizing: border-box;
`;

const AddressSection = styled.article`
    position: relative;
`;

const ButtonWrapper = styled.section`
    ${ResetBox};

    margin-top: 12px;
`;

const ButtonFold = styled.button`
    position: absolute;
    right: -36px;
    z-index: 10000;
    width: 36px;
    height: 68px;
    border: 0;
    background: ${PageColor};
    font-size: 28px;
    color: ${White};
    outline: none;
`;

class ControllerSection extends React.Component {
    geocoder = null;

    state = {
        address: '',
        searchResult: [],
        placeholder: '주소를 입력해 주세요.'
    };

    // 주소 검색창 데이터 수정 이벤트
    changeAddress = (event) => {
        this.setState({
            address: event.target.value
        });
    }

    // 검색 결과 클릭 이벤트
    changeLatLng = (event) => {
        const target = event.target;

        this.setState({
            searchResult: []
        }, () => {
            this.props.changeLatLng(target.dataset.lat, target.dataset.lng);
        })

    }

    // 주소 검색
    getSearchResult = async () => {
        if (!this.state.address) return false;

        const params = {
            address: this.state.address
        };

        const response = await fetchGeocode(params);

        if (response.success) {
            const addresses = response.data.addresses;
            this.setState({
                searchResult: addresses
            });
        } else {
            this.setState({
                searchResult: []
            })
        }
    }

    // 좌표 주소 변환
    searchAddrFromCoords = () => {
        if (!this.geocoder) {
            this.geocoder = new window.kakao.maps.services.Geocoder();
        }

        // 좌표로 행정동 주소 정보를 요청합니다
        // this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), this.displayCenterInfo);
    }

    displayCenterInfo = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    // this.props.dataChange('address', result[i].address_name);
                    break;
                }
            }
        }
    }

    render() {
        return (
            <Layout>
                <ControllerWrapper visibility={this.props.showSection ? 1 : 0}>
                    <AddressSection>
                        {/*검색창*/}
                        <SearchInput address={this.state.address}
                                     placeholder={this.state.placeholder}
                                     changeAddress={this.changeAddress}
                                     getSearchResult={this.getSearchResult}/>

                        {/*검색 결과*/}
                        <SearchResult searchResult={this.state.searchResult}
                                      changeLatLng={this.changeLatLng}/>
                    </AddressSection>

                    <ButtonWrapper>
                    </ButtonWrapper>
                </ControllerWrapper>

                <ButtonFold type="button" onClick={this.props.toggleSection}>
                    {this.props.showSection ? '<' : '>'}
                </ButtonFold>
            </Layout>
        );
    }
}

export default ControllerSection;