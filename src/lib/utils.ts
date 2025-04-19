export function removeAccents(str: string): string {
	return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}