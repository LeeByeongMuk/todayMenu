const debounce = (callback, delay) => {
    let timer;

    return (...arg) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback(...arg);
        }, delay);
    };
};

export default debounce;
