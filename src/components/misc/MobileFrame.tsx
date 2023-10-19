import styled from 'styled-components';

const Frame = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

type Props = {
  children: React.ReactNode;
};

export const MobileFrame: React.FC<Props> = (props: Props) => (
  <>
    <Frame>{props.children}</Frame>
  </>
);
