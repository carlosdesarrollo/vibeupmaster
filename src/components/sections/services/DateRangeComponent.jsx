import { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import { motion } from "framer-motion";
import CloseIcon from "../../Icons/interfaz/CloseIcon";

const DateRangeComponent = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(null);

	const today = new Date();

	const handleDatesChange = ({ startDate, endDate }) => {
		// if (startDate && endDate) {
		// 	const diffInDays = endDate.diff(startDate, "days");
		// 	const maxAllowedDays = 5;
		// 	if (diffInDays > maxAllowedDays) {
		// 		setStartDate(startDate);
		// 		setEndDate(startDate.clone().add(maxAllowedDays, "days"));
		// 	} else {
		// 		setStartDate(startDate);
		// 		setEndDate(endDate);
		// 	}
		// } else {
		setStartDate(startDate);
		setEndDate(endDate);
		// }
	};

	const handleFocusChange = (focusedInput) => {
		setFocusedInput(focusedInput);
	};

	const isOutsideRange = (day) => {
		return day.isBefore(today, "day");
	};

	useEffect(() => {
		const handleScroll = (e) => {
			if (focusedInput) {
				e.preventDefault();
			}
		};

		document.body.style.overflow = focusedInput ? "hidden" : "auto";
		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
			document.body.style.overflow = "auto";
		};
	}, [focusedInput]);

	// const handleSubmit = () => {
	//     if (startDate && endDate) {
	//       // Aquí puedes realizar alguna acción con las fechas seleccionadas
	//       console.log("Fecha de inicio:", startDate.format("YYYY-MM-DD"));
	//       console.log("Fecha de fin:", endDate.format("YYYY-MM-DD"));
	//     }
	//   };

	return (
		<div>
			<DateRangePicker
				startDate={startDate}
				endDate={endDate}
				startDateId='start-date'
				endDateId='end-date'
				onDatesChange={handleDatesChange}
				focusedInput={focusedInput}
				onFocusChange={handleFocusChange}
				displayFormat='DD/MM/YYYY'
				hideKeyboardShortcutsPanel={true}
				noBorder={true}
				isOutsideRange={isOutsideRange}
				showClearDates
				withPortal
				minimumNights={0}
				readOnly={true}
				customArrowIcon={
					<div className='text-[12px] mx-2 font-medium'>To</div>
				}
				customCloseIcon={
					<motion.button
						className='bg-[#f0f2f5] hover:bg-[#e4e6eb] rounded-full'
						whileTap={{ scale: 0.9 }}
						title='Borrar fechas'
					>
						<CloseIcon size={22} />
					</motion.button>
				}
				// onSubmit={handleSubmit}
				phrases={{
					closeDatePicker: "Cerrar",
					startDatePlaceholderText: "Fecha de inicio",
					endDatePlaceholderText: "Fecha de fin",
				}}
				startDateAriaLabel='Fecha de inicio'
				endDateAriaLabel='Fecha de fin'
			/>
		</div>
	);
};

export default DateRangeComponent;
