import React from "react";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithGameContext } from "utils/test-utils/renderWithContext";
import Board from "../Board";

afterEach(cleanup);

test("first square turns over with 0 nearby ants", () => {
    const { getByRole } = renderWithGameContext(<Board />);
    userEvent.click(getByRole("button", { name: "startGame" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
});

test("startGame button resets a game in progress", () => {
    const { getByRole } = renderWithGameContext(<Board />);
    userEvent.click(getByRole("button", { name: "startGame" }));
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
    waitFor(() => expect(getByRole("timer")).toHaveAttribute("aria-roledescription", "elapsed time is 2 seconds"));
    userEvent.click(getByRole("button", { name: "startGame" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
    expect(getByRole("timer")).toHaveAttribute("aria-roledescription", "elapsed time is 0 seconds");
})