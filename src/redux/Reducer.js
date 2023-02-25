import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, * as others from 'axios';
import {
	ADD_TRACK,
	DELETE_TRACK_BY_ID,
	EDIT_TRACK_BY_ID,
	SET_USER,
	REMOVE_EVERYTHING,
	SET_MODAL_STATE,
	SET_WHICH_MODAL_TO_OPEN,
} from './actionTypes';
import uuid from 'react-native-uuid';

const storeData = async (data) => {
	console.log(data);
	try {
		await AsyncStorage.setItem('tracks', JSON.stringify(data));
	} catch (e) {
		console.log(e);
	}
};

export const Reducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TRACK:
			// console.log('state ----> ', state);
			for (let item of state) {
				if (item.date === action.payload.date) {
					item.track.push({
						id: item.id,
						description: action.payload.track[0].description,
						amount: parseFloat(action.payload.track[0].amount),
						type: action.payload.track[0].type,
					});
					storeData([...state]);
					return [...state];
				}
			}
			const newState = [
				...state,
				{
					id: uuid.v4(),
					...action.payload,
				},
			];
			storeData(newState);
			return newState;

		case EDIT_TRACK_BY_ID:
			console.log(action.payload);
			state.forEach((item) => {
				return item.track.forEach((track) => {
					if (track.id === action.payload.id) {
						item.date = action.payload.track.date;
						track.description = action.payload.track.description;
						track.amount = parseFloat(action.payload.track.amount);
						track.type = action.payload.track.type;
					}
				});
			});
			console.log('INCOMING state =======>', action.payload);
			console.log('Edited state =======>', state);
			storeData([...state]);
			return [...state];

		case DELETE_TRACK_BY_ID:
			state.forEach((item) => {
				return item.track.forEach((track) => console.log(track.id));
			});
			state.forEach((item, indexOfTrackObj) => {
				return item.track.forEach((track, index) => {
					if (track.id === action.payload) {
						item.track.splice(index, 1);
					}
					if (item.track.length === 0) {
						state.splice(indexOfTrackObj, 1);
					}
				});
			});
			storeData(state);

			return [...state];

		case REMOVE_EVERYTHING:
			return null;

		default:
			return state;
	}
};

export const modalReducer = (
	state = {
		isModalOpen: false,
		type: null,
		data: {
			id: null,
			date: null,
			amount: null,
			description: null,
			type: null,
		},
	},
	action
) => {
	// console.log('state', state, 'action', action);
	switch (action.type) {
		case SET_MODAL_STATE:
			return action.payload;

		case SET_WHICH_MODAL_TO_OPEN:
			return action.payload;

		default:
			return state;
	}
};

export const userReducer = (
	state = { profileURI: '', name: '', userName: '', email: '', address: '' },
	action
) => {
	switch (action.type) {
		case SET_USER:
			console.log('USER --->', action.payload);

			return {
				profileURI: action.payload.profileURI,
				name: action.payload.name,
				userName: action.payload.userName,
				email: action.payload.email,
				address: action.payload.address,
			};
		default:
			return state;
	}
};
