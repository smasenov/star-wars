import { useState, useEffect, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { RootState } from '../../../store/reducers/index';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { TextField, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDebounce } from '../../../shared/hooks';
import { extractResourceTypeFromUrl, extractNumberFromUrl, isFullArray } from '../../../shared/utility';

type Details = {
	data: any;
	loading: boolean;
	error: string | null;
}

type SearchInputProps = {
	queryName: string,
	searchTerm: Details,
	onSearchTerm: (term: string, queryName: string) => void;
	onResetState: (state: string) => void;
}

type Option = {
	name: string;
}

type Result = {
	name: string;
	films: string[];
}

const SearchInput: React.FC<SearchInputProps> = (props) => {

	const { onSearchTerm, searchTerm, queryName, onResetState } = props;

	const [options, setOptions] = useState<{ name: string }[]>([]);

	const [open, setOpen] = useState(false);

	const [searchValue, setSearchValue] = useState('');

	const navigate = useNavigate();

	const debouncedHandleValue = useDebounce((value: string) => {
		setSearchValue(() => value);
	}, 500, [searchValue]);

	const { data: searchTermData, loading: searchTermLoading } = searchTerm;



	useEffect(() => {
		if (searchValue) {
			onSearchTerm(searchValue, queryName)
		}
	}, [searchValue, onSearchTerm])
	console.log('searchTermData', searchTermData);
	useEffect(() => {
		if (searchTermData?.results) {
			setOptions(searchTermData?.results.map((result: Result) => {
				const films = result.films?.map((url: string) => {
					const parts = url.split("/");
					const lastPart = parts[parts.length - 2];
					const number = parseInt(lastPart, 10); // Explicitly specify the base for parseInt
					return number;
				});

				const appearance = isFullArray(films) ? `(appears in: ${films})` : "(hasn't appeared yet)"

				return ({
					...result,
					name: `${result.name} ${appearance}`
				})
			}))
			setOpen(true);
		}
	}, [searchTermLoading])

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		debouncedHandleValue(value);
	};
	console.log('queryName', queryName);
	const handleGetOptionLabel = (option: Option) => option.name;

	const onChange = (event: ChangeEvent<{}>, values: any) => {
		// console.log('values', values)
		const num = values?.url && extractNumberFromUrl(values?.url)

		const updateQuery = queryName === 'all' ? extractResourceTypeFromUrl(values.url) : queryName;

		if (num) {
			navigate(`/${updateQuery}/${num}`);
		}
		setOpen(false);
		setSearchValue('');
		onResetState('searchTerm');
	};

	const handleBlur = () => {
		setOpen(false);
		setOptions([]);
		setSearchValue('');
		onResetState('searchTerm');
	};

	const loading = false;

	return (
		<Autocomplete
			options={options}
			open={open}
			getOptionLabel={handleGetOptionLabel}
			onChange={onChange}
			renderInput={params => (
				<TextField
					onChange={handleInputChange}
					{...params}
					InputProps={{
						sx: { borderRadius: '24px', width: '400px' },
						...params.InputProps, endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
							</>
						),
					}}
					onBlur={handleBlur}
				/>
			)}
		/>
	)
}

const mapStateToProps = (state: RootState) => {
	return {
		searchTerm: state.details.searchTerm
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		onSearchTerm: (term: string, queryName: string) => dispatch(actions.searchTerm(term, queryName)),
		onResetState: (state: string,) => dispatch(actions.resetState(state)),

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);