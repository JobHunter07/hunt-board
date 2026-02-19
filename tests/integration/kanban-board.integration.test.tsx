import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { DEFAULT_COLUMNS } from '@/features/kanban-board/validation/column.schema';
import { createJobTarget } from '@/features/kanban-board/validation/jobTarget.schema';
import type { ColumnId } from '@/features/kanban-board/types';
import {
  buildBoundaryJobTarget,
  buildBoardLoadProfile,
  buildNormalJobTarget,
  setFakerSeed,
} from '../factories/fakerProfiles';

const STORAGE_KEY = 'hunt-board:board-state';

describe('Kanban Board Integration - Faker Profiles', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates a new target using normal faker profile data', async () => {
    setFakerSeed(20260230);
    const user = userEvent.setup();
    const profile = buildNormalJobTarget({ columnId: 'targets-identified' });

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'Add Target' })[0]!);
    await user.type(screen.getByLabelText(/company/i), profile.company);
    await user.type(screen.getByLabelText(/role/i), profile.role);
    await user.click(screen.getByRole('button', { name: 'Create Target' }));

    await waitFor(() => {
      expect(screen.getByText(profile.company)).toBeInTheDocument();
    });
  });

  it('accepts boundary-length faker profile input in add target workflow', async () => {
    setFakerSeed(20260231);
    const user = userEvent.setup();
    const profile = buildBoundaryJobTarget({ columnId: 'targets-identified' });

    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'Add Target' })[0]!);
    await user.type(screen.getByLabelText(/company/i), profile.company);
    await user.type(screen.getByLabelText(/role/i), profile.role);
    await user.click(screen.getByRole('button', { name: 'Create Target' }));

    await waitFor(() => {
      expect(screen.getByText(profile.company)).toBeInTheDocument();
    });
  });

  it('loads an extreme faker data profile from localStorage and renders high-card volume', async () => {
    setFakerSeed(20260232);
    const extremeTargets = buildBoardLoadProfile('extreme').slice(0, 120);

    const persistedTargets = extremeTargets.map((profile, index) => {
      const columnId = (profile.columnId || 'targets-identified') as ColumnId;
      const base = createJobTarget(profile.company, columnId);

      return {
        ...base,
        role: profile.role,
        notes: profile.notes,
        tags: profile.tags,
        priority: profile.priority,
        warmUpScore: profile.warmUpScore,
        nextFollowUpDate: profile.nextFollowUpDate,
        updatedAt: new Date(Date.now() + index).toISOString(),
      };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 'v1.0.0',
        jobTargets: persistedTargets,
        columns: DEFAULT_COLUMNS,
        tags: [],
        lastUpdated: new Date().toISOString(),
      }),
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(`Showing ${persistedTargets.length} of ${persistedTargets.length} targets`)).toBeInTheDocument();
    });

    expect(screen.getByText(persistedTargets[0]?.company ?? '')).toBeInTheDocument();
  });
});
