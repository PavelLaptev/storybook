import { expect, within, userEvent } from '@storybook/test';
import { useRouter as useRouterMock } from '@storybook/nextjs/router';
import { useRouter } from 'next/router';
import React from 'react';

function Component() {
  const router = useRouter();
  const searchParams = router.query;

  const routerActions = [
    {
      cb: () => router.back(),
      name: 'Go back',
    },
    {
      cb: () => router.forward(),
      name: 'Go forward',
    },
    {
      cb: () => router.prefetch('/prefetched-html'),
      name: 'Prefetch',
    },
    {
      cb: () => router.push('/push-html', { forceOptimisticNavigation: true }),
      name: 'Push HTML',
    },
    {
      cb: () => router.replace('/replaced-html', { forceOptimisticNavigation: true }),
      name: 'Replace',
    },
  ];

  return (
    <div>
      <div>pathname: {router.pathname}</div>
      <div>
        searchparams:{' '}
        <ul>
          {Object.entries(searchParams).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
      {routerActions.map(({ cb, name }) => (
        <div key={name} style={{ marginBottom: '1em' }}>
          <button type="button" onClick={cb}>
            {name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default {
  component: Component,
  parameters: {
    nextjs: {
      router: {
        pathname: '/hello',
        query: {
          foo: 'bar',
        },
        prefetch: () => {
          console.log('custom prefetch');
        },
      },
    },
  },
};

export const Default = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Asserts whether forward hook is called', async () => {
      const forwardBtn = await canvas.findByText('Go forward');
      await userEvent.click(forwardBtn);
      await expect(useRouterMock().forward).toHaveBeenCalled();
    });

    await step('Asserts whether custom prefetch hook is called', async () => {
      const prefetchBtn = await canvas.findByText('Prefetch');
      await userEvent.click(prefetchBtn);
      await expect(useRouterMock().prefetch).toHaveBeenCalledWith('/prefetched-html');
    });
  },
};
