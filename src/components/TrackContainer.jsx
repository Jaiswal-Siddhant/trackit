import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOURS } from '../static/colors';
import SingleTrack from './SingleTrack';

const TrackContainer = ({ item, index }) => {
	return (
		<View
			key={index}
			style={{
				marginTop: 22,
				alignItems: 'center',
			}}>
			<View>
				<Text
					style={{
						height: 16,
						color: COLOURS.greyText,
					}}>
					{item.date}
				</Text>
			</View>
			{item?.track?.map((track, trackIndex) => (
				<SingleTrack
					index={index}
					date={item.date}
					trackIndex={trackIndex}
					track={track}
					key={`${track.id}->${trackIndex}`}
				/>
			))}
		</View>
	);
};

export default TrackContainer;
