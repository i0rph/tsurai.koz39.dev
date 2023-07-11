import { Component, Show } from 'solid-js';
import { QueryObserverBaseResult } from '@tanstack/solid-query';

interface IQueryError {
  message: string;
  refetch: QueryObserverBaseResult['refetch'];
}

const QueryError: Component<IQueryError> = props => {
  return (
    <div class="mt-4 grid min-h-full place-items-center text-white">
      <div class="text-center">
        <h1 class="text-3xl font-bold sm:text-4xl">오류가 발생했습니다.</h1>
        <Show when={props.message}>
          <h5 class="mt-1 text-sm text-gray-400">{props.message}</h5>
        </Show>
        <h3 class="mt-2 text-base/7">잠시 후 다시 시도해주세요.</h3>
        <button type="button" class="mt-2 rounded-sm bg-blue-900 px-4 py-2 font-medium sm:mt-4" onClick={() => props.refetch()}>
          재시도
        </button>
      </div>
    </div>
  );
};

export default QueryError;
