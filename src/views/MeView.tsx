import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { AnimateFade } from '../components/animations/Animations';

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
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const LinkText = styled.span`
  margin-left: 0.5rem;
`;

const MainTitle = styled.h1`
  margin: 0rem;
`;

const Title = styled.h2`
  margin: 0rem;
`;

const BulletList = styled.ul`
  margin: 0rem;
`;

const BulletRow = styled.li`
  list-style-type: circle;
`;

export const MeView: React.FC = () => (
  <>
    <AnimateFade>
      <Content>
        <MobileFrame>
          <AnimatedBox>
            <MainTitle>Hello,</MainTitle>
            <Title>I'm Nicolò Bartelucci</Title>{' '}
            <div>
              I am a <strong>Software Engineer</strong>{' '}
              specializing in <strong>Back-end development</strong>, holding a Master's degree in
              Computer Engineering.
              <br></br>
              While I have a strong passion for <strong>technical aspects</strong>, I am equally
              committed to enhancing{' '}
              <strong>user experiences</strong> and <strong>product design</strong>.<br></br>I
              currently reside in the beautiful city of Bologna, Italy.
            </div>
            <BulletList>
              <BulletRow>
                <strong>Email:</strong>
                <a href="mailto:nicobar97@gmail.com">
                  <LinkText>nicobar97@gmail.com</LinkText>
                </a>
              </BulletRow>
              <BulletRow>
                <strong>GitHub:</strong>
                <a href="https://www.github.com/nicobar97">
                  <LinkText>@nicobar97</LinkText>
                </a>
              </BulletRow>
            </BulletList>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </AnimateFade>
  </>
);
