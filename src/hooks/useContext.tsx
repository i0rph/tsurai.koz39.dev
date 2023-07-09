/* eslint-disable no-unused-vars */
import { createSignal, createContext, useContext, JSXElement, Accessor } from 'solid-js';

interface IStreamerProvider {
  children: JSXElement;
}
interface IStreamers {
  [key: string]: {
    [key: string]: boolean;
  };
}
interface IContext {
  signal: Accessor<IStreamers>;
}
interface IDispatch {
  set: (v: IStreamers) => void;
  modifyStreamer: (name: string, detail: string, v: boolean) => void;
  modifyStatus: (name: string, v: boolean) => void;
}

const initialState = {
  status: {},
};

// Contexts
const AppContextState = createContext<IContext>();
const AppContextDispatch = createContext<IDispatch>();
export const useAppState = () => useContext(AppContextState);
export const useAppDispatch = () => useContext(AppContextDispatch);

// Provider
export const AppProvider = (props: IStreamerProvider) => {
  const [signal, setSignal] = createSignal<IStreamers>(initialState);

  function set(v: IStreamers) {
    setSignal(v);
  }

  function modifyStreamer(name: string, detail: string, v: boolean) {
    setSignal(value => {
      const obj = { ...value };
      obj[name][detail] = v;

      return obj;
    });
  }

  function modifyStatus(name: string, v: boolean) {
    setSignal(value => {
      const obj = { ...value };
      obj['status'][name] = v;

      return obj;
    });
  }

  return (
    <AppContextState.Provider value={{ signal }}>
      <AppContextDispatch.Provider value={{ set, modifyStreamer, modifyStatus }}>{props.children}</AppContextDispatch.Provider>
    </AppContextState.Provider>
  );
};
