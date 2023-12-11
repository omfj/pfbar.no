import { db } from '../src/lib/db/drizzle';
import { products } from '../src/lib/db/schemas';

async function seed() {
	await db.insert(products).values([
		{
			name: 'Margarita',
			description:
				'A refreshing cocktail made with tequila, lime juice, and orange liqueur, often served with salt on the rim of the glass.'
		},
		{
			name: 'Mojito',
			description:
				'A Cuban cocktail that combines white rum, sugar, lime juice, soda water, and mint for a light and invigorating drink.'
		},
		{
			name: 'Old Fashioned',
			description:
				'A classic American cocktail featuring bourbon or rye whiskey, mixed with sugar, bitters, and a twist of citrus rind.'
		},
		{
			name: 'Martini',
			description:
				'An iconic cocktail made with gin and vermouth, garnished with an olive or a lemon twist. Known for its strong and dry flavor.'
		},
		{
			name: 'Cosmopolitan',
			description:
				'A chic cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice.'
		},
		{
			name: 'Negroni',
			description:
				'An Italian cocktail made with one part gin, one part vermouth rosso, and one part Campari, garnished with orange peel.'
		},
		{
			name: 'Pina Colada',
			description:
				'A sweet cocktail made with rum, coconut cream or coconut milk, and pineapple juice, usually served either blended or shaken with ice.'
		},
		{
			name: 'Sangria',
			description:
				'A popular Spanish drink made with red wine, chopped fruit, a sweetener, and a small amount of added brandy.'
		},
		{
			name: 'Manhattan',
			description:
				'A sophisticated cocktail made with whiskey, sweet vermouth, and bitters, typically garnished with a cherry.'
		},
		{
			name: 'Irish Coffee',
			description:
				'A cocktail consisting of hot coffee, Irish whiskey, and sugar, stirred, and topped with cream.'
		}
	]);
}

seed()
	.then(() => {
		console.log('Seeding complete!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
