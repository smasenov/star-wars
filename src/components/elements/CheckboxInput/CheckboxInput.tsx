import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { capitalize } from '../../../shared/utility';

type ListItem = {
	id: string;
	name: string;
	checked: boolean;
}

type CheckboxInputProps = {
	checkList: ListItem[];
	onChange: (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ checkList, onChange }) => {

	return (
		<FormGroup sx={{ alignSelf: 'flex-start' }}>
			{checkList.map(list => (
				<FormControlLabel
					key={list.id}
					label={capitalize(list.name)}
					control={
						<Checkbox
							checked={list.checked}
							onChange={onChange(list.id)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
				/>
			))}
		</FormGroup>
	);
}

export default CheckboxInput;