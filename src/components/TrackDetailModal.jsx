import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTrackById, setModalState } from '../redux/Actions';
import { COLOURS } from '../static/colors';
import AddModalOverlay from './AddModalOverlay';
import { formatMoney } from '../helpers/formatMoneyHelper';

const TrackDetailModal = ({ id, type, amount, description, date }) => {
	const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
	const dispatch = useDispatch();
	const bounceValue = React.useRef(new Animated.Value(1000)).current;
	const dateObj = new Date(date);
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const changedDate = `${
		months[dateObj.getMonth()]
	} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

	return (
		<View
			style={{
				alignItems: 'center',
				width: '100%',
				justifyContent: 'center',
				position: 'relative',
			}}>
			<Text style={{ marginTop: 22, fontSize: 18 }}>{type}</Text>
			<Text
				style={{
					marginTop: 55,
					color: type === 'Income' ? COLOURS.yellow : COLOURS.redText,
					fontSize: 22,
				}}>
				{formatMoney(amount)}
			</Text>
			<Text style={{ marginTop: 55, fontSize: 18 }}>{description}</Text>
			{/* <Text style={{ marginTop: 10 }}>ID: {id}</Text> */}
			<Text style={{ marginTop: 10 }}>{changedDate}</Text>

			<TouchableOpacity
				onPress={() => {
					setIsEditModalOpen(true);
					Animated.timing(bounceValue, {
						toValue: 1,
						duration: 300,
						useNativeDriver: true,
					}).start();
				}}
				style={{
					marginTop: 30,
					marginBottom: 22,
					width: '50%',
					height: 25,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text style={{ color: COLOURS.yellow, fontWeight: 'bold' }}>
					Edit
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					marginBottom: 22,
					width: '50%',
					height: 25,
					justifyContent: 'center',
					alignItems: 'center',
				}}
				onPress={() => {
					dispatch(setModalState(false));
					dispatch(deleteTrackById(id));
				}}>
				<Text>Delete</Text>
			</TouchableOpacity>
			{isEditModalOpen ? (
				<Animated.View
					style={[
						{
							position: 'absolute',
							backgroundColor: 'white',
							width: '100%',
							height: '100%',
							transform: [{ translateX: bounceValue }],
						},
					]}>
					<AddModalOverlay
						id={id}
						getSelectedType={type}
						getAmount={amount}
						getDescription={description}
						getDate={dateObj}
						isEdit={true}
					/>
				</Animated.View>
			) : null}
		</View>
	);
};

export default TrackDetailModal;
