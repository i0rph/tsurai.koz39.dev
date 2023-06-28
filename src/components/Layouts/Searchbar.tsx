import { createSignal } from 'solid-js';
import toast from 'solid-toast';
import { HiOutlineBars3 } from 'solid-icons/hi';
import { FaBrandsDiscord } from 'solid-icons/fa';
import { useStreamer } from 'hooks/useContext';
import request from 'utils/httpRequest';

const regex = new RegExp('^https:\\/\\/discord\\.com\\/api\\/webhooks\\/[0-9]{17,20}\\/[A-Za-z0-9_\\-]{60,68}$');

export default function Searchbar(props) {
  const [streamers] = useStreamer();
  const [url, setUrl] = createSignal('');

  const openSidebar = () => {
    props.setSidebarOpen(true);
  };

  const setWebhook = async () => {
    if (streamers()) {
      if (regex.test(url())) {
        const response = await request(
          {
            method: 'PUT',
            url: '/webhooks',
            data: {
              url: url(),
              ...streamers(),
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
    if (streamers()) {
      if (regex.test(url())) {
        const response = await request(
          {
            method: 'DELETE',
            url: '/webhooks',
            data: {
              url: url(),
            },
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

  const onSubmit = evt => {
    evt.preventDefault();
    setWebhook();
  };

  return (
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
      <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" onClick={openSidebar}>
        <span class="sr-only">Open sidebar</span>
        <HiOutlineBars3 class="h-5 w-5" aria-hidden="true" />
      </button>

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
            <div class="flex flex-none items-center gap-x-2 sm:gap-x-4">
              <button type="submit" class="rounded-sm bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900">
                구독
              </button>
              <button
                type="button"
                class="rounded-sm bg-red-800 px-4 py-2 font-semibold text-white hover:bg-red-900"
                onClick={deleteWebhook}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
