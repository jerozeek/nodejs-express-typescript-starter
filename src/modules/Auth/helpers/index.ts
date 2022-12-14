import moment from "moment"


export const expiryTimeInMinutes = (time: number = 30) => {
    return moment().add(time, 'minutes').unix()
}

export const generateRandomNumber = (length: number = 4): string => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (result.length < length) {
        generateRandomNumber(length);
    }
    return result;
}

export const now = moment().unix();
