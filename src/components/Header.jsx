const { Text, View, StyleSheet } = require('react-native');
import { Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS } from '../static/colors';
import { useFonts } from 'expo-font';

const Header = ({ navigation }) => {
	const [fontsLoaded] = useFonts({
		Roboto: require('../static/fonts/Roboto-Regular.ttf'),
	});
	const removeData = async () => {
		await AsyncStorage.removeItem('tracks');
	};
	return (
		<View
			style={styles.safeAreaContainer}
			onTouchEnd={() => {
				removeData();
			}}>
			<Text style={styles.headerText}>Trackit</Text>
			<Ionicons
				onPress={() => {
					navigation.navigate('Profile');
					removeData();
				}}
				style={styles.headerIcon}
				name='person-outline'
				size={20}
				color='white'
			/>
		</View>
	);
};

const styles = new StyleSheet.create({
	safeAreaContainer: {
		backgroundColor: COLOURS.yellow,
		height: 90,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30,
		position: 'relative',
	},
	headerText: {
		color: 'white',
		fontSize: 18,
		fontWeight: '700',
	},
	headerIcon: {
		position: 'absolute',
		right: 20,
		top: 45,
		borderWidth: 2,
		padding: 4,
		borderRadius: 15,
		borderColor: 'white',
	},
});

export default Header;
