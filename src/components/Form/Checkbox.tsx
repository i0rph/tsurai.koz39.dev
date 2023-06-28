import { Show } from 'solid-js';
import { useStreamer } from 'hooks/useContext';

export default function Checkbox(props) {
  const [streamer, { modify }] = useStreamer();

  const onChangeHandler = evt => {
    modify(props.name, evt.target.checked);

    let name = props.name.split('_');

    if (name.length > 2) {
      name = `${name[0]}_${name[1]}`;
    } else {
      name = name[0];
    }

    if (streamer()[name] && !streamer()[`${name}_streamup`] && !streamer()[`${name}_streamdown`]) {
      modify(name, false);
    } else if (!streamer()[name] && (streamer()[`${name}_streamup`] || streamer()[`${name}_streamdown`])) {
      modify(name, true);
    }
  };

  return (
    <Show when={streamer()}>
      <div class="flex w-full items-center justify-center">
        <div class="flex h-6 items-center">
          <input
            id={props.name}
            type="checkbox"
            checked={streamer()[props.name]}
            onChange={onChangeHandler}
            class="h-4 w-4 rounded border-0 border-gray-300 text-blue-600 focus:outline-none focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <Show when={props.title}>
          <label for={props.name} class="ml-3 select-none font-medium leading-6 text-white">
            {props.title}
          </label>
        </Show>
      </div>
    </Show>
  );
}
