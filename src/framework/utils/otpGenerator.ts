

const otpGenrator = () => {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
};

export default otpGenrator    