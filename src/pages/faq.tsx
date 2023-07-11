import { Component, For, Switch, Match } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import toast from 'solid-toast';
import { FAQContainer, FAQContent } from 'components/FAQ';
import FAQSkeleton from 'components/Skeleton/FAQ';
import QueryError from 'errors/Query';
import request from 'utils/httpRequest';

const FAQ: Component = () => {
  const fetchData = async ({ queryKey }) => {
    try {
      const response = await request({
        method: 'GET',
        url: `/${queryKey[0]}`,
      });
      return response;
    } catch (e) {
      toast.error(`요청 처리 중 오류가 발생했습니다.\n${e.message}`);
      throw e;
    }
  };

  const query = createQuery(() => ['faq'], fetchData);

  return (
    <section class="-mt-2 h-full divide-y divide-white/10 sm:-mt-4">
      <h2 class="flex items-baseline gap-x-2 text-2xl/10 font-bold tracking-tight text-white">
        <span>FAQ</span>
        <small class="text-sm text-gray-400">자주 묻는 질문</small>
      </h2>

      <Switch>
        <Match when={query.isLoading}>
          <FAQContainer>
            <For each={Array(4).fill(null)}>{() => <FAQSkeleton />}</For>
          </FAQContainer>
        </Match>
        <Match when={query.isError}>
          <QueryError message={(query.error as Error).message} refetch={query.refetch} />
        </Match>
        <Match when={query.isSuccess}>
          <FAQContainer>
            <For each={query.data?.faq}>{faq => <FAQContent question={faq.question} answer={faq.answer} />}</For>
          </FAQContainer>
        </Match>
      </Switch>
    </section>
  );
};

export default FAQ;
