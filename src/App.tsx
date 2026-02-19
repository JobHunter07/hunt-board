import { ThemeProvider, CssBaseline } from '@mui/material';
import { huntBoardTheme } from '@/lib/theme';
import { KanbanBoardPage } from '@/features/kanban-board';

export function App() {
  return (
    <ThemeProvider theme={huntBoardTheme}>
      <CssBaseline />
      <KanbanBoardPage />
    </ThemeProvider>
  );
}
