type otpProps = {
    otp: string,
    name: boolean,
}

module.exports = (
    data:otpProps,
) =>
    `
<div style="background-color: #f5f5f5; padding: 20px; font-family: 'Roboto', sans-serif;">
    otp: ${data.otp}
</div>
`
