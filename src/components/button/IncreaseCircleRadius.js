import React, {memo} from "react";
import {Add} from '@styled-icons/material';
import {PanelButton} from "../../styles/button";

const IncreaseCircleRadius = memo(({clickEvent}) => {
    return (
        <PanelButton className="increase-btn"
                     onClick={clickEvent}>
            <Add title="범위 증가" size="36px" />
        </PanelButton>
    );
});

export default IncreaseCircleRadius;