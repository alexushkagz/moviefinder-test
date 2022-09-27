import { useMemo } from 'react';

export const usePagination = (totalPages, currentPage) => {
    const currentDecade = Math.floor((currentPage-1)/10);
	let maxPage = currentDecade*10 + 10;
	console.log(maxPage, currentDecade)
	if (maxPage > totalPages) maxPage = totalPages;

	return useMemo(() => {
		let result = []
		for (let i = currentDecade*10; i < maxPage; i++) {
			result.push(i + 1);
		}
		return result;
	}, [totalPages, currentDecade])
}