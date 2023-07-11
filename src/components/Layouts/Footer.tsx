import { Component, For } from 'solid-js';
import { FaBrandsGithub, FaBrandsTwitter } from 'solid-icons/fa';
import { IconProps } from 'solid-icons';

const navigation = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/i0rph',
    icon: (props: IconProps) => <FaBrandsTwitter {...props} />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/iorphx/tsurai.koz39.dev',
    icon: (props: IconProps) => <FaBrandsGithub {...props} />,
  },
];

const Footer: Component = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div class="mx-auto p-6 md:flex md:items-center md:justify-between lg:p-12">
        <div class="flex justify-center space-x-6 md:order-2">
          <For each={navigation}>
            {item => (
              <a href={item.href} target="_blank" class="fill-gray-300 hover:fill-gray-100">
                <span class="sr-only text-gray-300 hover:text-gray-100">{item.name}</span>
                <item.icon class="h-6 w-6" aria-hidden="true" />
              </a>
            )}
          </For>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-xs leading-5 text-gray-300">&copy; {year} iorph & KOZ39 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
