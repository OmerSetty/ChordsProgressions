import { createTheme, ThemeOptions  } from '@mui/material/styles';

const defaultTheme = createTheme();

interface IThemeOptions extends ThemeOptions {}

export const theme = createTheme({
  typography: {
    cardHeadline: {
      ...defaultTheme.typography.body1,
      display: 'block',
      fontSize: '18px',
      textAlign: 'center',
    },
    cardSubHeadline: {
      ...defaultTheme.typography.body2,
      display: 'block',
      color: defaultTheme.palette.text.secondary,
      textAlign: 'center',
    },
    scoreHeadline: {
      ...defaultTheme.typography.body1,
      fontSize: '16px',
      fontWeight: 500,
      p: 0,
      color: '#011f4b'
    },
    scoreValue: {
      ...defaultTheme.typography.body1,
      fontSize: '12px',
    },
    degreesOptionsHeadline: {
      ...defaultTheme.typography.body1,
      fontSize: '20px',
      fontWeight: 500,
    },
    willBeReadySoon: {
      ...defaultTheme.typography.body1,
      color: defaultTheme.palette.text.secondary,
      fontSize: '40px'
    }
  },
  palette: {
    primary: {
      main: "#011f4b",
      container: "#efefef",
      lightblue: '#b8c8e1',
      white: '#ffffff',
      card: '#fbfbfb',
      rightAnswer: '#92cb73',
      wrongAnswer: '#ffc0c0',
      focusedAnswer: '#b1b1b1'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      xstosm: 350,
      sm: 500,
      md: 650,
      lg: 1200,
      xl: 1536,
    },
  },
} as IThemeOptions);

