import windowContext, { WindowCtxProvider } from "./windowContext";
import paramsContext, { ParamsCtxProvider } from "./paramsContext";
import roundContext, { RoundCtxProvider } from "./roundContext";
import userContext, { UserCtxProvider } from "./userContext";
import { useGameContext, BoardCtxProvider } from "./boardContext";

const Providers = {
  Window: WindowCtxProvider,
  Params: ParamsCtxProvider,
  Round: RoundCtxProvider,
  Board: BoardCtxProvider,
  User: UserCtxProvider,
}

export {
  useGameContext,
  paramsContext,
  roundContext,
  userContext,
  windowContext,
  Providers
};
