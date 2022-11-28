import {cartActions} from './cart-slice';
import {uiActions} from './ui-slice';

export const sendCartData = (cartData) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data!',
			})
		);

		const sendRequest = async () => {
			const response = await fetch('URL/cart.json', {
				method: 'PUT',
				body: JSON.stringify({
					items: cartData.items,
					totalQuantity: cartData.totalQuantity,
				}),
			});

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sending cart data failed!',
				})
			);
		}
	};
};

export const getCartData = (cartData) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Getting...',
				message: 'getting cart data!',
			})
		);

		const sendRequest = async () => {
			const response = await fetch('URL/cart.json');

			if (!response.ok) {
				throw new Error('Getting cart data failed.');
			}

			const data = await response.json();
			return data;
		};

		try {
			const cartData = await sendRequest();
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'get cart data successfully!',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Getting cart data failed!',
				})
			);
		}
	};
};
