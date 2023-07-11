import { Component, For, ParentComponent } from 'solid-js';
import Toggle from 'components/Form/Toggle';
import Checkbox from 'components/Form/Checkbox';

interface ICardList {
  twitch_url: string;
  avatar_url: string;
  name: string;
  id: string;
}
interface ICard {
  list: [ICardList];
}

export const CardGrid: ParentComponent = props => {
  return (
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {props.children}
    </ul>
  );
};

export const Card: Component<ICard> = props => {
  return (
    <For each={props.list}>
      {item => (
        <li class="col-span-1 divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
          <div class="flex w-full items-center justify-between space-x-4 p-6">
            <a href={item.twitch_url} target="_blank">
              <img class="h-10 w-10 flex-shrink-0 rounded-full" src={item.avatar_url} alt="" />
            </a>
            <a href={item.twitch_url} target="_blank" class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-xl font-medium text-white">{item.name}</h3>
              </div>
            </a>
            <Toggle name={item.id} />
          </div>
          <div class="grid w-full grid-cols-2 py-4">
            <Checkbox title="스트리밍 시작" name={item.id} detail="streamup" />
            <Checkbox title="스트리밍 종료" name={item.id} detail="streamdown" />
          </div>
        </li>
      )}
    </For>
  );
};
