const { default: axios } = require('axios');
const { DUMMY_DATA_API } = require('../static/LINKS');

exports.setUserProfile = async () => {
	// console.log('INCOMING REQUEST');
	const data = await axios.get(DUMMY_DATA_API);
	const user = data.data;
	return user;
};
