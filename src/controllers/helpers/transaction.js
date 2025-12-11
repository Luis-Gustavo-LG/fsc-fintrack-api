export const checkIfTypeIsValid = (type) => ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);

export const amountToCents = (amount) => {
    const normalized = String(amount).replace(",", ".");
    return Math.round(Number(normalized) * 100);
}