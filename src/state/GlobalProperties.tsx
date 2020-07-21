import React, { useReducer } from "react";
import { DynamicGlobalProperties } from "@hivechain/dhive";
import { BlockMetadata } from "hiveyt-types";
import { HivePrice } from "services/Market.service";

const MAX_RECENT_BLOCKS_LENGTH = 10;

enum ActionType {
  "ADD_RECENT_BLOCK",
  "UPDATE_GLOBAL_PROPERTIES",
  "SET_PRICES",
}

interface GlobalPropertiesState {
  blocks: BlockMetadata[];
  blockchainProperties: Partial<DynamicGlobalProperties>;
  price: HivePrice;
}

export type GlobalPropertiesAction =
  | { type: ActionType.ADD_RECENT_BLOCK; block: BlockMetadata }
  | {
      type: ActionType.UPDATE_GLOBAL_PROPERTIES;
      properties: DynamicGlobalProperties;
    }
  | {
      type: ActionType.SET_PRICES;
      price: HivePrice;
    };

const initialState: GlobalPropertiesState = {
  blocks: [],
  blockchainProperties: {},
  price: {},
};

function globalPropertiesReducer(
  state: GlobalPropertiesState = initialState,
  action: GlobalPropertiesAction
): GlobalPropertiesState {
  switch (action.type) {
    case ActionType.ADD_RECENT_BLOCK:
      const currentBlocks = state.blocks;

      if (state.blocks.length === MAX_RECENT_BLOCKS_LENGTH) {
        currentBlocks.shift();
      }

      return { ...state, blocks: [...currentBlocks, action.block] };
    case ActionType.UPDATE_GLOBAL_PROPERTIES:
      return { ...state, blockchainProperties: action.properties };
      // TODO: load market data and get intervally
    case ActionType.SET_PRICES:
      return { ...state, price: action.price };
    default:
      return state;
  }
}

export const GlobalPropertiesContext = React.createContext<{
  state: GlobalPropertiesState;
  dispatch: React.Dispatch<GlobalPropertiesAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GlobalPropertiesProvider: React.FunctionComponent<{}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalPropertiesReducer, initialState);

  return (
    <GlobalPropertiesContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalPropertiesContext.Provider>
  );
};

export { ActionType as GlobalPropertiesActionType };
