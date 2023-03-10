import windowContext, { WindowCtxProvider } from "./windowContext";
import paramsContext, { ParamsCtxProvider } from "./paramsContext";
import roundContext, { RoundCtxProvider } from "./roundContext";
import userContext, { UserCtxProvider } from "./userContext";
import boardContext, { BoardCtxProvider } from "./boardContext";

const Providers = {
  Window: WindowCtxProvider,
  Params: ParamsCtxProvider,
  Round: RoundCtxProvider,
  Board: BoardCtxProvider,
  User: UserCtxProvider,
}

export {
  boardContext,
  paramsContext,
  roundContext,
  userContext,
  windowContext,
  Providers
};
