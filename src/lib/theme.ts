import { createTheme } from '@mui/material/styles';

/**
 * Hunt Board Material UI theme
 * Constitutional requirement: Material Design 3 compliance
 * Primary color: Deep red #B71C1C (per copilot-instructions.md)
 */
export const huntBoardTheme = createTheme({
  palette: {
    primary: {
      main: '#B71C1C', // Deep red
      light: '#E57373',
      dark: '#7F0000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#546E7A', // Slate
      light: '#819CA9',
      dark: '#29434E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Light grey
      paper: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#F57C00',
    },
    success: {
      main: '#388E3C',
    },
    info: {
      main: '#1976D2',
    },
  },
  shape: {
    borderRadius: 8, // Material Design 3 rounded corners
  },
  spacing: 8, // 8px grid (Material Design standard)
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable ALL CAPS
        },
      },
    },
  },
});
