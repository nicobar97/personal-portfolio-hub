import styled from 'styled-components';

import error_img from '../assets/images/error.png';

type Props = {
  title: string;
  message: string;
};

const Title = styled.span`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  width: 100%;
  padding-bottom: 1rem;
`;

const Message = styled.span`
  font-family: Barlow;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  width: 100%;
  padding-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  margin-top: 30%;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.hexToRgbA(props.theme.colors.black, 0.1)} 0px 7px 29px 0px;
`;

const ErrorImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
`;

export const Error: React.FC<Props> = (props: Props) => (
  <>
    <Container>
      <Title>{props.title}</Title>
      <Message>{props.message}</Message>
      <ErrorImg alt="error" src={error_img}></ErrorImg>
    </Container>
  </>
);
