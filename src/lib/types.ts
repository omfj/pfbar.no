export type Product = {
	id: string;
	name: string;
	description: string;
	inStock: boolean;
	image: string | undefined | null;
};

export type Order = {
	id: string;
	userId: string;
	productId: string;
	createdAt: Date;
};
