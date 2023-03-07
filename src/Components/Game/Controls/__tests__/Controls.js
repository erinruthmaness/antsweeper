import React from "react";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithGameContext } from "utils/test-utils/renderWithContext";
import Board from "Components/Game/Board";

afterEach(cleanup);

test("start-game button resets a game in progress", () => {
    const { getByRole } = renderWithGameContext(<Board />);
    userEvent.click(getByRole("button", { name: "start-game" }));
    userEvent.click(getByRole("button", { name: "cell-x1-y2" }));
    expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "0 ants nearby");
    waitFor(() =>
        expect(getByRole("timer")).toHaveAttribute(
            "aria-roledescription",
            "elapsed time is 2 seconds"
        )
    );
    userEvent.click(getByRole("button", { name: "start-game" }));
    expect(getByRole("timer")).toHaveAttribute("aria-roledescription", "elapsed time is 0 seconds");
    // expect(getByRole("button", { name: "cell-x1-y2" })).toHaveProperty("value", "unknown");
});
