import { Component, JSX, Show, createMemo } from 'solid-js';
import { useAppState, useAppDispatch } from 'hooks/useContext';

interface ICheckbox {
  name: string;
  detail: string;
  title: string;
}

const Checkbox: Component<ICheckbox> = props => {
  const { signal } = useAppState();
  const { modifyStreamer, modifyStatus } = useAppDispatch();

  const isStreamer = createMemo<boolean>(() => Object.keys(signal()).length > 1);

  const onChangeHandler: JSX.EventHandler<HTMLInputElement, Event> = evt => {
    modifyStreamer(props.name, props.detail, evt.currentTarget.checked);

    if (signal()['status'][props.name] && !signal()[props.name]['streamup'] && !signal()[props.name]['streamdown']) {
      modifyStatus(props.name, false);
    } else if (!signal()['status'][props.name] && (signal()[props.name]['streamup'] || signal()[props.name]['streamdown'])) {
      modifyStatus(props.name, true);
    }
  };

  return (
    <Show when={isStreamer()}>
      <div class="flex w-full items-center justify-center">
        <div class="flex h-6 items-center">
          <input
            id={`${props.name}_${props.detail}`}
            type="checkbox"
            checked={signal()[props.name][props.detail]}
            onChange={onChangeHandler}
            class="h-4 w-4 rounded border-0 border-gray-300 text-blue-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <Show when={props.title}>
          <label for={`${props.name}_${props.detail}`} class="ml-3 select-none font-medium leading-6 text-white">
            {props.title}
          </label>
        </Show>
      </div>
    </Show>
  );
};

export default Checkbox;
