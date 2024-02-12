import { Radio, FormControlLabel, FormControl } from '@mui/material';
import { capitalize } from '../../../shared/utility';

type ListItem = {
	id: string;
	name: string;
	checked: boolean;
}

type RadioInputProps = {
	checkList: ListItem[];
	onChange: (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ checkList, onChange }) => {

	return (
		<FormControl sx={{ alignSelf: 'flex-start' }}>
			{checkList.map(list => (
				<FormControlLabel
					key={list.id}
					label={capitalize(list.name)}
					control={
						<Radio
							checked={list.checked}
							onChange={onChange(list.id)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
				/>
			))}
		</FormControl>
	);
}

export default RadioInput;