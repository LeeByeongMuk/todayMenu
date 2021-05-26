import React, {memo} from "react";
import {Remove} from '@styled-icons/material';
import {PanelButton} from "../../styles/Button";

const DecreaseCircleRadius = memo(({clickEvent}) => {
    return (
        <PanelButton className="increase-btn"
                     onClick={clickEvent}>
            <Remove title="범위 감소" size="36px" />
        </PanelButton>
    );
});

export default DecreaseCircleRadius;