import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import InputRange from 'react-input-range';

export default class SliderRangePicker extends PureComponent {
    static propTypes = {
        className: PropTypes.string
    }

    static defaultProps = {
        onChange: () => null
    }

    render() {
        const {
            className,
            onChange,
            ...others
        } = this.props;

        return (
            <div
                className={cn('SliderRangePicker', className)} >
                <div className='SliderRangePicker__base' />
                <InputRange
                    classNames={{
                        inputRange: 'SliderRangePicker__container',
                        track: 'SliderRangePicker__container-track',
                        disabledInputRange: cn(
                            'SliderRangePicker__container',
                            'SliderRangePicker__container--disabled'
                        ),
                        activeTrack: 'SliderRangePicker__container-track-active',
                        sliderContainer: 'SliderRangePicker__container-track-slider-container',
                        slider: 'SliderRangePicker__container-track-slider-container-slider',
                        labelContainer: 'SliderRangePicker__container-track-label-container'
                    }}
                    formatLabel={() => null}
                    onChange={onChange}
                    {...others} />
            </div>
        );
    }
}
