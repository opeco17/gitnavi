import { useLocale } from '../../hooks/locale';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

type MinMaxNumberFieldsProps = {
  minValue: number | '';
  maxValue: number | '';
  onChangeMin: (event: any) => void;
  onChangeMax: (event: any) => void;
};

const MinMaxNumberFields = ({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
}: MinMaxNumberFieldsProps) => {
  const theme = useTheme();
  const { t } = useLocale();

  const [minInputError, setMinInputError] = useState(false);
  const [maxInputError, setMaxInputError] = useState(false);

  const [minInputErrorMessage, setMinInputErrorMessage] = useState('');
  const [maxInputErrorMessage, setMaxInputErrorMessage] = useState('');

  // Now it's not used
  const onChangeMinHandler = (event: any) => {
    setMinInputError(false);
    setMinInputErrorMessage('');

    const value = event.target.value;
    if (value !== '' && value < 0) {
      setMinInputError(true);
      setMinInputErrorMessage(t.EQUAL_OR_GREATER_THAN_ZERO_ERROR_MESSAGE);
    }
    onChangeMin(event);
  };

  // Now it's not used
  const onChangeMaxHandler = (event: any) => {
    setMaxInputError(false);
    setMaxInputErrorMessage('');

    const value = event.target.value;
    if (value !== '' && value < 0) {
      setMaxInputError(true);
      setMaxInputErrorMessage(t.EQUAL_OR_GREATER_THAN_ZERO_ERROR_MESSAGE);
    }
    onChangeMax(event);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            placeholder='Min'
            size='small'
            type='number'
            value={minValue}
            onChange={onChangeMin}
            error={minInputError}
            helperText={minInputErrorMessage}
            InputProps={{
              sx: { color: theme.palette.greyText.main },
            }}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder='Max'
            size='small'
            type='number'
            value={maxValue}
            onChange={onChangeMax}
            error={maxInputError}
            helperText={maxInputErrorMessage}
            InputProps={{
              sx: { color: theme.palette.greyText.main },
            }}
          ></TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default MinMaxNumberFields;
