import { ParentComponent } from 'solid-js';

const ContentLayout: ParentComponent = props => {
  return <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{props.children}</div>;
};

export default ContentLayout;
