const isAdult = (x) => {
    if (x >= 18) {
        return 'Is adult.';
    }

    return 'Is not an adult.';
}

const canDrink = (y) => {
    if (y >= 21) {
        return 'Can drink.';
    }

    return "Can't drink.";
}

export { isAdult, canDrink }