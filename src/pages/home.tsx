import { For, createEffect } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import { CardGrid, Card, CardSkeleton } from 'components/Cards';
import { useStreamer } from 'hooks/useContext';
import request from 'utils/httpRequest';

export default function Home() {
  const fetchData = async q => {
    const response = await request({
      method: 'GET',
      url: `/${q.queryKey[0]}`,
    });

    return response;
  };

  const queryStreamer = createQuery(() => ['streamers'], fetchData);
  const queryCount = createQuery(() => ['webhooks/count'], fetchData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { set }] = useStreamer();

  createEffect(() => {
    if (!queryStreamer.isLoading) {
      const streamerList = queryStreamer.data.map(streamer => streamer.id);

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
    <section>
      {queryCount.isLoading ? null : (
        <div class="mb-4 text-center text-gray-300 sm:-mt-4 sm:text-left">{queryCount.data}개의 웹후크가 구독 중</div>
      )}
      <CardGrid>
        {queryStreamer.isLoading ? (
          <For each={Array(12).fill(null)}>{() => <CardSkeleton />}</For>
        ) : (
          <Card list={queryStreamer.data} />
        )}
      </CardGrid>
    </section>
  );
}
