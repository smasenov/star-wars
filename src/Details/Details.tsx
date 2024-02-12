import { useEffect, Suspense } from 'react';
import { Page } from '../components';
import { Dispatch } from 'redux';
import { RootState } from '../store/reducers/index';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../store/actions';
import Header from './Header';
import { LinearProgress, Grid } from '@mui/material';
import { ExtraInformation } from './ExtraInformation';
import { Information } from './Information';
import { isObject, extractNumberFromUrl, isFullString } from '../shared/utility';

type getDetails = {
	data: any;
	loading: boolean;
	error: string | null;
}

type DetailsProps = {
	getDetails: getDetails,
	onGetDetails: (queryName: string, id: number) => void;
	onGetHomeworld: (queryName: string, id: number) => void;
	onGetFilmsNames: (filmUrls: string[]) => void;
}

const Details: React.FC<DetailsProps> = (props) => {

	const { onGetDetails, getDetails, onGetHomeworld, onGetFilmsNames } = props;

	const params = useParams<{ type: string, id: string }>();

	const { type, id } = params;

	const { data: getDetailsData } = getDetails;

	useEffect(() => {
		if (type && id !== undefined) {
			onGetDetails(type, parseInt(id));
		}
	}, [type, id, onGetDetails])

	useEffect(() => {
		if (isObject(getDetailsData) && getDetailsData?.homeworld) {
			const num = extractNumberFromUrl(getDetailsData?.homeworld)
			if (num) {
				onGetHomeworld('planets', num);
			}

		}
	}, [getDetailsData, onGetHomeworld])


	useEffect(() => {
		if (getDetailsData?.films) {
			onGetFilmsNames(getDetailsData?.films);
		}
	}, [onGetFilmsNames, getDetailsData])

	const gridProps = { item: true, xs: 12, md: 6, lg: 6, xl: 4 };

	return (
		<Page sx={{ minHeight: '100vh', margin: 0, padding: 3, backgroundColor: '#e8eaf6' }} title='Details'>
			<Header />
			<Suspense fallback={<LinearProgress />}>
				<Grid
					container
					spacing={3}
				>
					<Grid {...gridProps}>
						<Information />
					</Grid>
					<Grid {...gridProps} >
						<ExtraInformation />
					</Grid>
				</Grid>
			</Suspense>
		</Page>
	);

};

const mapStateToProps = (state: RootState) => {
	return {
		getDetails: state.details.getDetails
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		onGetDetails: (queryName: string, id: number) => dispatch(actions.getDetails(queryName, id)),
		onGetHomeworld: (queryName: string, id: number) => dispatch(actions.getHomeworld(queryName, id)),
		onGetFilmsNames: (filmUrls: string[]) => dispatch(actions.getFilmsNames(filmUrls))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);