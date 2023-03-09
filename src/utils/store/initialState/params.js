import { LEVELS as LEVEL_STRINGS } from "utils/strings";

export const allParamsByLevel = {
  [LEVEL_STRINGS.BEGINNER]: {
    rows: 8,
    cols: 8,
    ants: 10,
    level: LEVEL_STRINGS.BEGINNER,
    bestTime: undefined,
  },
  [LEVEL_STRINGS.INTERMEDIATE]: {
    rows: 16,
    cols: 16,
    ants: 40,
    level: LEVEL_STRINGS.INTERMEDIATE,
    bestTime: undefined,
  },
  [LEVEL_STRINGS.EXPERT]: {
    rows: 24,
    cols: 24,
    ants: 99,
    level: LEVEL_STRINGS.EXPERT,
    bestTime: undefined,
  },
};

export const INITIAL_LEVEL = LEVEL_STRINGS.BEGINNER;

export const initialLevelParams = allParamsByLevel[INITIAL_LEVEL];
