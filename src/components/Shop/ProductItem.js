import {useDispatch} from 'react-redux';
import {cartActions} from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
	const {name, price, description, id} = props;
	const dispatch = useDispatch();
	const addProductHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id,
				name: name,
				price,
			})
		);
	};
	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{name}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addProductHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
