import { useEffect, useState } from "react";
import Input from "../../Input/Input";

const PrecioInput = ({
	prefix = "S/.",
	maxLength = 999999999,
	name,
	value,
	onChange,
	onBlur,
	error,
}) => {
	const formatCurrency = (value) => {
		if (value === "") {
			return "";
		}
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		});
		return `${prefix} ${formatter.format(value).replace("$", "")}`;
	};

	const [formattedValue, setFormattedValue] = useState(formatCurrency(value));

	const handleInputChange = (event) => {
		const input = event.target;
		const inputValue = input.value.replace(/[^0-9]/g, "");

		if (Number(inputValue) <= 0 || inputValue === "") {
			setFormattedValue("");
			onChange("precio", "");
		} else if (Number(inputValue) > maxLength) {
			return;
		} else {
			const newValue = Number(inputValue);
			setFormattedValue(formatCurrency(newValue));
			onChange("precio", newValue);
		}
	};

	return (
		<Input
			type='text'
			label='Precio'
			placeholder='Precio'
			name={name}
			htmlFor={name}
			value={formattedValue}
			onChange={handleInputChange}
			onBlur={onBlur}
			error={error}
		/>
	);
};

export default PrecioInput;
