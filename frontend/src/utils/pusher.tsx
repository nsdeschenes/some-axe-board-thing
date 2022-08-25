import Pusher, { Channel, PresenceChannel } from "pusher-js";
import { useEffect, useRef, useState } from "react";
import createContext from "zustand/context";
import vanillaCreate, { StoreApi } from "zustand/vanilla";

const pusher_key = "app-key";
const pusher_server_host = "localhost";
const pusher_server_port = 6001;
const pusher_server_tls = false;
const pusher_cluster = "";

interface PusherZustandStore {
  pusherClient: Pusher;
  channel: Channel;
  presenceChannel: PresenceChannel;
  members: Map<string, any>;
}

const createPusherStore = (slug: string) => {
  let pusherClient: Pusher;
  if (Pusher.instances.length) {
    pusherClient = Pusher.instances[0] as Pusher;
    pusherClient.connect();
  } else {
    const randomUserId = `random-user-id:${Math.random().toFixed(7)}`;
    pusherClient = new Pusher(pusher_key, {
      wsHost: pusher_server_host,
      wsPort: pusher_server_port,
      enabledTransports: pusher_server_tls ? ["ws", "wss"] : ["ws"],
      forceTLS: pusher_server_tls,
      disableStats: true,
      cluster: pusher_cluster,
      auth: {
        headers: { user_id: randomUserId },
        
      },
    });
  }

  const channel = pusherClient.subscribe(slug);

  const presenceChannel = pusherClient.subscribe(
    `presence-${slug}`
  ) as PresenceChannel;

  const store = vanillaCreate<PusherZustandStore>(() => ({
    pusherClient: pusherClient,
    channel: channel,
    presenceChannel,
    members: new Map(),
  }));

  const updateMembers = () => {
    store.setState(() => ({
      members: new Map(Object.entries(presenceChannel.members.members)),
    }));
  };

  presenceChannel.bind("pusher:subscription_succeeded", updateMembers);
  presenceChannel.bind("pusher:member_added", updateMembers);
  presenceChannel.bind("pusher:member_removed", updateMembers);

  return store;
};

const {
  Provider: PusherZustandStoreProvider,
  useStore: usePusherZustandStore,
} = createContext<StoreApi<PusherZustandStore>>();

export const PusherProvider: React.FC<
  React.PropsWithChildren<{ slug: string }>
> = ({ slug, children }) => {
  const [store, updateStore] = useState<ReturnType<typeof createPusherStore>>();

  useEffect(() => {
    const newStore = createPusherStore(slug);
    updateStore(newStore);
    return () => {
      const pusher = newStore.getState().pusherClient;
      console.log("disconnecting pusher and destroying store", pusher);
      console.log("(Expect a warning in terminal after this)");
      pusher.disconnect();
      newStore.destroy();
    };
  }, [slug]);

  if (!store) return null;

  return (
    <PusherZustandStoreProvider createStore={() => store}>
      {children}
    </PusherZustandStoreProvider>
  );
};

export function useSubscribeToEvent<MessageType>(
  eventName: string,
  callback: (data: MessageType) => void
) {
  const channel = usePusherZustandStore((state) => state.channel);

  const stableCallback = useRef(callback);

  useEffect(() => {
    stableCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const reference = (data: MessageType) => {
      stableCallback.current(data);
    };
    channel.bind(eventName, reference);
    return () => {
      channel.unbind(eventName, reference);
    };
  }, [channel, eventName]);
}
