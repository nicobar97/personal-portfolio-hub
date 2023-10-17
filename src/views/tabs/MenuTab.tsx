import styled from 'styled-components';
import articleIcon from '../../assets/icons/article.png';
import mangaIcon from '../../assets/icons/manga.png';
import { MobileFrame } from '../../components/MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../../components/AnimatedBox';
import { Tabs, TabsEnum } from '../../model/Tabs';
import { AnimateFade } from '../../components/animations/Animations';
import { ThemeStyleEnum } from '../../model/Theme';

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

const AppButton = styled.button<{ background: string; themeStyle: ThemeStyleEnum }>`
  display: inline-flex;
  width: 20%;
  min-width: 8rem;
  min-height: 8rem;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

export const MenuTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();

  return (
    <>
      <AnimateFade>
        <Content>
          <MobileFrame>
            <AnimatedBox>
              <MainTitle>Menu</MainTitle>
              <AppContainer>
                <AppButton
                  themeStyle={themeStyle.style}
                  background="indianred"
                  onClick={() => props.changeTab(Tabs.Articles)}
                >
                  <AppTitle>Articles</AppTitle>
                  <Icon src={articleIcon} />
                </AppButton>
                <AppButton
                  themeStyle={themeStyle.style}
                  background="lightyellow"
                  onClick={() => props.changeTab(Tabs.Mangas)}
                >
                  <AppTitle>Mangas</AppTitle>
                  <Icon src={mangaIcon} />
                </AppButton>
                <AppButton
                  themeStyle={themeStyle.style}
                  background="lightblue"
                  onClick={() => props.changeTab(Tabs.Cards)}
                >
                  <AppTitle>OPCards</AppTitle>
                  <Icon src={mangaIcon} />
                </AppButton>
                {/* <AppButton
                  themeStyle={themeStyle.style}
                  background="lightblue"
                  onClick={() => props.changeTab(Tabs.Articles)}
                ></AppButton> */}
              </AppContainer>
            </AnimatedBox>
          </MobileFrame>
        </Content>
      </AnimateFade>
    </>
  );
};
