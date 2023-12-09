import { format } from 'date-fns';

export function formatDate(d: string | Date) {
	return format(new Date(d), 'dd/MM/yyyy HH:mm:ss');
}
