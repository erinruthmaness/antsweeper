import React from "react";
import { render } from "@testing-library/react";
// import { WindowCtxProvider } from "utils/store/windowContext";
import { RoundCtxProvider } from "utils/store/roundContext";
import { UserCtxProvider } from "utils/store/userContext";
import { ParamsCtxProvider } from "utils/store/paramsContext";
import { BoardCtxProvider } from "utils/store/boardContext";

const AllContextProviders = ({ children }) => {
    return (
            <RoundCtxProvider>
                <UserCtxProvider>
                    <ParamsCtxProvider>
                        <BoardCtxProvider>{children}</BoardCtxProvider>
                    </ParamsCtxProvider>
                </UserCtxProvider>
            </RoundCtxProvider>
    );
};

export const renderWithGameContext = (ui, options) => render(ui, { wrapper: AllContextProviders, ...options });