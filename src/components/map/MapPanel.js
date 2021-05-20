import React, {memo} from "react";
import styled from 'styled-components';
import {BorderColor, White, Black} from "../../styles/variable";

import ResetLocationBtn from "../button/ResetLocationBtn";
import ChangeInfoBtn from "../button/ChangeInfoBtn";

const PanelWrapper = styled.article`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 10000;
    width: 70px;
    background: transparent;

    button {
        margin-top: 20px;
        padding: 5px;
        border: 1px solid ${BorderColor};
        border-radius: 8px;
        background: ${White};
        color: ${Black};
        word-break: keep-all;
        cursor: pointer;

        &:first-child {
            margin-top: 0;
        }
    }
`;


const MapPanel = memo(({changeMarker, resetLocation}) => {
    return (
        <PanelWrapper>
            <ResetLocationBtn resetLocation={resetLocation}/>
            <ChangeInfoBtn changeMarker={changeMarker}/>
        </PanelWrapper>
    );
});

export default MapPanel;