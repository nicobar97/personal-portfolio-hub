import styled from 'styled-components';
import articleIcon from '../../assets/icons/article.png';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';
import { Tabs, TabsEnum } from '../../model/Tabs';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  gap: 0rem;
  right: 0;
  margin: 0 auto;
  overflow-x: hidden;
  margin-top: 0.5rem;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const Icon = styled.img`
  width: 3rem;
  padding: 0.5rem;
  transform: rotate(30deg) scale(1.5);
  opacity: 0.2;
`;

const AppTitle = styled.h1`
  margin: 0rem;
  color: black;
  opacity: 0.2;
  padding: 0.8rem;
  font-size: 1.6rem;
  position: relative;
  margin-left: 2rem;
`;

const MainTitle = styled.h1`
  margin: 0rem;
`;

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AppButton = styled.button<{ background: string }>`
  display: inline-flex;
  height: 8rem;
  width: 8rem;
  margin: 0.5rem;
  border-radius: 15px;
  border: none;
  background-color: ${(props) => props.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

export const MenuTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();

  return (
    <>
      <Content>
        <MobileFrame>
          <AnimatedBox themestyle={themeStyle.style}>
            <MainTitle>Menu</MainTitle>
            <AppContainer>
              <AppButton background="indianred" onClick={() => props.changeTab(Tabs.Articles)}>
                <AppTitle>Articles</AppTitle>
                <Icon src={articleIcon} />
              </AppButton>
              <AppButton background="lightyellow" onClick={() => props.changeTab(Tabs.Mangas)}>
                <AppTitle>Mangas</AppTitle>
                <Icon src={articleIcon} />
              </AppButton>
              <AppButton
                background="lightgreen"
                onClick={() => props.changeTab(Tabs.Articles)}
              ></AppButton>
              <AppButton
                background="lightblue"
                onClick={() => props.changeTab(Tabs.Articles)}
              ></AppButton>
            </AppContainer>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </>
  );
};
