import React from "react";
import { cleanup, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithGameContext } from "utils/test-utils/renderWithContext";
import Board from "Components/Game/Board";

afterEach(cleanup);

test("first square turns over with 0 nearby ants", () => {
    const { getByRole } = renderWithGameContext(<Board />);
    userEvent.click(getByRole("button", { name: "start-game" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
});

// test("clicking an ant square ends the game", () => {
//     const { getByRole, getAllByTestId } = renderWithGameContext(<Board />);
//     userEvent.click(getByRole("button", { name: "start-game" }));
//     userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
//     userEvent.click(getAllByTestId("ant")[0]);
//     expect(getByTestId("game-status")).toHaveDisplayValue("Game Over.");
// });

// test("startGame button resets a game in progress", () => {
//     const { getByRole } = renderWithGameContext(<Board />);
//     userEvent.click(getByRole("button", { name: "startGame" }));
//     userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
//     expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
//     waitFor(() => expect(getByRole("timer")).toHaveAttribute("aria-roledescription", "elapsed time is 2 seconds"));
//     userEvent.click(getByRole("button", { name: "startGame" }));
//     expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
//     expect(getByRole("timer")).toHaveAttribute("aria-roledescription", "elapsed time is 0 seconds");
// })