import { getProducts } from '$lib/products';

export const load = async () => {
	const products = await getProducts();

	return {
		products
	};
};
