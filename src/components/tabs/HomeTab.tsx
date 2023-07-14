import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* position: fixed; */
  overflow-x: hidden;
  /* overflow-y: auto !important; */
  /* inset: 3rem 0px 3rem; */
  margin-top: 0.5rem;
  padding: 1.5rem;
`;

export const HomeTab: React.FC = () => (
  <Content>
    <MobileFrame>
      <h1>Home Page</h1>
      <div>This is the WIP Home Tab</div>
    </MobileFrame>
  </Content>
);
