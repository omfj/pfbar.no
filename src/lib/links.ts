type HeaderLink = {
	label: string;
	authed?: boolean;
} & (
	| {
			href: string;
			type?: 'link';
	  }
	| {
			type: 'button';
			action: string;
	  }
);

function defineRoutes(routes: Array<HeaderLink>) {
	return routes.map((route) => createRoute(route));
}

function createRoute(route: HeaderLink) {
	if (route.type === 'button') {
		return {
			...route
		} as const;
	}

	return {
		...route,
		type: 'link'
	} as const;
}

export const headerLinks = defineRoutes([
	{
		label: 'Hjem',
		href: '/'
	},
	{
		label: 'Produkter',
		href: '/produkter'
	},
	{
		label: 'Profil',
		href: '/profil',
		authed: true
	},
	{
		label: 'Logg ut',
		type: 'button',
		action: '/api/auth/sign-out',
		authed: true
	},
	{
		label: 'Logg inn',
		href: '/logg-inn',
		authed: false
	}
]);
