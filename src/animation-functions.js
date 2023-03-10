//Function stolen from https://easings.net/

export function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export function linear(x){
    return x;
}

export function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

export function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

export function easeInCubic(x) {
    return x * x * x;
}

export function easeInQuart(x) {
    return x * x * x * x;
}

export function easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

export function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

export default {
    "linear": linear,
    "easeOutBounce":easeOutBounce,
    "easeOutElastic":easeOutElastic,
    "easeInOutBack":easeInOutBack,
    "easeInExpo":easeInExpo,
    "easeInQuart":easeInQuart,
    "easeInCubic":easeInCubic,
    "easeInOutQuart":easeInOutQuart,
    "easeOutQuart":easeOutQuart,
    "easeInOutCubic":easeInOutCubic,
    "easeOutCubic":easeOutCubic,
    "easeInOutElastic":easeInOutElastic
};