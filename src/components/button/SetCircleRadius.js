import React, {memo} from "react";
import styled from "styled-components";
import {BorderColor} from "../../styles/variable";

import IncreaseCircleRadius from "./IncreaseCircleRadius";
import DecreaseCircleRadius from "./DecreaseCircleRadius";

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
            <IncreaseCircleRadius clickEvent={increaseCircleRadius} />
            <DecreaseCircleRadius clickEvent={decreaseCircleRadius} />
        </SetCircleController>
    );
});

export default SetCircleRadius;