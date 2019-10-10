const colors = {
    accent: "#FF4957",
    primary: "#006600",
    secondary: "#86592d",
    tertiary: "#FFE358",
    black: "#2F2F2F",
    white: "#FFFFFF",
    gray: "#994d00",
    gray2: "#d9b38c",
    gray3: "#F0F0F0",
    gray4: "#ebd9c6",
  };
  
  const sizes = {
    // global sizes
    base: 16,
    font: 14,
    border: 15,
    padding: 25,
  
    // font sizes
    h1: 39,
    h2: 29,
    h3: 19,
    title: 18,
    header: 24,
    body: 12,
    caption: 12,
    small: 8,
    bodyTitle: 20
  };
  
  const fonts = {
    h1: {
      fontFamily: "Rubik-Light",
      fontSize: sizes.h1
    },
    h2: {
      fontFamily: "Rubik-Medium",
      fontSize: sizes.h2
    },
    h3: {
      fontFamily: "Rubik-Regular",
      fontSize: sizes.h3
    },
    header: {
      fontFamily: "Rubik-Bold",
      fontSize: sizes.header,
      fontWeight: '500',
      padding:10,
    },
    title: {
      fontFamily: "Rubik-Regular",
      fontSize: sizes.title
    },
    body: {
      fontSize: sizes.body
    },
    caption: {
      fontFamily: "Rubik-Regular",
      fontSize: sizes.caption
    },
    text: {
      fontFamily: "Rubik-Regular",
      fontSize: sizes.base
    },
    small: {
      fontSize: sizes.small
    }
  };
  
  export { colors, sizes, fonts };