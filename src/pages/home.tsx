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

  const query = createQuery(() => ['streamers'], fetchData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { set }] = useStreamer();

  createEffect(() => {
    if (!query.isLoading) {
      const streamerList = query.data.map(streamer => streamer.id);

      const obj = {};

      for (const streamer of streamerList) {
        obj[`${streamer}`] = true;
        obj[`${streamer}_streamup`] = true;
        obj[`${streamer}_streamdown`] = true;
      }

      set(obj);
    }
  });

  return (
    <section>
      <CardGrid>
        {query.isLoading ? <For each={Array(12).fill(null)}>{() => <CardSkeleton />}</For> : <Card list={query.data} />}
      </CardGrid>
    </section>
  );
}
