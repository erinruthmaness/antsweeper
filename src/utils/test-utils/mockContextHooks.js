import { board } from "utils/store/initialState";

export const mockUseBoardContext = jest.fn().mockImplementation(() => ({
    setFace: jest.fn().mockImplementation(newFace => newFace),
    reset: jest.fn(),
    clear: jest.fn(),
    update: jest.fn(),
    ...board
}));