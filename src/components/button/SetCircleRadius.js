import React, {memo} from "react";

const SetCircleRadius = memo(({increaseCircleRadius, decreaseCircleRadius}) => {
    return (
        <>
            <button onClick={increaseCircleRadius}>범위 증가</button>
            <button onClick={decreaseCircleRadius}>범위 감소</button>
        </>
    );

});

export default SetCircleRadius;