import React from "react";
import styled, {css} from "styled-components";

const fontSize = ({ level }) => `${0.75 + (1 * (1 / level))}rem`;

const styles = css`
    font-weight: bold;
    font-size: ${fontSize};
    color: #fff;
`;

const Heading = styled(({
    level, children, ...props
}) => React.createElement(`h${level}`, props, children))`${styles}`;

export default Heading;