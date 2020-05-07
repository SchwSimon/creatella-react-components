import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import cn from 'classnames';

export default class Rating extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func,
        rate: PropTypes.number,
        spacing: PropTypes.number,
        readOnly: PropTypes.bool,
        step: PropTypes.number
    }

    static defaultProps = {
        rate: 0,
        spacing: 5,
        step: 1
    }

    state = {
        tmpValue: 0,
        showTmp: false
    }

    componentDidMount() {
        this.forceUpdate();
    }

    starRef = createRef();

    handleMouseMove = e => {
        const posRate = this.calculatePosRate(e);

        this.setState({
            tmpValue: posRate
        });
    }

    handleMouseEnter = () => this.setState({
        showTmp: true
    });

    handleMouseLeave = () => this.setState({
        showTmp: false
    });

    handleClick = e => {
        e.preventDefault();
        const { onChange } = this.props;
        const posRate = this.calculatePosRate(e);

        onChange && onChange(posRate);
    }

    getStarWidth = () => {
        const { current } = this.starRef;

        if (current !== null && typeof current !== 'number') {
            const width = current.getBoundingClientRect().width;

            return width;
        }

        return 0;
    }

    calculatePosRate = e => {
        const { spacing, step } = this.props;

        const starWidth = this.getStarWidth();

        const containerRect = e.currentTarget.getBoundingClientRect();
        let pos = e.clientX - containerRect.left;
        const containerWidth = containerRect.width;

        pos = pos < 0 ? 0 : pos;
        pos = pos > containerWidth ? containerWidth : pos;

        const intRate = parseInt((pos + spacing) / ((starWidth + spacing * 2) * step)) * step + step;

        return intRate;
    };

    render() {
        const { className, rate, spacing, onChange, readOnly, ...others } = this.props;
        const { showTmp, tmpValue } = this.state;

        const starWidth = this.getStarWidth();

        const displayValue = showTmp ? tmpValue : rate;
        const intRate = parseInt(displayValue);
        const floatRte = displayValue - intRate;
        const width = intRate * (starWidth + 2 * spacing) + floatRte * starWidth;

        return (
            <div
                className={cn(
                    'Rating',
                    { 'Rating--read-only': readOnly },
                    className
                )}
                onMouseMove={!readOnly ? this.handleMouseMove : null}
                onMouseEnter={!readOnly ? this.handleMouseEnter : null}
                onMouseLeave={!readOnly ? this.handleMouseLeave : null}
                onClick={!readOnly ? this.handleClick : null}
                {...others}>
                <div
                    className='Rating__top'
                    style={{ width: width }}>
                    {renderStars('Rating__top', spacing, this.starRef)}
                </div>
                <div className='Rating__bottom'>
                    {renderStars('Rating__bottom', spacing)}
                </div>
            </div>
        );
    }
}

const renderStars = (parentClass, spacing, ref) => {
    const stars = [1, 1, 1, 1, 1];

    return stars.map((item, index) => <span
        ref={(ref && index === 0) ? ref : undefined}
        key={index}
        className={`${parentClass}-item`}
        style={{
            margin: `0 ${
                index < 4 ? spacing : '0'
            }px 0 ${
                index > 0 ? spacing : '0'
            }px`
        }} >
        ★
    </span>
    );
};
