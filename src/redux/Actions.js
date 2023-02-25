import {
	ADD_TRACK,
	DELETE_TRACK_BY_ID,
	EDIT_TRACK_BY_ID,
	SET_USER,
	REMOVE_EVERYTHING,
	SET_MODAL_STATE,
	SET_WHICH_MODAL_TO_OPEN,
} from './actionTypes';

export const setUser = (data) => ({
	type: SET_USER,
	payload: data,
});

export const setWhichModalToOpen = (data) => ({
	type: SET_WHICH_MODAL_TO_OPEN,
	payload: data,
});

export const addTrack = (data) => ({
	type: ADD_TRACK,
	payload: data,
});

export const setModalState = (data) => ({
	type: SET_MODAL_STATE,
	payload: {
		isModalOpen: data,
		type: null,
		data: {
			id: null,
			date: null,
			amount: null,
			description: null,
			type: null,
		},
	},
});

export const editTrackById = (data) => ({
	type: EDIT_TRACK_BY_ID,
	payload: data,
});

export const deleteTrackById = (data) => ({
	type: DELETE_TRACK_BY_ID,
	payload: data,
});

export const removeEverything = () => ({
	type: REMOVE_EVERYTHING,
});
