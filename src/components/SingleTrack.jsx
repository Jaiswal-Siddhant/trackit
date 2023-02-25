import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { formatMoney } from '../helpers/formatMoneyHelper';
import { setModalState, setWhichModalToOpen } from '../redux/Actions';
import { COLOURS } from '../static/colors';

const SingleTrack = ({ index, trackIndex, track, date }) => {
	const dispatch = useDispatch();

	return (
		<TouchableOpacity
			style={styles.trackContainer}
			onPress={() => {
				dispatch(
					setWhichModalToOpen({
						isModalOpen: true,
						type: 'track',
						data: {
							id: track.id,
							date: date,
							amount: track.amount,
							description: track.description,
							type: track.type,
						},
					})
				);
			}}
			key={`${index}->${trackIndex}`}>
			<View style={styles.singleTrack}>
				<Text style={{ color: COLOURS.greyText }}>
					{track.description}
				</Text>
				<Text
					style={{
						color:
							track.type == 'Income'
								? COLOURS.greenText
								: COLOURS.redText,
					}}>
					{formatMoney(track.amount)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = new StyleSheet.create({
	trackContainer: {
		padding: 5,
		marginTop: 5,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	singleTrack: {
		display: 'flex',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		backgroundColor: 'white',
		height: 50,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: COLOURS.greyishBorder,
	},
});

export default SingleTrack;
