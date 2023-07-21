import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { useThemeStore } from '../../stores/useThemeStore';
import { AnimatedBox } from '../animations/AnimatedBox';
import { AnimateFade } from '../animations/Animations';

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

const Paragraph = styled.p`
  margin: 0rem;
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

const BulletList = styled.ul`
  margin: 0rem;
`;

const BulletRow = styled.li`
  list-style-type: circle;
`;

export const ProjectInfoTab: React.FC = () => {
  const themeStyle = useThemeStore();

  return (
    <>
      <AnimateFade>
        <Content>
          <MobileFrame>
            <AnimatedBox themestyle={themeStyle.style}>
              <MainTitle>Project Summary</MainTitle>
              <Title>Description</Title>
              <Paragraph>
                This project consists of two main components, a frontend built with React and
                TypeScript hosted on Vercel, and a backend built with Node.js and TypeScript hosted
                on Heroku. The frontend and backend communicate with each other through a REST API.
              </Paragraph>
              <SubTitle>Backend</SubTitle>
              <Paragraph>
                The backend component serves as the server-side code for the portfolio application.
                It handles data storage, retrieval, and business logic. Here are some of the main
                modules utilized in the backend:
              </Paragraph>
              <BulletList>
                <BulletRow>
                  <strong>Fastify:</strong> A fast and efficient web framework for Node.js.
                </BulletRow>
                <BulletRow>
                  <strong>Awilix:</strong> A dependency injection container for Node.js
                  applications.
                </BulletRow>
                <BulletRow>
                  <strong>Axios:</strong> A popular HTTP client for making API requests.
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
              <Paragraph>
                To set up the backend, make sure you have Node.js installed, preferably version
                19.4.0. Install the required dependencies using the command:
              </Paragraph>
              <pre>
                <code>yarn install</code>
              </pre>
              <SubTitle>Frontend</SubTitle>
              <Paragraph>
                The frontend is built with React, TypeScript, and Vite, providing a smooth
                development experience. Some key modules used in the frontend are:
              </Paragraph>
              <BulletList>
                <BulletRow>
                  <strong>React-Query:</strong> A library for managing and caching server state in
                  React applications.
                </BulletRow>
                <BulletRow>
                  <strong>Framer Motion:</strong> A library for adding smooth animations to React
                  components.
                </BulletRow>
                <BulletRow>
                  <strong>Styled-Components:</strong> A popular CSS-in-JS library for styling React
                  components.
                </BulletRow>
                <BulletRow>
                  <strong>React-Router-Dom:</strong> A routing library for handling navigation in
                  the React app.
                </BulletRow>
              </BulletList>
              <Paragraph>
                To run the frontend, clone the repository and install the dependencies with:
              </Paragraph>
              <pre>
                <code>yarn install</code>
              </pre>
              <Paragraph>
                After successful installation, start the development server with:
              </Paragraph>
              <pre>
                <code>yarn dev</code>
              </pre>
              <Title>Project Structure</Title>
              <Paragraph>The project consists of the following pages:</Paragraph>
              <ol>
                <BulletRow>
                  <strong>Info Page:</strong> Contains information about the project owner (you).
                </BulletRow>
                <BulletRow>
                  <strong>Home Page:</strong> Displays dynamically generated text using AI from the
                  backend.
                </BulletRow>
                <BulletRow>
                  <strong>Article Generate Page:</strong> Allows users to generate articles with AI
                  assistance.
                </BulletRow>
                <BulletRow>
                  <strong>Article Page:</strong> Displays articles that have been generated by the
                  AI.
                </BulletRow>
              </ol>
              <Title>Getting Started</Title>
              <Paragraph>To get started with the project, follow these steps:</Paragraph>
              <ol>
                <BulletRow>Clone the repository for both the frontend and the backend.</BulletRow>
                <BulletRow>
                  Install the required dependencies for each component using{' '}
                  <code>yarn install</code>.
                </BulletRow>
                <BulletRow>
                  Run the backend server using <code>yarn start</code> or <code>yarn dev</code>.
                </BulletRow>
                <BulletRow>
                  Start the frontend development server using <code>yarn dev</code>.
                </BulletRow>
                <BulletRow>
                  Access the application on your local machine at the specified address.
                </BulletRow>
              </ol>
              <Paragraph>
                Enjoy exploring the project and its AI-powered content generation capabilities!
              </Paragraph>
              <Paragraph>
                <strong>Note:</strong> For the best development experience, make sure to have ESLint
                and Prettier extensions installed in your code editor, and enable formatOnSave for
                automatic code formatting.
              </Paragraph>
            </AnimatedBox>
          </MobileFrame>
        </Content>
      </AnimateFade>
    </>
  );
};
