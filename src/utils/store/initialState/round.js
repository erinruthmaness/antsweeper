import { defaultUserStats } from "./userStats";

const defaultRoundState = {
    test: false,
    ready: false,
    started: false,
    antList: [],
    time: undefined,
    userStats: defaultUserStats,
};

export default defaultRoundState;
