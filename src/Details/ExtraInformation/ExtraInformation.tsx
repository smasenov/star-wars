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

type getHomeworld = {
	data: any;
	loading: boolean;
	error: string | null;
}

type getFilmsNames = {
	data: any;
	loading: boolean;
	error: string | null;
}

type ExtraInformationProps = {
	getDetails: getDetails,
	getHomeworld: getHomeworld,
	getFilmsNames: getFilmsNames
}

const ExtraInformation: React.FC<ExtraInformationProps> = (props) => {

	const { getDetails, getHomeworld, getFilmsNames } = props;

	const { data: getDetailsData } = getDetails;

	const { data: getHomeworldData } = getHomeworld;

	const { data: getFilmsNamesData } = getFilmsNames;

	const params = useParams<{ type: string }>();

	const { type } = params;

	const filmNamesWithCommas = getFilmsNamesData?.map((name: string, index: number, array: string[]) => {
		// Add a comma for each film name except for the first and last ones
		return index === 0 ? name : (index === array.length - 1 ? ` ${name}` : `, ${name}`);
	});

	const informationDetails = isObject(getDetailsData) ? [
		...(type === 'starships' || type === 'vehicles' ? [
			{ key: '11', label: 'Passengers', value: getDetailsData?.passengers },
			{ key: '12', label: 'Crew', value: getDetailsData?.crew },
			{ key: '13', label: 'Length', value: getDetailsData?.length },
			...(type === 'starships' ? [{ key: '4', label: 'Hyperdrive rating', value: getDetailsData?.hyperdrive_rating }] : [
				{ key: '14', label: 'Cargo capacity', value: getDetailsData?.cargo_capacity }
			]),
		] : []),
		...(type === 'planets' ? [
			{ key: '15', label: 'Diameter', value: getDetailsData?.diameter },
			{ key: '16', label: 'Gravity', value: getDetailsData?.gravity },
			{ key: '17', label: 'Surface water', value: getDetailsData?.surface_water },
			{ key: '18', label: 'Orbital period', value: getDetailsData?.orbital_period },

		] : []),
		...(type === 'people' ? [
			{ key: '20', label: 'Birth year', value: getDetailsData?.birth_year },
			{ key: '21', label: 'Mass', value: getDetailsData?.mass },
			{ key: '22', label: 'Skin color', value: getDetailsData?.skin_color },
			{ key: '23', label: 'Homeworld', value: getHomeworldData?.name },
		] : []),
		{ key: '24', label: 'Films', value: filmNamesWithCommas?.join('') },
	] : []

	return (
		<Card>
			<CardHeader title='Additional information' />
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
		getDetails: state.details.getDetails,
		getHomeworld: state.details.getHomeworld,
		getFilmsNames: state.details.getFilmsNames
	};
};

export default connect(mapStateToProps, null)(ExtraInformation);
