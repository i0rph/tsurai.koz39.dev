import { Component, JSX, Show, createMemo } from 'solid-js';
import { FaSolidXmark, FaSolidCheck } from 'solid-icons/fa';
import { twMerge } from 'tailwind-merge';
import { useAppState, useAppDispatch } from 'hooks/useContext';

interface IToggle {
  name: string;
  label?: string;
}

const Toggle: Component<IToggle> = props => {
  const { signal } = useAppState();
  const { modifyStreamer, modifyStatus } = useAppDispatch();

  const isStreamer = createMemo<boolean>(() => Object.keys(signal()).length > 1);

  const onChangeHandler: JSX.EventHandler<HTMLInputElement, Event> = evt => {
    const { checked } = evt.currentTarget;
    modifyStatus(props.name, checked);

    if (checked) {
      modifyStreamer(props.name, 'streamup', true);
      modifyStreamer(props.name, 'streamdown', true);
    } else {
      modifyStreamer(props.name, 'streamup', false);
      modifyStreamer(props.name, 'streamdown', false);
    }
  };

  return (
    <Show when={isStreamer()}>
      <label class="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" checked={signal()['status'][props.name]} class="peer sr-only" onChange={onChangeHandler} />
        <div class="peer h-6 w-11 rounded-full border-gray-600 bg-gray-700 peer-checked:bg-blue-600 peer-focus:outline-none" />
        <span class="absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white transition-all peer-checked:translate-x-full peer-checked:border-white">
          {signal()['status'][props.name] ? (
            <FaSolidCheck
              class={twMerge(
                signal()['status'][props.name] ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                'h-3 w-3 fill-blue-600 transition-opacity',
              )}
            />
          ) : (
            <FaSolidXmark
              class={twMerge(
                signal()['status'][props.name] ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                'h-3 w-3 fill-gray-500 transition-opacity',
              )}
            />
          )}
        </span>
        <Show when={props.label}>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
        </Show>
      </label>
    </Show>
  );
};

export default Toggle;
