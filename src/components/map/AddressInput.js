import React from 'react';
import styled from 'styled-components';
import {Input} from '../../styles/input.js';

const SearchInput = styled(Input)`
    height: 30px;
`;

const SearchMessage = styled.div`
    display: ${props => props.visibility ? 'block' : 'none'};
    margin-top: 8px;
    font-size: 14px;
    line-height: 16px;
`;

class AddressInput extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.searchStatus) { // 검색 결과가 없을 때 re render
            return true;
        }

        return false;
    }

    render() {
        return (
            <React.Fragment>
                <SearchInput type="text"
                             name="address"
                             placeholder={this.props.placeholder}
                             autoComplete="off"
                             defaultValue={this.props.address}
                             onChange={this.props.addressChange}/>

                <SearchMessage visibility={this.props.searchStatus ? 1 : 0}>
                    {this.props.searchMessage}
                </SearchMessage>
            </React.Fragment>
        )
    }
}

export default AddressInput;
