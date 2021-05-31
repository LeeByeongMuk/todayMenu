import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {ResetBox} from "../../../../styles/grid";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const SearchBar = styled.section`
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 40px;
    border: 1px solid #888;
    box-sizing: border-box;
    ${ResetBox};

    input {
        width: calc(100% - 40px);
        padding-right: 10px;
    }

    button {
        width: 40px;
    }
`;

class SearchForm extends PureComponent {
    onSearchSubmit = (event) => {
        event.preventDefault();

        this.props.getSearchResult();
    }

    render() {
        return (
            <form onSubmit={this.onSearchSubmit}>
                <SearchBar>
                    <Input type="text"
                           name="address"
                           value={this.props.address}
                           placeholder={this.props.placeholder}
                           autoComplete="off"
                           onChange={this.props.changeAddress}/>

                    <Button type="submit" value="검색"/>
                </SearchBar>
            </form>
        )
    }
}

export default SearchForm;
