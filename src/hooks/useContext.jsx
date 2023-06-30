import { createSignal, createContext, useContext } from 'solid-js';

const StreamerContext = createContext();

export function StreamerProvider(props) {
  const [streamers, setStreamers] = createSignal(),
    streamer = [
      streamers,
      {
        set(v) {
          setStreamers(v);
        },
        modifyStreamer(name, detail, v) {
          setStreamers(value => {
            const obj = { ...value };
            obj[name][detail] = v;

            return obj;
          });
        },
        modifyStatus(name, v) {
          setStreamers(value => {
            const obj = { ...value };
            obj['status'][name] = v;

            return obj;
          });
        },
      },
    ];

  return <StreamerContext.Provider value={streamer}>{props.children}</StreamerContext.Provider>;
}

export function useStreamer() {
  return useContext(StreamerContext);
}
