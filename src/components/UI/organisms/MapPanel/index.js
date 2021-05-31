import React, {memo} from "react";
import styled from "styled-components";
import {faStreetView, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

import Button from "../../atoms/Button";
import IconButton from "../../molecules/IconButton";

const RightPanelWrapper = styled.section`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20px;
    right: 15px;
    z-index: 10000;
    width: 48px;
    background: transparent;

    button {
        overflow: hidden;
        position: relative;
        height: 48px;
        border: 1px solid #888;
        border-radius: 3px;
        background: #fff;
        font-size: 24px;
        line-height: 46px;
    }
`;

const BottomPanelWrapper = styled.article`
    position: fixed;
    left: 50%;
    bottom: 50px;
    z-index: 10000;
    margin-left: -100px;
    background: transparent;

    button {
        width: 200px;
        height: 80px;
        font-weight: bold;
        font-size: 22px;
    }
`;

const SetCircleController = styled.article`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 48px;
    margin: 15px 0 0 auto;

    .increase-btn {
        border-bottom: 1px solid #888;
    }
`;

const optionDefault = ({buttonProps, iconProps}) => {
    return {
        buttonProps: {
            type: 'button',
            ...buttonProps
        },
        iconProps: {
            color: '#000',
            ...iconProps
        }
    };
}

const MapPanel = memo(({
   changeMarker,
   resetLocation,
   decreaseCircleRadius,
   increaseCircleRadius
}) => {
    const ResetLocationOptions = optionDefault({
        buttonProps: {
            onClick: resetLocation
        },
        iconProps: {
            icon: faStreetView
        }
    });
    const IncreaseCircleRadiusOptions = optionDefault({
        buttonProps: {
            onClick: increaseCircleRadius
        },
        iconProps: {
            icon: faPlus
        }
    });
    const DecreaseCircleRadiusBtnOptions = optionDefault({
        buttonProps: {
            onClick: decreaseCircleRadius
        },
        iconProps: {
            icon: faMinus
        }
    });

    return (
        <>
            <RightPanelWrapper>
                <IconButton onClick={resetLocation}
                            iconProps={ResetLocationOptions.iconProps}
                            buttonProps={ResetLocationOptions.buttonProps} />

                <SetCircleController>
                    <IconButton onClick={increaseCircleRadius}
                                iconProps={IncreaseCircleRadiusOptions.iconProps}
                                buttonProps={IncreaseCircleRadiusOptions.buttonProps} />
                    <IconButton onClick={decreaseCircleRadius}
                                iconProps={DecreaseCircleRadiusBtnOptions.iconProps}
                                buttonProps={DecreaseCircleRadiusBtnOptions.buttonProps} />
                </SetCircleController>
            </RightPanelWrapper>

            <BottomPanelWrapper>
                <Button type="button"
                        children="다른 식당 검색"
                        onClick={changeMarker} />
            </BottomPanelWrapper>
        </>
    );
});

export default MapPanel;