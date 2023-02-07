import { GodID as SingletonID, TxQueue } from "@latticexyz/network";
import { SystemTypes } from "contracts/types/SystemTypes";

import { Has, World } from "@latticexyz/recs";
import { useEntityQuery, useComponentValue } from "@latticexyz/react";
import { components, singletonIndex } from ".";

type Props = {
  world: World;
  systems: TxQueue<SystemTypes>;
  components: typeof components;
};

export const App = ({ systems, components }: Props) => {
  const componentEntities = useEntityQuery([Has(components.Counter)]);
  const counter = useComponentValue(
    components.Counter,
    componentEntities.length > 0 ? componentEntities[0] : singletonIndex
  );

  console.log("rerendering");

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          systems["system.Increment"].executeTyped(SingletonID);
        }}
      >
        Increment
      </button>
    </>
  );
};
