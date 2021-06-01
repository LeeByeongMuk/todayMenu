import React, {memo} from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";

const IconButton = memo(({
    buttonProps, iconProps
}) => {
    const StyledIcon = <Icon {...iconProps} />
    return (
        <Button {...buttonProps}
                children={StyledIcon}/>
    )
});

export default IconButton;