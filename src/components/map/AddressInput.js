import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/input.js';

const SearchInput = styled(Input)`
    height: 30px;
`;

class AddressInput extends React.Component {
    render() {
        return (
            <SearchInput type="text"
                name="address"
                autoComplete="off"
                placeholder="주소를 입력해 주세요."
                defaultValue={this.props.address}
                onChange={this.props.addressChange} />
        )
    }
}

export default AddressInput;
