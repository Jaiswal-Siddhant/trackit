import React, { useEffect } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLOURS } from '../static/colors';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack, setUser, setWhichModalToOpen } from '../redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddModalOverlay from '../components/AddModalOverlay';
import DisplayModal from '../components/DisplayModal';
import TrackDetailModal from '../components/TrackDetailModal';
import Header from '../components/Header';
import TrackContainer from '../components/TrackContainer';
import { setUserProfile } from '../helpers/userHelper';
import { PROFILE_URI } from '../static/LINKS';
import TopMoneyConatiner from '../components/TopMoneyConatiner';

const Home = ({ navigation }) => {
	const [income, setIncome] = React.useState(7329);
	const [expense, setExpense] = React.useState(4329);
	const [isLoading, setIsLoading] = React.useState(true);
	const whichModalToOpenVar = useSelector((state) => state.modalReducer);
	const dispatch = useDispatch();
	const tracksFromRedux = useSelector((state) => state.Reducer);

	// FOR DEVELOPMENT ONLY
	const removeData = async () => {
		await AsyncStorage.removeItem('tracks');
		dispatch(removeEverything());
	};

	const setIncomeAndExpense = async () => {
		let totalIncome = 0,
			totalExpense = 0;

		tracksFromRedux?.sort((a, b) => {
			return new Date(a.date).getTime() > new Date(b.date).getTime()
				? 1
				: -1;
		});

		tracksFromRedux?.forEach((tracks) => {
			tracks?.track?.forEach((track) => {
				if (track.type === 'Income') {
					totalIncome += parseFloat(track.amount);
				} else {
					totalExpense += parseFloat(track.amount);
				}
			});
		});

		setIncome(totalIncome);
		setExpense(totalExpense);
	};

	const loadFromStorage = async () => {
		try {
			const tracks = await AsyncStorage.getItem('tracks');
			const parsedTracks = JSON.parse(tracks);
			console.warn('tracks from storage ----> ', parsedTracks);
			if (parsedTracks && parsedTracks.length) {
				for (let item of parsedTracks) {
					dispatch(addTrack(item));
				}
			}
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		setIncomeAndExpense();
	}, [tracksFromRedux]);

	useEffect(() => {
		setIsLoading(true);
		try {
			setUserProfile().then((user) => {
				dispatch(
					setUser({
						profileURI: PROFILE_URI,
						name: user.name,
						userName: user.username,
						email: user.email,
						address: user.address,
					})
				);
			});
		} catch (error) {
			console.error(error);
		}

		loadFromStorage();
		// removeData();
	}, []);

	if (isLoading) return <Loader />;
	return (
		<View style={{ position: 'relative', height: '100%' }}>
			<Header navigation={navigation} />
			<TopMoneyConatiner income={income} expense={expense} />

			{/* Tracks */}
			<ScrollView style={{ marginBottom: 80 }}>
				{tracksFromRedux?.map((item, index) => {
					return (
						<TrackContainer item={item} index={index} key={index} />
					);
				})}
			</ScrollView>

			{/* Bottom Footer => Modal and Add Btn */}
			<View style={styles.addBtnContainer}>
				<TouchableOpacity
					style={styles.addBtn}
					onPress={() => {
						dispatch(
							setWhichModalToOpen({
								isModalOpen: true,
								type: 'AddModal',
								data: {},
							})
						);
					}}>
					<Entypo name='plus' size={26} color='white' />
				</TouchableOpacity>
			</View>
			<DisplayModal>
				{whichModalToOpenVar.type === 'AddModal' ? (
					<AddModalOverlay />
				) : (
					<TrackDetailModal
						id={whichModalToOpenVar.data.id}
						amount={whichModalToOpenVar.data.amount}
						date={whichModalToOpenVar.data.date}
						type={whichModalToOpenVar.data.type}
						description={whichModalToOpenVar.data.description}
					/>
				)}
			</DisplayModal>
		</View>
	);
};

const styles = new StyleSheet.create({
	totalsView: {
		height: 150,
		margin: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLOURS.greyishBorder,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	totalsBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	verticalDivider: {
		width: 1,
		height: '80%',
		backgroundColor: COLOURS.greyishBorder,
	},
	balanceHeader: {
		fontSize: 12,
		color: 'grey',
	},
	totalBalanceText: {
		fontSize: 24,
		marginTop: 3,
		fontWeight: '700',
		color: '#02BEE8',
	},
	addBtnContainer: {
		position: 'absolute',
		bottom: 23,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addBtn: {
		padding: 10,
		backgroundColor: COLOURS.yellow,
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
});
export default Home;
