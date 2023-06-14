import Select from "react-select";
import css from "./customSelect.module.scss";
import { useState } from "react";
const CustomSelect = ({
	categorias,
	subcategorias,
	name,
	valueFormik,
	onChange,
	onBlur,
	error,
	disabled,
}) => {
	const options = categorias.map((categoria) => ({
		label: categoria.descripcion,
		options: subcategorias
			.filter((subcategoria) => subcategoria.idcategoria === categoria.id)
			.map((subcategoria) => ({
				value: subcategoria.id,
				label: subcategoria.descripcion,
			})),
	}));

	const customStyles = {
		control: (provided) => ({
			...provided,
			border: "1px solid #E5E5E5",
			borderRadius: "6px",
			padding: "4.5px 4px",
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "white" : "black",
			backgroundColor: state.isSelected ? "#1D4ED8" : "white",
			"&:hover": {
				backgroundColor: state.isSelected ? "#1D4ED8" : "#E5E5E5",
			},
		}),
		// zIndex: 9999 al menu,
		menu: (provided) => ({
			...provided,
			zIndex: "9999 !important",
			backgroundColor: "white",
		}),
		menuPortal: (provided) => ({
			...provided,
			zIndex: "9999 !important",
		}),
	};

	const handleInputChange = (value) => {
		onChange("idsubcategoria", Number(value.value));
		console.log(value);
	};

	const traerSubcategoria = (id) => {
		const subcategoria = subcategorias.find(
			(subcategoria) => Number(subcategoria.id) === Number(id)
		);
		if (subcategoria) {
			return {
				value: subcategoria.id,
				label: subcategoria.descripcion,
			};
		}
		return null;
	};

	return (
		<div className={css.wrapper}>
			<div
				className='react-select-data'
				data-is-content={traerSubcategoria(valueFormik) ? true : false}
			>
				<Select
					className={error ? "error" : ""}
					options={options}
					placeholder='Categoria'
					menuPosition='fixed'
					styles={customStyles}
					onChange={handleInputChange}
					value={traerSubcategoria(valueFormik)}
					isDisabled={disabled}
				/>
			</div>
			{error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

export default CustomSelect;
