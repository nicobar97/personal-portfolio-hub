import { createGlobalStyle } from 'styled-components';
import { ThemeStyleEnum } from '../model/Theme';

export const GlobalStyle = createGlobalStyle<{ themeStyle: ThemeStyleEnum }>`

:root {
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: ${(props) => props.theme.colors(props.themeStyle).text};
  background-color: ${(props) => props.theme.colors(props.themeStyle).background};
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  user-select: none;
  overflow-x: hidden;
  overflow-y: auto;
  transition: background-color 0.5s, color 0.5s, border 0.5s;
}

#root {
}

body {
  margin: 0;
}

li {
  list-style: none;
}

img {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -webkit-user-drag: none;
}

a:link {
  color: ${(props) => props.theme.colors(props.themeStyle).accent.color}
}
`;
