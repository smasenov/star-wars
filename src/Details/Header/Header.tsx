import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/reducers/index';
import { connect } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { SearchInput } from '../../components';

type getDetails = {
	data: any;
	loading: boolean;
	error: string | null;
}

type HeaderProps = {
	getDetails: getDetails,
}

const Header: React.FC<HeaderProps> = (props) => {

	const { getDetails } = props;

	const { data: getDetailsData } = getDetails;

	const params = useParams<{ type: string }>();

	const { type } = params;

	const navigate = useNavigate();

	const handleGoBack = () => navigate(-1);

	return (
		<div>
			<Typography
				component="h2"
				gutterBottom
				variant="overline"
			>
				<Button onClick={handleGoBack} startIcon={<KeyboardArrowLeftOutlinedIcon />}> Back</Button>
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
				<Typography variant="h3">{getDetailsData?.name} </Typography>
				<SearchInput queryName={type ? type : ''} />
			</Box>
		</div>
	);
};


const mapStateToProps = (state: RootState) => {
	return {
		getDetails: state.details.getDetails
	};
};


export default connect(mapStateToProps, null)(Header);
