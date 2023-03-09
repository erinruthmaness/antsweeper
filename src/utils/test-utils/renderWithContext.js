import React from "react";
import { render } from "@testing-library/react";
import { Providers } from "utils/store";

const AllContextProviders = ({ children }) => {
  return (
    <Providers.Params>
      <Providers.Round isTestMode={true}>
        <Providers.Board>
          <Providers.User>{children}</Providers.User>
        </Providers.Board>
      </Providers.Round>
    </Providers.Params>
  );
};

export const renderWithGameContext = (ui, options) =>
  render(ui, { wrapper: AllContextProviders, ...options });
