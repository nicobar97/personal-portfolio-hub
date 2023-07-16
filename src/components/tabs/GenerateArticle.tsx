import styled from 'styled-components';
import genArticleIcon from '../../assets/icons/ai-write.png';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';
import { BubbleButton } from '../BubbleButton';

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

const Input = styled.input``;

const Select = styled.select``;

const BubbleContainer = styled.div`
  margin: 1rem;
`;

const MainTitle = styled.h1`
  margin: 0rem;
`;

// const Title = styled.h2``;

const SubTitle = styled.h3``;

// const SubSubTitle = styled.h4``;

const Disclamer = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 0rem;
`;

export const GenerateArticle: React.FC = () => {
  const themeStyle = useThemeStore();

  return (
    <>
      <Content>
        <MobileFrame>
          <AnimatedBox themestyle={themeStyle.style}>
            <MainTitle>Generate an Article with AI</MainTitle>
            <SubTitle>Topic</SubTitle>
            <Input placeholder='topic of the article to generate, ex. bees impact on the enviroment'/>

            <SubTitle>Style</SubTitle>
            <Select>
              <option value="academic">Academic</option>
              <option value="business">Business</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="descriptive">Descriptive</option>
              <option value="emotional">Emotional</option>
              <option value="expository">Expository</option>
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="legal">Legal</option>
              <option value="medical">Medical</option>
              <option value="narrative">Narrative</option>
              <option value="persuasive">Persuasive</option>
              <option value="poetic">Poetic</option>
              <option value="technical">Technical</option>
            </Select>

            <SubTitle>Tone</SubTitle>
            <Select>
              <option value="angry">Angry</option>
              <option value="assertive">Assertive</option>
              <option value="confident">Confident</option>
              <option value="cooperative">Cooperative</option>
              <option value="curious">Curious</option>
              <option value="empathetic">Empathetic</option>
              <option value="encouraging">Encouraging</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="excited">Excited</option>
              <option value="friendly">Friendly</option>
              <option value="funny">Funny</option>
              <option value="joyful">Joyful</option>
              <option value="optimistic">Optimistic</option>
              <option value="professional">Professional</option>
              <option value="sad">Sad</option>
              <option value="serious">Serious</option>
              <option value="surprised">Surprised</option>
              <option value="worried">Worried</option>
            </Select>

            <SubTitle>Audience</SubTitle>
            <Select>
              <option value="5-year old">5-year old</option>
              <option value="10-year old">10-year old</option>
              <option value="teenager">Teenager</option>
              <option value="20-year old">20-year old</option>
              <option value="30-year old">30-year old</option>
              <option value="40-year old">40-year old</option>
              <option value="50-year old">50-year old</option>
              <option value="60-year old">60-year old</option>
              <option value="70-year old">70-year old</option>
              <option value="business audience">Business audience</option>
              <option value="expert audience">Expert audience</option>
              <option value="hostile audience">Hostile audience</option>
              <option value="neutral audience">Neutral audience</option>
              <option value="uninformed audience">Uninformed audience</option>
              <option value="my boss">My boss</option>
              <option value="my teacher">My teacher</option>
              <option value="my parent">My parent</option>
              <option value="my partner">My partner</option>
              <option value="my child">My child</option>
              <option value="my colleague">My colleague</option>
            </Select>

            <SubTitle>Length</SubTitle>
            <Select>
              <option value="1 paragraph">1 paragraph</option>
              <option value="2 paragraphs">2 paragraphs</option>
              <option value="3 paragraphs">3 paragraphs</option>
              <option value="20 words">20 words</option>
              <option value="50 words">50 words</option>
              <option value="100 words">100 words</option>
              <option value="200 words">200 words</option>
              <option value="500 words">500 words</option>
            </Select>

            <Disclamer>
              Please note that the content generated by AI on this website is for informational and
              entertainment purposes only. The AI-powered content may not always be 100% accurate
              and should not be solely relied upon for critical decisions. AI generation feature is
              limited to one generation per day to maintain content quality and integrity. For
              crucial matters, always consult reliable human sources.
            </Disclamer>
            <BubbleContainer>
              <BubbleButton
                onBubbleClick={() => console.log('todo')}
                rounded={true}
                scale={1.5}
                darkModeInvert={false}
                iconSrc={genArticleIcon}
                style={themeStyle.style}
                label="Generate"
              />
            </BubbleContainer>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </>
  );
};
