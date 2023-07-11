import { Component, createEffect, createSignal } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';

import { routes } from './routes';

import Sidebar, { SidebarMobile } from 'components/Layouts/Sidebar';
import Searchbar from 'components/Layouts/Searchbar';
import Footer from 'components/Layouts/Footer';
import Banner from 'components/Banner';
import request from 'utils/httpRequest';

const App: Component = () => {
  const Route = useRoutes(routes);

  const [sidebarOpen, setSidebarOpen] = createSignal<boolean>(false);
  const [bannerOpen, setBannerOpen] = createSignal<boolean>(false);
  const [notice, setNotice] = createSignal<string>('');

  const fetchData = async q => {
    const response = await request({
      method: 'GET',
      url: `/${q.queryKey[0]}`,
    });

    return response;
  };

  const query = createQuery(() => ['notice'], fetchData);

  createEffect(() => {
    if (!query.isLoading && query.data?.content) {
      setNotice(query.data?.content);
      setBannerOpen(true);
    }
  });

  return (
    <>
      <SidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar />

      <section class="flex h-full flex-col xl:pl-72">
        <Searchbar setSidebarOpen={setSidebarOpen} />
        <Banner content={notice()} bannerOpen={bannerOpen} setBannerOpen={setBannerOpen} />
        <main class="flex-auto p-4 sm:p-8">
          <Route />
        </main>

        <Footer />
      </section>
    </>
  );
};

export default App;
