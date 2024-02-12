import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

interface PageProps {
	title: string;
	children: React.ReactNode;
	[key: string]: any; // Allow any other props
}

const Page: React.FC<PageProps> = props => {
	const { title, children, ...rest } = props;

	return (
		<Box {...rest}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</Box>
	);
};

export default Page;