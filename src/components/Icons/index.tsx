import React from 'react';
import PropTypes from 'prop-types';

function Icons(props: { icon: any; className: string; width: number; height: number; fill: string; }) {
    const { icon, className, width, height, fill, ...rest } = props;
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={`0 0 ${icon.width} ${icon.height}`}
            {...rest}
        >
            <path fill={fill} d={icon.path} />
        </svg>
    );
}

Icons.propTypes = {
    icon: PropTypes.object.isRequired,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

export default Icons;