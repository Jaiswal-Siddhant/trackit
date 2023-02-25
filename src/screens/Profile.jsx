import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLOURS } from '../static/colors';

const Profile = () => {
	const data = useSelector((state) => state.userReducer);
	console.log(data);
	return (
		<View style={{ alignItems: 'center', flex: 1 }}>
			<Image
				source={{ uri: data.profileURI }}
				style={{
					width: 90,
					height: 90,
					marginTop: 55,
					borderRadius: 50,
				}}
			/>
			<Text style={{ marginTop: 16, fontSize: 28, fontWeight: '400' }}>
				{data.name}
			</Text>
			<Text
				style={{
					marginTop: 10,
					fontSize: 16,
					fontWeight: '400',
					color: COLOURS.greyText,
				}}>
				{data.email}
			</Text>
			<Text
				style={{
					marginTop: 10,
					fontSize: 16,
					fontWeight: '400',
					color: COLOURS.greyText,
				}}>
				{`${data.address.street}, ${data.address.suite}, ${data.address.city}`}
			</Text>
		</View>
	);
};

export default Profile;
