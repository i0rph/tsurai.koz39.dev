import { For, Switch, createEffect, Match, Show, Component } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import toast from 'solid-toast';
import { CardGrid, Card } from 'components/Cards';
import CardSkeleton from 'components/Skeleton/Card';
import QueryError from 'errors/Query';
import { useAppDispatch } from 'hooks/useContext';
import request from 'utils/httpRequest';

const Home: Component = () => {
  const fetchData = async ({ queryKey }) => {
    try {
      const response = await request({
        method: 'GET',
        url: `/${queryKey[0]}`,
      });
      return response;
    } catch (e) {
      if (queryKey[0] === 'streamers') {
        toast.error(`요청 처리 중 오류가 발생했습니다.\n${e.message}`);
      }
      throw e;
    }
  };

  const queryStreamer = createQuery(() => ['streamers'], fetchData);
  const queryCount = createQuery(() => ['webhooks/count'], fetchData);

  const { set } = useAppDispatch();

  createEffect(() => {
    if (!queryStreamer.isLoading) {
      const streamerList = queryStreamer.data.map((streamer: { id: string }) => streamer.id);

      const obj = { status: {} };

      for (const streamer of streamerList) {
        obj[streamer] = {
          streamup: true,
          streamdown: true,
        };
        obj['status'][streamer] = true;
      }

      set(obj);
    }
  });

  return (
    <section class="h-full">
      <Show when={queryCount.isSuccess}>
        <div class="mb-4 text-center text-gray-300 sm:-mt-4 sm:text-left">{queryCount.data}개의 웹후크가 구독 중</div>
      </Show>

      <Switch>
        <Match when={queryStreamer.isLoading}>
          <CardGrid>
            <For each={Array(12).fill(null)}>{() => <CardSkeleton />}</For>
          </CardGrid>
        </Match>
        <Match when={queryStreamer.isError}>
          <QueryError message={(queryStreamer.error as Error).message} refetch={queryStreamer.refetch} />
        </Match>
        <Match when={queryStreamer.isSuccess}>
          <CardGrid>
            <Card list={queryStreamer.data} />
          </CardGrid>
        </Match>
      </Switch>
    </section>
  );
};

export default Home;
