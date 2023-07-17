import styled from 'styled-components';
import genArticleIcon from '../../assets/icons/ai-write.png';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';
import { BubbleButton } from '../BubbleButton';
import Select, { SingleValue } from 'react-select';
import { useState } from 'react';
import { ArticlePrompt } from '../../model/Article';
import { theme } from '../../style/style';
import { ThemeStyleEnum } from '../../model/Theme';
import { useMutation } from '@tanstack/react-query';
import { generateArticle } from '../../api/Article';

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

const Gap = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ theme: ThemeStyleEnum }>`
  font-size: 1.05rem;
  border-radius: 10px;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors(props.theme).border};
  box-shadow: ${(props) => props.theme.colors(props.theme).shadow} 0px 0px 3px 0px;
  text-transform: capitalize;

  &:hover {
    border-color: ${(props) => props.theme.colors(props.theme).border};
    box-shadow: ${(props) => props.theme.colors(props.theme).shadow} 0px 0px 5px 0px;
  }

  &:focus {
    border-color: ${(props) => props.theme.colors(props.theme).border};
    box-shadow: ${(props) => props.theme.colors(props.theme).shadow} 0px 0px 5px 0px;
    outline: none;
  }
`;
const BubbleContainer = styled.div`
  margin: 2rem;
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
  margin-top: 2rem;
  margin-bottom: 0rem;
`;

const handleTopicChange =
  (state: ArticlePrompt, setArticlePrompt: (prevState: ArticlePrompt) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setArticlePrompt({
      ...state,
      topic: value,
    });
  };

const handleStyleChange =
  (state: ArticlePrompt, setArticlePrompt: (prevState: ArticlePrompt) => void) =>
  (selectedOption: SingleValue<SelectOption>) => {
    setArticlePrompt({
      ...state,
      style: selectedOption!.value,
    });
  };

const handleToneChange =
  (state: ArticlePrompt, setArticlePrompt: (prevState: ArticlePrompt) => void) =>
  (selectedOption: SingleValue<SelectOption>) => {
    setArticlePrompt({
      ...state,
      tone: selectedOption!.value,
    });
  };

const handleAudienceChange =
  (state: ArticlePrompt, setArticlePrompt: (prevState: ArticlePrompt) => void) =>
  (selectedOption: SingleValue<SelectOption>) => {
    setArticlePrompt({
      ...state,
      audience: selectedOption!.value,
    });
  };

const handleLengthChange =
  (state: ArticlePrompt, setArticlePrompt: (prevState: ArticlePrompt) => void) =>
  (selectedOption: SingleValue<SelectOption>) => {
    setArticlePrompt({
      ...state,
      length: selectedOption!.value,
    });
  };

export const GenerateArticle: React.FC = () => {
  const themeStyle = useThemeStore();

  const [articlePrompt, setArticlePrompt] = useState<ArticlePrompt>({
    task: 'Write a blogpost, Give as output only the JSON Object',
    topic: '',
    style: '',
    tone: '',
    audience: '',
    length: '',
  });

  const mutation = useMutation(() => generateArticle(articlePrompt).run());
  const label = mutation.isIdle
    ? 'Generate Article'
    : mutation.isLoading
    ? 'Generating...'
    : mutation.isError
    ? 'Error'
    : mutation.isSuccess
    ? mutation.data.map(() => "Article Generation Success!").mapLeft((err) => `Error: ${err}`).extract()
    : 'IDK';

  return (
    <>
      <Content>
        <MobileFrame>
          <AnimatedBox themestyle={themeStyle.style}>
            <Gap>
              <MainTitle>Generate an Article with AI</MainTitle>
              <SubTitle>Topic</SubTitle>
              <Input
                placeholder="topic of the article to generate, ex. bees impact on the enviroment"
                value={articlePrompt.topic}
                onChange={handleTopicChange(articlePrompt, setArticlePrompt)}
              />
              <SubTitle>Style</SubTitle>
              <Select
                onChange={handleStyleChange(articlePrompt, setArticlePrompt)}
                options={styleOptions}
                theme={(t) => ({
                  ...t,
                  colors: {
                    ...t.colors,
                    text: theme.colors(themeStyle.style).text,
                    primary25: theme.colors(themeStyle.style).backdrop,
                    primary50: theme.colors(themeStyle.style).background,
                    primary: `${theme.colors(themeStyle.style).border}`,
                  },
                  borderRadius: 10,
                })}
              />
              <SubTitle>Tone</SubTitle>
              <Select
                onChange={handleToneChange(articlePrompt, setArticlePrompt)}
                options={toneOptions}
                theme={(t) => ({
                  ...t,
                  colors: {
                    ...t.colors,
                    text: theme.colors(themeStyle.style).text,
                    primary25: theme.colors(themeStyle.style).backdrop,
                    primary50: theme.colors(themeStyle.style).background,
                    primary: `${theme.colors(themeStyle.style).border}`,
                  },
                  borderRadius: 10,
                })}
              />
              <SubTitle>Audience</SubTitle>
              <Select
                onChange={handleAudienceChange(articlePrompt, setArticlePrompt)}
                options={audienceOptions}
                theme={(t) => ({
                  ...t,
                  colors: {
                    ...t.colors,
                    text: theme.colors(themeStyle.style).text,
                    primary25: theme.colors(themeStyle.style).backdrop,
                    primary50: theme.colors(themeStyle.style).background,
                    primary: `${theme.colors(themeStyle.style).border}`,
                  },
                  borderRadius: 10,
                })}
              />
              <SubTitle>Lenght</SubTitle>
              <Select
                onChange={handleLengthChange(articlePrompt, setArticlePrompt)}
                options={lengthOptions}
                theme={(t) => ({
                  ...t,
                  colors: {
                    ...t.colors,
                    text: theme.colors(themeStyle.style).text,
                    primary25: theme.colors(themeStyle.style).backdrop,
                    primary50: theme.colors(themeStyle.style).background,
                    primary: `${theme.colors(themeStyle.style).border}`,
                  },
                  borderRadius: 10,
                })}
              />
              <Disclamer>
                Please note that the content generated by AI on this website is for informational
                and entertainment purposes only. The AI-powered content may not always be 100%
                accurate and should not be solely relied upon for critical decisions. AI generation
                feature is limited to one generation per day to maintain content quality and
                integrity. For crucial matters, always consult reliable human sources.
              </Disclamer>
              <BubbleContainer>
                <BubbleButton
                  onBubbleClick={() => mutation.mutate()}
                  rounded={true}
                  scale={1.5}
                  darkModeInvert={false}
                  iconSrc={genArticleIcon}
                  style={themeStyle.style}
                  label={label}
                />
              </BubbleContainer>
            </Gap>
          </AnimatedBox>
        </MobileFrame>
      </Content>
    </>
  );
};

type SelectOption = {
  value: string;
  label: string;
};

const styleOptions: SelectOption[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'business', label: 'Business' },
  { value: 'casual', label: 'Casual' },
  { value: 'creative', label: 'Creative' },
  { value: 'descriptive', label: 'Descriptive' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'expository', label: 'Expository' },
  { value: 'formal', label: 'Formal' },
  { value: 'informal', label: 'Informal' },
  { value: 'legal', label: 'Legal' },
  { value: 'medical', label: 'Medical' },
  { value: 'narrative', label: 'Narrative' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'poetic', label: 'Poetic' },
  { value: 'technical', label: 'Technical' },
];

const toneOptions: SelectOption[] = [
  { value: 'angry', label: 'Angry' },
  { value: 'assertive', label: 'Assertive' },
  { value: 'confident', label: 'Confident' },
  { value: 'cooperative', label: 'Cooperative' },
  { value: 'curious', label: 'Curious' },
  { value: 'empathetic', label: 'Empathetic' },
  { value: 'encouraging', label: 'Encouraging' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'excited', label: 'Excited' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'funny', label: 'Funny' },
  { value: 'joyful', label: 'Joyful' },
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'professional', label: 'Professional' },
  { value: 'sad', label: 'Sad' },
  { value: 'serious', label: 'Serious' },
  { value: 'surprised', label: 'Surprised' },
  { value: 'worried', label: 'Worried' },
];

const audienceOptions: SelectOption[] = [
  { value: '5-year old', label: '5-year old' },
  { value: '10-year old', label: '10-year old' },
  { value: 'teenager', label: 'Teenager' },
  { value: '20-year old', label: '20-year old' },
  { value: '30-year old', label: '30-year old' },
  { value: '40-year old', label: '40-year old' },
  { value: '50-year old', label: '50-year old' },
  { value: '60-year old', label: '60-year old' },
  { value: '70-year old', label: '70-year old' },
  { value: 'business audience', label: 'Business audience' },
  { value: 'expert audience', label: 'Expert audience' },
  { value: 'hostile audience', label: 'Hostile audience' },
  { value: 'neutral audience', label: 'Neutral audience' },
  { value: 'uninformed audience', label: 'Uninformed audience' },
  { value: 'my boss', label: 'My boss' },
  { value: 'my teacher', label: 'My teacher' },
  { value: 'my parent', label: 'My parent' },
  { value: 'my partner', label: 'My partner' },
  { value: 'my child', label: 'My child' },
  { value: 'my colleague', label: 'My colleague' },
];

const lengthOptions: SelectOption[] = [
  { value: '1 paragraphs', label: '3 paragraphs' },
  { value: '2 paragraphs', label: '3 paragraphs' },
  { value: '3 paragraphs', label: '3 paragraphs' },
  { value: '4 paragraphs', label: '3 paragraphs' },
  { value: '5 paragraphs', label: '3 paragraphs' },
  { value: '10 paragraphs', label: '3 paragraphs' },
  { value: '20 paragraphs', label: '3 paragraphs' },
];
