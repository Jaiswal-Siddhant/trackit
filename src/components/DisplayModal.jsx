const { Modal, View, TouchableOpacity, BackHandler } = require('react-native');
const { useDispatch, useSelector } = require('react-redux');
const { setModalState } = require('../redux/Actions');
import { Entypo } from '@expo/vector-icons';

const DisplayModal = ({ children }) => {
	const isModalOpen = useSelector((state) => state.modalReducer.isModalOpen);
	const dispatch = useDispatch();
	BackHandler.addEventListener('hardwareBackPress', () => {
		dispatch(setModalState(false));
	});

	return (
		<Modal
			visible={isModalOpen}
			style={{
				position: 'relative',
				width: '100%',
			}}
			transparent
			animationType='slide'>
			<View
				style={{
					backgroundColor: 'rgba(0,0,0,0.5)',
					width: '100%',
					height: '100%',
					position: 'absolute',
					bottom: 0,
					paddingBottom: 0,
				}}>
				<View
					onTouchEnd={() => {
						console.log(isModalOpen);
						dispatch(setModalState(false));
					}}
					style={{
						height: '10%',
					}}
				/>
				<View
					style={{
						display: 'flex',
						position: 'absolute',
						width: '100%',
						bottom: 0,
						height: '90%',
						backgroundColor: 'white',
					}}>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 20,
							top: 20,
							zIndex: 1,
							padding: 10,
						}}
						onPress={() => {
							dispatch(setModalState(false));
						}}>
						<Entypo name='cross' size={24} color='black' />
					</TouchableOpacity>
					{/* Children */}
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default DisplayModal;
