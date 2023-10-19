import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { AnimateFade } from '../components/animations/Animations';

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

const MainTitle = styled.h1`
  margin: 0rem;
`;

const BulletList = styled.ul`
  margin: 0rem;
`;

const BulletRow = styled.li`
  list-style-type: circle;
`;

export const InfoView: React.FC = () => (
  <>
    <AnimateFade>
      <Content>
        <MobileFrame>
          <AnimatedBox>
            <MainTitle>Tech Stack</MainTitle>
            <BulletList>
              <BulletRow>
                <strong>Fastify:</strong> A fast and efficient web framework for Node.js.
              </BulletRow>
              <BulletRow>
                <strong>Mongoose:</strong> An elegant MongoDB object modeling tool.
              </BulletRow>
              <BulletRow>
                <strong>OpenAI:</strong> A library for interacting with the OpenAI GPT-3 API.
              </BulletRow>
              <BulletRow>
                <strong>Purify-ts:</strong> A functional programming library for TypeScript.
              </BulletRow>
            </BulletList>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </AnimateFade>
  </>
);
