import React, {memo} from "react";
import {PanelButton} from "../../styles/Button";
import {MyLocation} from '@styled-icons/material';

const ResetLocationBtn = memo(({resetLocation}) => {
    return (
        <PanelButton type="button"
                onClick={resetLocation}>
            <MyLocation title="위치 재설정" size="32px" />
        </PanelButton>
    );
});

export default ResetLocationBtn;
