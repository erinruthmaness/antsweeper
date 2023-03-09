//the Fisher-Yates shuffle
export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const assessDigit = (string, num) => {
    return string + "--" + num.toString();
};

export const levels = {
    beginner: {
        rows: 8,
        cols: 8,
        ants: 10,
        level: "beginner",
    },
    intermediate: {
        rows: 16,
        cols: 16,
        ants: 40,
        level: "intermediate",
    },
    expert: {
        rows: 24,
        cols: 24,
        ants: 99,
        level: "expert",
    },
};
