import React, {memo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = memo(({...props}) => {
    return (
        <FontAwesomeIcon {...props} />
    );
});

export default Icon;