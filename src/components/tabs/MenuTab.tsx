import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';

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

export const MenuTab: React.FC = () => {
  const themeStyle = useThemeStore();

  return (
    <>
      <Content>
        <MobileFrame>
          <AnimatedBox themeStyle={themeStyle.style}>
            <h1>Menu Page</h1>
            <h3>This is the WIP Menu Tab</h3>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </>
  );
};
