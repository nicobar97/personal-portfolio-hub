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
  /* overflow-y: auto; */
  /* inset: 3rem 0px 3rem; */
  margin-top: 0.5rem;
  padding: 1.5rem;
`;

export const InfoTab: React.FC = () => (
  <>
    <Content>
      <MobileFrame>
        <h1>Info Page</h1>

        <div>This is the WIP Info Tab</div>
      </MobileFrame>
    </Content>
  </>
);
