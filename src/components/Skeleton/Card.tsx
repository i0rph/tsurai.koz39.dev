import { Component } from 'solid-js';

const CardSkeleton: Component = () => {
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
};

export default CardSkeleton;
