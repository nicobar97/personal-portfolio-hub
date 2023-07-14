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

const LinkText = styled.span`
  margin-left: .5rem;
`;

export const InfoTab: React.FC = () => (
  <>
    <Content>
      <MobileFrame>
        <div>
          <h1>Hello,</h1>
          <h2>I'm Nicolò Bartelucci</h2>
          <h4>Backend Software Engineer at ONYON</h4>
          <h2>Presentation</h2>
          <p>
            Experienced software engineer specializing in backend engineering and full stack
            solutions. Proficient in agile development methodologies, I thrive in dynamic and
            collaborative environments, delivering high-quality software solutions within iterative
            and time-sensitive cycles. With a strong passion for computer engineering, I
            continuously seek opportunities to learn and grow, staying up-to-date with industry
            trends to drive innovation and deliver high-quality results. Always open to exciting
            opportunities in the field of software engineering.
          </p>
        </div>
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <strong>Name:</strong> Nicolò Bartelucci
            </li>
            <li>
              <strong>Place of birth:</strong> Jesi, Italy
            </li>
            <li>
              <strong>Gender:</strong> Male
            </li>
            <li>
              <strong>Nationality:</strong> Italian
            </li>
            <li>
              <strong>Marital status:</strong> Unmarried
            </li>
            <li>
              <strong>Email:</strong>
              <span>nicobar97@gmail.com</span>
            </li>
            <li>
              <strong>GitHub:</strong>
              <a href="https://www.github.com/nicobar97">
                <LinkText>@nicobar97</LinkText>
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>
              <a href="https://www.linkedin.com/in/nicobar/">
                <LinkText>@nicobar</LinkText>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Speaking</h2>
          <ul>
            <li>Italian</li>
            <li>English</li>
            <li>Typescript</li>
          </ul>
        </div>
        <div>
          <h2>Main Tech Stack</h2>
          <ul>
            <li>Typescript</li>
            <li>Node.js</li>
            <li>Javascript</li>
            <li>React</li>
          </ul>
        </div>

        <div>
          <h2>Work Career</h2>
          <div>
            <h3>Backend Software Engineer at ONYON</h3>
            <p>January 2023 - Present</p>
            <p>Milano, Lombardia, Italia · Ibrida</p>
          </div>
          <div>
            <h4>Tech Stack:</h4>
            <ul>
              <li>TypeScript</li>
              <li>Node.js</li>
            </ul>
          </div>
          <div>
            <h3>Full Stack Engineer at Caffeine</h3>
            <p>December 2020 - Present</p>
            <p>
              During my university studies, I developed, worked, and launched Caffeine! Caffeine is
              a Chrome Extension that speeds up and automates your favorite EU sites! Say goodbye to
              slow loading times and manually refreshing pages, and say hello to lightning-fast
              browsing and automated checkout experience.
            </p>
            <h4>Tech Stack:</h4>
            <ul>
              <li>Node.js</li>
              <li>Python</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div>
            <h3>Research Fellow at Alma Mater Studiorum - Università di Bologna</h3>
            <p>June 2022 - December 2022 · 7 months</p>
            <p>
              After my graduation, I decided to work as a fellow researcher under the DISI of the
              University of Bologna.
            </p>
            <h4>Tech Stack:</h4>
            <ul>
              <li>Firebase</li>
              <li>DevOps</li>
              <li>Kubernetes</li>
              <li>Flutter</li>
              <li>iOS</li>
              <li>Android</li>
            </ul>
          </div>
          <div>
            <h3>Visiting Research Fellow at Vienna University of Technology</h3>
            <p>September 2021 - December 2021 · 4 months</p>
            <p>
              I researched at the Distributed System Group at TUWien in Vienna for the preparation
              of my master thesis.
            </p>
            <h4>Tech Stack:</h4>
            <ul>
              <li>Kubernetes</li>
            </ul>
          </div>
        </div>

        <div>
          <h2>Academic Career</h2>
          <div>
            <h3>Master in Computer Engineering</h3>
            <p>University of Bologna, Bologna</p>
            <p>Graduated with 110/110 with greetings</p>
            <p>
              Thesis: High!Level Metrics for Service Level Objective!aware Autoscaling in Polaris: a
              Performance Evaluation
            </p>
            <p>Sep 2020 - Mar 2022</p>
          </div>
          <div>
            <h3>Bachelor in Computer Engineering</h3>
            <p>University of Bologna, Bologna</p>
            <p>Graduated with 100/110.</p>
            <p>
              Thesis: Support Systems for Industry 4.0: MQTT and Apache Kafka performance evaluation
            </p>
            <p>Sep 2017 - Oct 2020</p>
          </div>
        </div>

        <div>
          <h2>Interests</h2>
          <ul>
            <li>App & Software Development</li>
            <li>Computer Science & Engineering</li>
            <li>iOS & Android</li>
            <li>Internet of Things & Consumer Electronics</li>
            <li>Sportsman, Calisthenics, HandBalance, Swimmer</li>
            <li>Travelling and learning foreign cultures</li>
            <li>Fashion & Sneakers</li>
            <li>Healthy Lifestyle & Foods</li>
          </ul>
        </div>

        <div>
          <h2>Characteristics</h2>
          <ul>
            <li>Gets on well with people of all ages.</li>
            <li>Open to new ideas and suggestions, flexible worker.</li>
            <li>Teamwork skills, shows commitment and/or reliability.</li>
            <li>Excellent practical skills, technically minded, problem-solving skills.</li>
            <li>Good attendance record, punctual and reliable.</li>
            <li>Able to meet deadlines, excellent planning skills, effective time management.</li>
            <li>Able to stay calm and work well under pressure.</li>
            <li>Use a creative approach to problem solve.</li>
          </ul>
        </div>
      </MobileFrame>
    </Content>
  </>
);
