const getLastLogin = (d) => {
    const date = new Date(d)

    const thatNow = date.getTime(),
        now = Date.now();

    if ((now - thatNow) < 1000 * 3600 * 24) {
        return {
            hourLogin: `a las ${date.toLocaleTimeString()}`
        }
    }

    return {
        hourLogin: false,
        lastLoginDate: date.toLocaleDateString(),
        lastLoginTime: date.toLocaleTimeString()
    }
};

export default getLastLogin;