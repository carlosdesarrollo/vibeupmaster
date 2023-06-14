import PublicityItem from "./PublicyItem";
import css from "./styles/publicity.module.scss";

const Publicity = () => {
	return (
		<div className={css.fixedContainer}>
			<div className={css.publicies}>
				<PublicityItem title={"Events"} />
				<PublicityItem title={"Marketplace"} />
			</div>
		</div>
	);
};

export default Publicity;
