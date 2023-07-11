import { Setter, createMemo, createSignal, Show, Component, JSX } from 'solid-js';
import { useLocation } from '@solidjs/router';
import toast from 'solid-toast';
import { twMerge } from 'tailwind-merge';
import { HiOutlineBars3 } from 'solid-icons/hi';
import { FaBrandsDiscord } from 'solid-icons/fa';
import { useAppState } from 'hooks/useContext';
import request from 'utils/httpRequest';

const regex = new RegExp('^https:\\/\\/discord\\.com\\/api\\/webhooks\\/[0-9]{17,20}\\/[A-Za-z0-9_\\-]{60,68}$');

interface ISearchbar {
  setSidebarOpen: Setter<boolean>;
}

const Searchbar: Component<ISearchbar> = props => {
  const location = useLocation();
  const { signal } = useAppState();
  const [url, setUrl] = createSignal<string>('');

  const openSidebar = () => {
    props.setSidebarOpen(true);
  };

  const isStreamer = createMemo<boolean>(() => Object.keys(signal()).length > 1);

  const setWebhook = async () => {
    if (isStreamer()) {
      if (regex.test(url())) {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { status, ...others } = signal();
        const response = await request(
          {
            method: 'PUT',
            url: '/webhooks',
            data: {
              url: url(),
              streamers: others,
            },
          },
          { api: false },
        );

        if (response.status === 200) {
          toast.success('구독을 시작합니다.');
        } else {
          toast.error('오류가 발생했습니다.');
        }
      } else {
        toast.error('올바른 형식의 디스코드 웹후크 URL을 입력해주세요.');
      }
    } else {
      toast.loading('데이터를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const deleteWebhook = async () => {
    if (isStreamer()) {
      if (regex.test(url())) {
        const response = await request(
          {
            method: 'DELETE',
            url: `/webhooks?url=${encodeURIComponent(url())}`,
          },
          { api: false },
        );

        if (response.status === 204) {
          toast.success('구독을 취소합니다.');
        } else {
          toast.error('오류가 발생했습니다.');
        }
      } else {
        toast.error('올바른 형식의 디스코드 웹후크 URL을 입력해주세요.');
      }
    } else {
      toast.loading('데이터를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const onSubmit: JSX.EventHandler<HTMLFormElement, Event> = evt => {
    evt.preventDefault();
    setWebhook();
  };

  return (
    <div
      class={twMerge(
        'sticky top-0 z-40 flex h-14 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 pl-4 pr-2.5 shadow-sm sm:h-16 sm:px-6 lg:px-8',
        location.pathname !== '/' && 'sm:hidden',
      )}
    >
      <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" onClick={openSidebar}>
        <span class="sr-only">Open sidebar</span>
        <HiOutlineBars3 class="h-5 w-5" aria-hidden="true" />
      </button>

      <Show when={location.pathname === '/'}>
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="flex flex-1" onSubmit={onSubmit}>
            <label for="search-field" class="sr-only">
              Search
            </label>
            <div class="flex w-full items-center">
              <FaBrandsDiscord class="pointer-events-none h-full w-5 flex-none fill-gray-500" aria-hidden="true" />
              <input
                type="text"
                class="block h-full w-full flex-auto border-0 bg-transparent text-sm text-white focus:ring-0"
                placeholder="디스코드 웹후크 URL"
                onChange={e => setUrl(e.target.value)}
              />
              <div class="flex flex-none items-center gap-x-2">
                <button type="submit" class="rounded-sm bg-blue-900 px-4 py-1.5 font-semibold text-white hover:bg-blue-800 sm:py-2">
                  구독
                </button>
                <button type="button" class="rounded-sm bg-white/10 px-4 py-1.5 font-semibold text-white hover:bg-white/20 sm:py-2" onClick={deleteWebhook}>
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </Show>
    </div>
  );
};

export default Searchbar;
