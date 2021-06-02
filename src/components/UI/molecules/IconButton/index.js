import React, {memo} from "react";
import styled from "styled-components";
import Tooltip from "../../atoms/Tooltip";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";

const TooltipWrapper = styled.div`
    position: relative;
    height: auto;
`;

const IconButton = memo(({
    tooltipProps, buttonProps, iconProps
}) => {
    const StyledIcon = <Icon {...iconProps} />

    if (Object.keys(tooltipProps).length > 0) {
        return (
            <TooltipWrapper>
                <Tooltip {...tooltipProps}/>
                <Button {...buttonProps}
                        children={StyledIcon}/>
            </TooltipWrapper>
        )
    } else {
        return (
            <Button {...buttonProps}
                    children={StyledIcon}/>
        )
    }
});

export default IconButton;