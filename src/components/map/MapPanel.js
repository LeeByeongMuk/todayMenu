import React, {memo} from "react";
import styled from 'styled-components';
import {ButtonDefault} from "../../styles/Button";

import ResetLocationBtn from "../button/ResetLocationBtn";
import ChangeInfoBtn from "../button/ChangeInfoBtn";

const RightPanelWrapper = styled.article`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20px;
    right: 15px;
    z-index: 10000;
    width: 70px;
    background: transparent;

    button {
        ${ButtonDefault};
        margin-top: 20px;

        &:first-child {
            margin-top: 0;
        }
    }
`;

const BottomPanelWrapper = styled.article`
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 20px;
    z-index: 10000;
    width: 100%;
    background: transparent;
    
    button {
        ${ButtonDefault};
        width: 200px;
        height: 80px;
        margin-bottom: 35px;
        font-weight: bold;
        font-size: 20px;
    }
`;

const MapPanel = memo(({changeMarker, resetLocation}) => {
    return (
        <>
            <RightPanelWrapper>
                <ResetLocationBtn resetLocation={resetLocation}/>
            </RightPanelWrapper>

            <BottomPanelWrapper>
                <ChangeInfoBtn changeMarker={changeMarker}/>
            </BottomPanelWrapper>
        </>
    );
});

export default MapPanel;