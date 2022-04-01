import { defaultUserStats } from "./userStats";

const defaultRoundState = {
    ready: false,
    started: false,
    antList: [],
    time: undefined,
    userStats: defaultUserStats,
};

export default defaultRoundState;
