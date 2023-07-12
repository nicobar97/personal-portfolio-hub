import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
  line-height: 1.5;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow-x: hidden;
  overflow-y: hidden;
}

#root {
}

body {
  margin: 0;
}

li {
  list-style: none;
}
`;
