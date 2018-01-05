import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { setTopPrice } from '../FlightBookingActions'
import 'rc-slider/assets/index.css';

const Handle = Slider.Handle;

const PriceSliderComponent = ({ priceRangeMax, setTopPrice, topPrice, waitingResults }) => {
	let sliderRender = <div className="slider-loading"></div>
	if(!waitingResults)
		sliderRender = <Slider dots step={100} allowCross={false} defaultValue={topPrice} min={0} max={Math.ceil(priceRangeMax/100)*100} handle={sliderHandle} onAfterChange={(event) => setTopPrice(event)} />

	return	<div>
				<h3>Precio</h3>
				{sliderRender}
			</div>
}

const sliderHandle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index} >
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

const mapStateToProps = state => {
	return {
		priceRangeMax: state.flightBooking.foundCombos.priceRangeMax,
		topPrice: state.flightBooking.topPrice,
		waitingResults: state.flightBooking.waitingResults
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setTopPrice: price => {
			dispatch(setTopPrice(price))
		}
	}
}

export const PriceSlider = connect(
	mapStateToProps,
	mapDispatchToProps
)(PriceSliderComponent)