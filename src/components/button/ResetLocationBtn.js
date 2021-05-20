import React, {memo, useState} from "react";

const ResetLocationBtn = memo(({resetLocation}) => {
    return (
        <button type="button"
                onClick={resetLocation}>
            위치 재설정
        </button>
    );
});

export default ResetLocationBtn;
