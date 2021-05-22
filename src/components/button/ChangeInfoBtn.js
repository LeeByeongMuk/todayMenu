import React, {memo} from "react";
import {LargeButton} from "../../styles/Button";

const ChangeInfoBtn = memo(({changeMarker}) => {
    return (
        <LargeButton type="button"
                     onClick={changeMarker}>
            다른 식당 검색
        </LargeButton>
    );
});

export default ChangeInfoBtn;