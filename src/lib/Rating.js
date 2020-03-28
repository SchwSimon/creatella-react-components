import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import cn from 'classnames';

const Rating = props => {
    const { className, rate = 0, spacing = 5, ...others } = props;

    const starRef = useRef(null);
    const [starWidth, setStarWidth] = useState(0);

    useEffect(() => {
        const { current } = starRef;

        if (current !== null && typeof current !== 'number') {
            const width = current.getBoundingClientRect().width;

            setStarWidth(width);
        }
    }, [starRef]);

    const intRate = parseInt(rate);
    const floatRte = rate - intRate;
    const width = intRate * (starWidth + 2 * spacing) + spacing + floatRte * starWidth;

    return (
        <div
            className={cn(
                'Rating',
                className
            )}
            {...others}>
            <div
                className='Rating__top'
                style={{ width: width }}>
                {renderStars('Rating__top', spacing, starRef)}
            </div>
            <div className='Rating__bottom'>
                {renderStars('Rating__bottom', spacing)}
            </div>
        </div>
    );
};

const renderStars = (parentClass, spacing, ref) => {
    const stars = [1, 1, 1, 1, 1];

    return stars.map((item, index) => <span
        ref={(ref && index === 0) ? ref : undefined}
        key={index}
        className={`${parentClass}-item`}
        style={{ margin: `0 ${spacing}px` }} >
        ★
    </span>
    );
};

Rating.propTypes = {
    className: PropTypes.string,
    rate: PropTypes.number
};

export default Rating;
