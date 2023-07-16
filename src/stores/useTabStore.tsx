import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tabs, TabsEnum } from '../model/Tabs';


export type TabState = BaseTabState | ArticleTabState;

export type BaseTabState = {
  currentTab: TabsEnum;
  setTab: (tab: TabsEnum) => void;
};

export type ArticleTabState = Omit<BaseTabState, 'currentTab'> & {
  currentTab: 'read-article';
  props: ArticleTabProps;
};

export type ArticleTabProps = {
  articleId: string;
};

export type TabProps = {};

export type NavbarBubbleContent = {
  linkedTab: TabsEnum;
  iconSrc: string;
  onBubbleClick: () => void;
};

export const useTabStore = create<TabState>()(
  devtools(
    persist(
      (set) => ({
        currentTab: Tabs.Home,
        setTab: (tab: TabsEnum) => set(() => ({ currentTab: tab })),
      }),
      {
        name: 'tab',
      },
    ),
  ),
);
