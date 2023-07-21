import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';
import { AnimateFade } from '../animations/Animations';

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

const SubTitle = styled.h3`
  margin: 0rem;
`;

const SubSubTitle = styled.h4`
  margin: 0rem;
`;

const BulletList = styled.ul`
  margin: 0rem;
`;

const BulletRow = styled.li`
  list-style-type: circle;
`;

export const CvTab: React.FC = () => {
  const themeStyle = useThemeStore();
  return (
    <>
      <AnimateFade>
        <Content>
          <MobileFrame>
            <AnimatedBox themestyle={themeStyle.style}>
              <MainTitle>Hello,</MainTitle>
              <Title>I'm Nicolò Bartelucci</Title>
              <SubSubTitle>Backend Software Engineer at ONYON</SubSubTitle>
              <Title>Presentation</Title>
              <p>
                Experienced software engineer specializing in backend engineering and full stack
                solutions. Proficient in agile development methodologies, I thrive in dynamic and
                collaborative environments, delivering high-quality software solutions within
                iterative and time-sensitive cycles. With a strong passion for computer engineering,
                I continuously seek opportunities to learn and grow, staying up-to-date with
                industry trends to drive innovation and deliver high-quality results. Always open to
                exciting opportunities in the field of software engineering.
              </p>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Information</Title>
              <BulletList>
                <BulletRow>
                  <strong>Name:</strong> Nicolò Bartelucci
                </BulletRow>
                <BulletRow>
                  <strong>Place of birth:</strong> Jesi, Italy
                </BulletRow>
                <BulletRow>
                  <strong>Gender:</strong> Male
                </BulletRow>
                <BulletRow>
                  <strong>Nationality:</strong> Italian
                </BulletRow>
                <BulletRow>
                  <strong>Marital status:</strong> Unmarried
                </BulletRow>
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
                <BulletRow>
                  <strong>LinkedIn:</strong>
                  <a href="https://www.linkedin.com/in/nicobar/">
                    <LinkText>@nicobar</LinkText>
                  </a>
                </BulletRow>
              </BulletList>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Speaking</Title>
              <BulletList>
                <BulletRow>Italian</BulletRow>
                <BulletRow>English</BulletRow>
                <BulletRow>Typescript</BulletRow>
              </BulletList>
            </AnimatedBox>{' '}
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Main Tech Stack</Title>
              <BulletList>
                <BulletRow>Typescript</BulletRow>
                <BulletRow>Node.js</BulletRow>
                <BulletRow>Javascript</BulletRow>
                <BulletRow>React</BulletRow>
              </BulletList>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Work Career - Current</Title>
              <div>
                <SubTitle>Backend Software Engineer at ONYON</SubTitle>
                <p>January 2023 - Present</p>
                <p>Milano, Lombardia, Italia · Ibrida</p>
              </div>
              <div>
                <SubSubTitle>Tech Stack:</SubSubTitle>
                <BulletList>
                  <BulletRow>TypeScript</BulletRow>
                  <BulletRow>Node.js</BulletRow>
                </BulletList>
              </div>
              <div>
                <SubTitle>Full Stack Engineer at Caffeine</SubTitle>
                <p>December 2020 - Present</p>
                <p>
                  During my university studies, I developed, worked, and launched Caffeine! Caffeine
                  is a Chrome Extension that speeds up and automates your favorite EU sites! Say
                  goodbye to slow loading times and manually refreshing pages, and say hello to
                  lightning-fast browsing and automated checkout experience.
                </p>
                <SubSubTitle>Tech Stack:</SubSubTitle>
                <BulletList>
                  <BulletRow>Node.js</BulletRow>
                  <BulletRow>Python</BulletRow>
                  <BulletRow>JavaScript</BulletRow>
                </BulletList>
              </div>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Work Career - Past</Title>
              <div>
                <SubTitle>Research Fellow at Alma Mater Studiorum - Università di Bologna</SubTitle>
                <p>June 2022 - December 2022 · 7 months</p>
                <p>
                  After my graduation, I decided to work as a fellow researcher under the DISI of
                  the University of Bologna.
                </p>
                <SubSubTitle>Tech Stack:</SubSubTitle>
                <BulletList>
                  <BulletRow>Firebase</BulletRow>
                  <BulletRow>DevOps</BulletRow>
                  <BulletRow>Kubernetes</BulletRow>
                  <BulletRow>Flutter</BulletRow>
                  <BulletRow>iOS</BulletRow>
                  <BulletRow>Android</BulletRow>
                </BulletList>
              </div>
              <div>
                <SubTitle>Visiting Research Fellow at Vienna University of Technology</SubTitle>
                <p>September 2021 - December 2021 · 4 months</p>
                <p>
                  I researched at the Distributed System Group at TUWien in Vienna for the
                  preparation of my master thesis.
                </p>
                <SubSubTitle>Tech Stack:</SubSubTitle>
                <BulletList>
                  <BulletRow>Kubernetes</BulletRow>
                </BulletList>
              </div>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Academic Career</Title>
              <div>
                <SubTitle>Master in Computer Engineering</SubTitle>
                <p>University of Bologna, Bologna</p>
                <p>Graduated with 110/110 with greetings</p>
                <p>
                  Thesis: High!Level Metrics for Service Level Objective!aware Autoscaling in
                  Polaris: a Performance Evaluation
                </p>
                <p>Sep 2020 - Mar 2022</p>
              </div>
              <div>
                <SubTitle>Bachelor in Computer Engineering</SubTitle>
                <p>University of Bologna, Bologna</p>
                <p>Graduated with 100/110.</p>
                <p>
                  Thesis: Support Systems for Industry 4.0: MQTT and Apache Kafka performance
                  evaluation
                </p>
                <p>Sep 2017 - Oct 2020</p>
              </div>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Interests</Title>
              <BulletList>
                <BulletRow>App & Software Development</BulletRow>
                <BulletRow>Computer Science & Engineering</BulletRow>
                <BulletRow>iOS & Android</BulletRow>
                <BulletRow>Internet of Things & Consumer Electronics</BulletRow>
                <BulletRow>Sportsman, Calisthenics, HandBalance, Swimmer</BulletRow>
                <BulletRow>Travelling and learning foreign cultures</BulletRow>
                <BulletRow>Fashion & Sneakers</BulletRow>
                <BulletRow>Healthy Lifestyle & Foods</BulletRow>
              </BulletList>
            </AnimatedBox>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>Characteristics</Title>
              <BulletList>
                <BulletRow>Gets on well with people of all ages.</BulletRow>
                <BulletRow>Open to new ideas and suggestions, flexible worker.</BulletRow>
                <BulletRow>Teamwork skills, shows commitment and/or reliability.</BulletRow>
                <BulletRow>
                  Excellent practical skills, technically minded, problem-solving skills.
                </BulletRow>
                <BulletRow>Good attendance record, punctual and reliable.</BulletRow>
                <BulletRow>
                  Able to meet deadlines, excellent planning skills, effective time management.
                </BulletRow>
                <BulletRow>Able to stay calm and work well under pressure.</BulletRow>
                <BulletRow>Use a creative approach to problem solve.</BulletRow>
              </BulletList>
            </AnimatedBox>{' '}
          </MobileFrame>
        </Content>
      </AnimateFade>
    </>
  );
};
