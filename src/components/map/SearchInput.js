import React from 'react';
import styled from 'styled-components';
import {ResetInput} from '../../styles/input.js';

// css
import {BorderColor} from '../../styles/variable.js';
import {ResetBox} from '../../styles/grid.js';

const SearchBar = styled.section`
    ${ResetBox};

    display: flex;
    overflow: hidden;
    width: 100%;
    height: 40px;
    border: 1px solid ${BorderColor};
    box-sizing: border-box;
`;

const AddressInput = styled(ResetInput)`
    width: calc(100% - 40px);
    padding-right: 10px;
`;

const SearchButton = styled.button`
    width: 40px;
`;

class SearchInput extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.address === nextProps.address) {
            return false;
        }

        return true;
    }

    onSearchSubmit = (event) => {
        event.preventDefault();

        this.props.getSearchResult();
    }

    render() {
        return (
            <form onSubmit={this.onSearchSubmit}>
                <SearchBar>
                    <AddressInput type="text"
                                  name="address"
                                  value={this.props.address}
                                  placeholder={this.props.placeholder}
                                  autoComplete="off"
                                  onChange={this.props.changeAddress}/>

                    <SearchButton type="submit">검색</SearchButton>
                </SearchBar>

            </form>
        )
    }
}

export default SearchInput;
