import React, {memo} from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";

const IconButton = memo(({
    buttonProps, iconProps
}) => {
    const icon = <Icon {...iconProps} />
    return (
        <Button {...buttonProps}
                children={icon}/>
    )
});

export default IconButton;