import { useLocale } from '../../hooks/locale';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Title = () => {
  const { t } = useLocale();
  const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  return (
    <Typography
      variant={isXSmall ? 'h4' : 'h3'}
      component='h1'
      sx={{
        fontWeight: { xs: 'medium' },
        lineHeight: '1.5',
        textAlign: 'left',
        display: 'inline-block',
      }}
    >
      {t.TITLE}
    </Typography>
  );
};

export default Title;