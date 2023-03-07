import React from "react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithGameContext } from "utils/test-utils/renderWithContext";
import Board from "Components/Game/Board";

afterEach(cleanup);

test("squares can be flagged", () => {
    const { getByRole } = renderWithGameContext(<Board />);
    userEvent.click(getByRole("button", { name: "start-game" }));
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }), {button: 2});
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "flagged");
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "flagged");
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }), {button: 2});
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
});