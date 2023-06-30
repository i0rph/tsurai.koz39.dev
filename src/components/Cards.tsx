import { For } from 'solid-js';
// import { Disclosure, DisclosureButton, DisclosurePanel } from 'solid-headless';
import Toggle from 'components/Form/Toggle';
import Checkbox from 'components/Form/Checkbox';

export function CardGrid(props) {
  return (
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {props.children}
    </ul>
  );
}

export function Card(props) {
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
          {/* <Disclosure defaultOpen={false} as="div" class="relative">
            <DisclosureButton as="button" class="h-12 w-full text-center text-white">
              설정
            </DisclosureButton>
            <DisclosurePanel class="absolute top-14 z-10 grid w-full grid-cols-2 rounded-lg bg-gray-800 p-6 text-gray-500 shadow">
              <Checkbox title="스트리밍 시작" name={`${item.id}_streamup`} />
              <Checkbox title="스트리밍 종료" name={`${item.id}_streamdown`} />
            </DisclosurePanel>
          </Disclosure> */}
        </li>
      )}
    </For>
  );
}

export function CardSkeleton() {
  return (
    <li class="col-span-1 divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
      <div class="flex w-full animate-pulse items-center justify-between space-x-6 p-6">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-slate-700" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-48 rounded-sm bg-slate-700" />
          <div class="h-4 w-20 rounded-sm bg-slate-700" />
        </div>
        <div class="h-4 w-10 rounded-sm bg-slate-700" />
      </div>
      <div class="flex h-12 w-full animate-pulse items-center justify-center text-white">
        <div class="h-4 w-12 rounded-sm bg-slate-700" />
      </div>
    </li>
  );
}
