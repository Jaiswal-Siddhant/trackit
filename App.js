import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import MainNavigation from './src/MainNavigation';
import { fetchUserFromApi, getUserFromStorage } from './src/redux/Actions';
import { store } from './src/redux/store';

const fetchAndSave = async () => {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/users/1'
	);
	const data = await response.json();
	return data;
};

// const Component = () => {
// 	const dispatch = useDispatch();
// 	const val = useSelector((state) => state);

// 	useEffect(() => {}, []);
// 	return (

// 	);
// };

const App = () => {
	return (
		<Provider store={store}>
			<MainNavigation />
		</Provider>
	);
};

export default App;
