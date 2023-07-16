import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
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

export const HomeTab: React.FC = () => {
  const themeStyle = useThemeStore();

  return (
    <>
      <Content>
        <MobileFrame>
          <AnimatedBox themestyle={themeStyle.style}>
            <h1>Home Page</h1>
            <h3>This is the WIP Home Page</h3>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </>
  );
};
