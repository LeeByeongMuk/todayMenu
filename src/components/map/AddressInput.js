import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    height: 30px;
    padding-left: 15px;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
`;

class AddressInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input type="text"
                name="address"
                autoComplete="off"
                placeholder="주소를 입력해 주세요."
                defaultValue={this.props.address}
                onChange={this.props.addressChange} />
        )
    }
}

export default AddressInput;
