import { Box, Typography } from '@mui/material';

interface HeaderProps {
	title: string;
}

const Header: React.FC<HeaderProps> = (props) => {

	const { title } = props;

	return (
		<Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
			<Typography variant='h2'>{title}</Typography>
		</Box>
	)
}

export default Header;