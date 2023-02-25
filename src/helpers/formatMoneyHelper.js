import 'intl';
import 'intl/locale-data/jsonp/en';

// seperate with comma
exports.formatMoney = (amount) => {
	return String(
		Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
		}).format(amount)
	);
};
