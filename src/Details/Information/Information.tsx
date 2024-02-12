import { connect } from 'react-redux';
import { RootState } from '../../store/reducers/index';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Table, TableBody, TableRow, TableCell, CardHeader, Divider } from '@mui/material';
import { isObject } from '../../shared/utility';

type getDetails = {
	data: any;
	loading: boolean;
	error: string | null;
}

type InformationProps = {
	getDetails: getDetails,
}

const Information: React.FC<InformationProps> = (props) => {

	const { getDetails } = props;

	const { data: getDetailsData } = getDetails;

	const params = useParams<{ type: string }>();

	const { type } = params;

	const informationDetails = isObject(getDetailsData) ? [
		{ key: '10', label: 'Name', value: getDetailsData?.name },
		...(type === 'starships' || type === 'vehicles' ? [
			{ key: '11', label: 'Model', value: getDetailsData?.model },
			{ key: '12', label: 'Class', value: getDetailsData?.starship_class ? getDetailsData?.starship_class : getDetailsData?.vehicle_class },
			{ key: '13', label: 'Manufacturer', value: getDetailsData?.manufacturer },
			{ key: '14', label: 'Credits', value: getDetailsData?.cost_in_credits }
		] : []),
		...(type === 'planets' ? [
			{ key: '15', label: 'Climate', value: getDetailsData?.climate },
			{ key: '16', label: 'Population', value: getDetailsData?.population },
			{ key: '17', label: 'Rotation period', value: getDetailsData?.rotation_period },
			{ key: '18', label: 'Terrain', value: getDetailsData?.terrain },
		] : []),
		...(type === 'people' ? [
			{ key: '19', label: 'Gender', value: getDetailsData?.gender },
			{ key: '20', label: 'Eye color', value: getDetailsData?.eye_color },
			{ key: '21', label: 'Hair color', value: getDetailsData?.hair_color },
			{ key: '22', label: 'Height', value: getDetailsData?.height },
		] : [])
	] : []

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardHeader title='Information' />
			<Divider />
			<CardContent>
				<Table>
					<TableBody>
						{informationDetails.map(item => (
							<TableRow key={item.key}>
								<TableCell>{item.label}</TableCell>
								<TableCell>{item.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

const mapStateToProps = (state: RootState) => {
	return {
		getDetails: state.details.getDetails
	};
};

export default connect(mapStateToProps, null)(Information);