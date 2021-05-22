import React, {memo} from "react";
import styled from 'styled-components';

import ResetLocationBtn from "../button/ResetLocationBtn";
import ChangeInfoBtn from "../button/ChangeInfoBtn";
import SetCircleRadius from "../button/SetCircleRadius";

const RightPanelWrapper = styled.article`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20px;
    right: 15px;
    z-index: 10000;
    width: 48px;
    background: transparent;
`;

const BottomPanelWrapper = styled.article`
    position: fixed;
    left: 50%;
    bottom: 50px;
    z-index: 10000;
    margin-left: -100px;
    background: transparent;
`;

const MapPanel = memo(({
       changeMarker,
       resetLocation,
       decreaseCircleRadius,
       increaseCircleRadius
   }) => {
    return (
        <>
            <RightPanelWrapper>
                <ResetLocationBtn resetLocation={resetLocation}/>
                <SetCircleRadius increaseCircleRadius={increaseCircleRadius}
                                 decreaseCircleRadius={decreaseCircleRadius}/>
            </RightPanelWrapper>

            <BottomPanelWrapper>
                <ChangeInfoBtn changeMarker={changeMarker}/>
            </BottomPanelWrapper>
        </>
    );
});

export default MapPanel;