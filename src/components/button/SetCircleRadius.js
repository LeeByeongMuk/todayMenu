import React, {memo} from "react";
import {Add, Remove} from '@styled-icons/material';
import styled from "styled-components";

import {BorderColor} from "../../styles/variable";
import {PanelButton} from "../../styles/Button";

const SetCircleController = styled.article`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 48px;
    margin: 15px 0 0 auto;

    .increase-btn {
        border-bottom: 1px solid ${BorderColor};
    }
`;

const SetCircleRadius = memo(({increaseCircleRadius, decreaseCircleRadius}) => {
    return (
        <SetCircleController>
            <PanelButton className="increase-btn"
                    onClick={increaseCircleRadius}>
                <Add title="범위 증가" size="36px" />
            </PanelButton>
            <PanelButton className="decrease-btn"
                    onClick={decreaseCircleRadius}>
                <Remove title="범위 감소" size="36px" />
            </PanelButton>
        </SetCircleController>
    );
});

export default SetCircleRadius;