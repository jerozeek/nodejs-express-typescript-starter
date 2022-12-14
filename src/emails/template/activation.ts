type activationProps = {
    otp: string,
    name: boolean,
}

module.exports = (
    data:activationProps,
) =>
    `
<div style="background-color: #f5f5f5; padding: 20px; font-family: 'Roboto', sans-serif;">
    otp: ${data.otp}
</div>
`
