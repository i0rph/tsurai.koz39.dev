import { Show } from 'solid-js';
import { useStreamer } from 'hooks/useContext';

export default function Checkbox(props) {
  const [streamer, { modifyStreamer, modifyStatus }] = useStreamer();

  const onChangeHandler = evt => {
    modifyStreamer(props.name, props.detail, evt.target.checked);

    if (
      streamer()['status'][props.name] &&
      !streamer()[props.name]['streamup'] &&
      !streamer()[props.name]['streamdown']
    ) {
      modifyStatus(props.name, false);
    } else if (
      !streamer()['status'][props.name] &&
      (streamer()[props.name]['streamup'] || streamer()[props.name]['streamdown'])
    ) {
      modifyStatus(props.name, true);
    }
  };

  return (
    <Show when={streamer()}>
      <div class="flex w-full items-center justify-center">
        <div class="flex h-6 items-center">
          <input
            id={`${props.name}_${props.detail}`}
            type="checkbox"
            checked={streamer()[props.name][props.detail]}
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
}
