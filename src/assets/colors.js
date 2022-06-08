export const avatarBg = [
    {
        l: "A",
        bg: "#f44336"
    },
    {
        l: "B",
        bg: "#e91e63"
    },
    {
        l: "C",
        bg: "#9c27b0"
    },
    {
        l: "D",
        bg: "#673ab7"
    },
    {
        l: "E",
        bg: "#3f51b5"
    },
    {
        l: "F",
        bg: "#2196f3"
    },
    {
        l: "G",
        bg: "#03a9f4"
    },
    {
        l: "H",
        bg: "#00bcd4"
    },
    {
        l: "I",
        bg: "#009688"
    },
    {
        l: "J",
        bg: "#4caf50"
    },
    {
        l: "K",
        bg: "#8bc34a"
    },
    {
        l: "L",
        bg: "#cddc39"
    },
    {
        l: "M",
        bg: "#ffeb3b"
    },
    {
        l: "N",
        bg: "#ffc107"
    },
    {
        l: "O",
        bg: "#ff9800"
    },
    {
        l: "P",
        bg: "#ff5722"
    },
    {
        l: "Q",
        bg: "#795548"
    },
    {
        l: "R",
        bg: "#9e9e9e"
    },
    {
        l: "S",
        bg: "#607d8b"
    },
    {
        l: "T",
        bg: "#000000"
    },
    {
        l: "U",
        bg: "#ffffff"
    },
    {
        l: "V",
        bg: "#ff0000"
    },
    {
        l: "W",
        bg: "#00ff00"
    },
    {
        l: "X",
        bg: "#0000ff"
    },
    {
        l: "Y",
        bg: "#ffff00"
    },
    {
        l: "Z",
        bg: "#00ffff"
    }
]

export const selectColor = color => {
    const findBg = avatarBg.find(bg => bg.l === color);
    return findBg
}