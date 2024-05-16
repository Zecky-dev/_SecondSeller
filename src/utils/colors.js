const MAIN = {
  primary: 'rgb(190,49,68)',
  link: '#387ADF',
  transparent: 'transparent',
  green: '#85BB65',
  red: 'red',
  black: 'black',
  white: 'white',
  cardTitle: 'black',
  cardDescription: 'rgba(0,0,0,0.5)',
  blackMuted: 'rgba(0,0,0,0.5)',
};

const COLORS = {
  LIGHT: {
    ...MAIN,
    primary: '#BE3144',
    textColor: 'black',
    titleColor: 'white',
    titleMutedColor: 'whitesmoke',
    textMutedColor: 'rgba(0,0,0,0.5)',
    borderColor: 'black',
    pageBackground: '#ffffff',
    cardBackground: '#E8E8E8',
  },
  DARK: {
    ...MAIN,
    titleColor: 'white',
    primary: '#153448',
    titleMutedColor: 'rgba(255,255,255,0.5)',
    textColor: 'white',
    textMutedColor: 'rgba(255,255,255,0.5)',
    borderColor: 'white',
    pageBackground: '#3C5B6F',
    cardBackground: 'white',
  },
};

export default COLORS;
