import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { setTopPrice } from '../FlightBookingActions'
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const sliderHandle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip
			prefixCls="rc-slider-tooltip"
			overlay={value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

const PriceSliderComp = ({ priceRangeMax, setTopPrice }) => {
	return	<div>
				<h3>Precio</h3>
				<Slider dots step={100} allowCross={false} defaultValue={Math.ceil(priceRangeMax/100)*100} min={0} max={Math.ceil(priceRangeMax/100)*100} handle={sliderHandle} onAfterChange={(event) => setTopPrice(event)} />
			</div>
}

const mapStateToProps = state => {
	return {
		priceRangeMax: state.flightBooking.foundCombos.priceRangeMax
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setTopPrice: price => {
			dispatch(setTopPrice(price))
		}
	}
}

const PriceSlider = connect(
	mapStateToProps,
	mapDispatchToProps
)(PriceSliderComp)

export default PriceSlider;