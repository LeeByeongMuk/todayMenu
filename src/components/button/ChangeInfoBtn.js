import React, {memo} from "react";

const ChangeInfoBtn = memo(({changeMarker}) => {
    return (
        <button type="button"
                onClick={changeMarker}>
            다른 식당 검색
        </button>
    );
});

export default ChangeInfoBtn;