import { useState } from "react";
import Slider from "rc-slider";
import css from "./styles/priceRangeComponent.module.scss";

const PriceRangeComponent = () => {
	const precioMinimo = 1;
	const precioMaximo = 1000;
	const [value, setValue] = useState([precioMinimo, precioMaximo]);

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (index, event) => {
		const newValue = [...value];
		let inputValue = event.target.value ? parseInt(event.target.value) : 1;

		if (inputValue < precioMinimo) {
			inputValue = precioMinimo;
		} else if (inputValue > precioMaximo) {
			inputValue = precioMaximo;
		}
		newValue[index] = inputValue;
		setValue(newValue);
	};

	return (
		<div className={css.container}>
			<div className={css.inputs}>
				<div className={css.minimo}>
					<h3>Minimo</h3>
					<div className={css.values}>
						<span>USD</span>
						<input
							type='number'
							value={value[0]}
							onChange={(event) => handleInputChange(0, event)}
						/>
					</div>
				</div>
				<div className={css.maximo}>
					<h3>Maximo</h3>
					<div className={css.values}>
						<span>USD</span>
						<input
							type='number'
							value={value[1]}
							onChange={(event) => handleInputChange(1, event)}
						/>
					</div>
				</div>
			</div>
			<div className={css.slide_wrapper}>
				<Slider
					min={precioMinimo}
					max={precioMaximo}
					value={value}
					range
					onChange={handleChange}
					allowCross={false}
					className='mb-2'
				/>
			</div>
			<span className='text-xs text-gray-500 text-center flex justify-center opacity-80'>
				Select a price range to filter your search
			</span>
		</div>
	);
};

export default PriceRangeComponent;
