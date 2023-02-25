import React from 'react';
import {
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
	addTrack,
	editTrackById,
	setModalState,
	setWhichModalToOpen,
} from '../redux/Actions';
import { COLOURS } from '../static/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';

const AddModalOverlay = ({
	getSelectedType = 'Income',
	getAmount = 0,
	getDescription = '',
	getDate = new Date(),
	isEdit = false,
	id = '',
}) => {
	const [selectedType, setSelectedType] = React.useState(getSelectedType);
	const [amount, setAmount] = React.useState(getAmount);
	const [description, setDescription] = React.useState(getDescription);
	const [date, setDate] = React.useState(getDate || Date.now());
	const [isDateShown, setisDateShown] = React.useState(false);
	const dispatch = useDispatch();

	React.useEffect(() => {
		console.log(getAmount, getDescription, getDate, isEdit);
	}, []);

	const onChange = (event, selectedDate) => {
		if (event.type === 'set' || event.type === 'dismissed') {
			setisDateShown((oldVal) => false);
			if (event.type === 'set') {
				const currentDate = selectedDate;
				setDate(currentDate);
			}
		}
		console.log('date ----> ', date.toDateString());
	};

	return (
		<View
			style={{
				flex: 1,
				position: 'relative',
				width: '100%',
				marginTop: 20,
			}}>
			<View style={{ alignItems: 'center', marginTop: 20 }}>
				<Text style={{ color: COLOURS.greyText, fontSize: 18 }}>
					Add Income/Expense
				</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						marginTop: 20,
					}}>
					<TouchableOpacity
						onPress={() => {
							setSelectedType('Income');
						}}
						style={{
							width: 75,
							height: 40,
							backgroundColor:
								selectedType === 'Income'
									? COLOURS.yellow
									: COLOURS.lightGrey,
							borderTopStartRadius: 8,
							borderBottomStartRadius: 8,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text
							style={{
								color:
									selectedType === 'Income' ? 'white' : null,
							}}>
							Income
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setSelectedType('Expense');
						}}
						style={{
							width: 75,
							height: 40,
							backgroundColor:
								selectedType == 'Expense'
									? COLOURS.yellow
									: COLOURS.lightGrey,
							borderBottomEndRadius: 8,
							borderTopEndRadius: 8,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text
							style={{
								color:
									selectedType === 'Expense' ? 'white' : null,
							}}>
							Expense
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 26,
					}}>
					<TextInput
						style={{
							width: '80%',
							height: 40,
							borderWidth: 1,
							borderColor: COLOURS.yellow,
							paddingHorizontal: 15,
							borderRadius: 8,
						}}
						value={amount ? amount.toString() : ''}
						onChangeText={(val) => {
							setAmount(val);
						}}
						keyboardType='number-pad'
						placeholder='Amount'
					/>
				</View>
				<View
					style={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 26,
					}}>
					<TextInput
						style={{
							width: '80%',
							height: 40,
							borderWidth: 1,
							borderColor: COLOURS.yellow,
							paddingHorizontal: 15,
							borderRadius: 8,
						}}
						value={description}
						onChangeText={(val) => {
							setDescription(val);
						}}
						placeholder='Description'
					/>
				</View>
				<TouchableOpacity
					onPress={() => {
						setisDateShown(true);
					}}
					style={{
						justifyContent: 'center',
						marginTop: 26,
						width: '80%',
						height: 40,
						borderWidth: 1,
						paddingHorizontal: 15,
						borderColor: COLOURS.yellow,
						borderRadius: 8,
					}}>
					{isDateShown ? (
						<DateTimePicker
							value={date}
							mode={'date'}
							is24Hour={true}
							onChange={onChange}
							style={{ backgroundColor: 'rgba(0,0,0,0)' }}
						/>
					) : (
						<Text style={{ color: COLOURS.greyText }}>
							{date ? date.toDateString() : 'Date'}
						</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginTop: 15,
						padding: 20,
					}}
					onPress={() => {
						if (date && description.trim() && amount) {
							if (!isEdit) {
								dispatch(
									addTrack({
										date: date.toDateString(),
										track: [
											{
												id: uuid.v4(),
												description: description,
												amount: amount,
												type: selectedType,
											},
										],
									})
								);
							} else {
								dispatch(
									editTrackById({
										id,
										track: {
											date: date.toDateString(),
											description,
											amount,
											type: selectedType,
										},
									})
								);
							}
							dispatch(
								setWhichModalToOpen({
									isModalOpen: false,
									type: 'AddModalOverlay',
									data: {},
								})
							);
						} else {
							alert('Please fill all the fields');
						}
					}}>
					<Text style={{ color: COLOURS.yellow }}>Save</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AddModalOverlay;
