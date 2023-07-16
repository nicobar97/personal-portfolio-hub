import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tabs, TabsEnum } from '../model/Tabs';

export type TabState = BaseTabState | ArticleTabState;
export type TabProps = BaseTabProps | ArticleTabProps;

export type BaseTabState = {
  currentTab: Omit<TabsEnum, typeof Tabs.ReadArticle>;
  tabProps: BaseTabProps;
  setTab: (currentTab: TabsEnum, tabProps: TabProps) => void;
};

export type ArticleTabState = Omit<BaseTabState, 'currentTab'> & {
  currentTab: typeof Tabs.ReadArticle;
  tabProps: ArticleTabProps;
};

export type ArticleTabProps = {
  articleId: string;
};

export type BaseTabProps = {};

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
        tabProps: {},
        setTab: (currentTab: TabsEnum, tabProps: TabProps) => set(() => ({ currentTab, tabProps })),
      }),
      {
        name: 'tab',
      },
    ),
  ),
);
