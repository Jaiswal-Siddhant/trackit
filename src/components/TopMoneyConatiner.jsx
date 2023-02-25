import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOURS } from '../static/colors';
import { formatMoney } from '../helpers/formatMoneyHelper';

const TopMoneyConatiner = ({ income, expense }) => {
	return (
		<View style={{ backgroundColor: 'white' }}>
			<View style={styles.totalsView}>
				<View style={styles.totalsBox}>
					<Text style={styles.balanceHeader}>Balance</Text>
					<Text style={styles.totalBalanceText}>
						{formatMoney(income - expense)}
					</Text>
				</View>
				<View style={styles.verticalDivider}></View>
				<View style={styles.totalsBox}>
					<View style={styles.totalsBox}>
						<View style={styles.incomeContainer}>
							<Text style={styles.balanceHeader}>Income</Text>
							<Text style={styles.incomeText}>
								{formatMoney(income)}
							</Text>
						</View>
						<View style={styles.expenseContainer}>
							<Text style={styles.expenseMoneyText}>
								{formatMoney(expense)}
							</Text>
							<Text style={styles.balanceHeader}>Expense</Text>
						</View>
					</View>
				</View>
			</View>
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
	incomeContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	incomeText: {
		fontSize: 22,
		color: COLOURS.greenText,
		fontWeight: '600',
	},
	expenseContainer: {
		marginTop: 15,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	expenseMoneyText: {
		fontSize: 22,
		color: COLOURS.redText,
		fontWeight: '600',
	},
});

export default TopMoneyConatiner;
