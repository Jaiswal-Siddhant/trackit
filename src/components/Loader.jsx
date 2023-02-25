import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLOURS } from '../static/colors';

const Loader = () => {
	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}>
			<ActivityIndicator size={'large'} color={COLOURS.yellow} />
		</View>
	);
};

export default Loader;
