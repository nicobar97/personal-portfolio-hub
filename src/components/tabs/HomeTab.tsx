import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-x: hidden;
  margin-top: 0.5rem;
  padding: 1.5rem;
`;

export const HomeTab: React.FC = () => {
  const themeStyle = useThemeStore();

  return (
    <Content>
      <MobileFrame>
        <AnimatedBox themeStyle={themeStyle.style}>
          <h1>Home Page</h1>
          <h3>This is the WIP Home Tab</h3>
        </AnimatedBox>
      </MobileFrame>
    </Content>
  );
};
