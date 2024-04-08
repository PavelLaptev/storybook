import type { Globals } from '@storybook/csf';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { RouteParams } from '../types';
import { createRouter } from './index';

type PageRouterProviderProps = {
  routeParams: RouteParams;
  globals: Globals;
};

export const PageRouterProvider: React.FC<PropsWithChildren<PageRouterProviderProps>> = ({
  children,
  routeParams,
  globals,
}) => (
  <RouterContext.Provider
    value={{
      locale: globals?.locale,
      route: '/',
      asPath: '/',
      basePath: '/',
      isFallback: false,
      isLocaleDomain: false,
      isReady: true,
      isPreview: false,
      ...routeParams,
      ...createRouter({ overrides: routeParams }),
    }}
  >
    {children}
  </RouterContext.Provider>
);
