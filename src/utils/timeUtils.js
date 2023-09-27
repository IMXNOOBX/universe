function timeSince(date) {
	const currentDate = new Date();
	const createdDate = new Date(date);
	const timeDifference = currentDate - createdDate;

	const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
	const months = Math.floor(
		(timeDifference % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
	);
	const days = Math.floor(
		(timeDifference % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
	);

	if (years > 0) {
		return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	} else if (months > 0) {
		return `${months} ${months === 1 ? 'month' : 'months'} ago`;
	} else if (days > 0) {
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	} else {
		return 'Today';
	}
}

export default timeSince;
