# About the project

This is a utility website dedicated to generating QR Codes. You can explore it here: [QR Code Generator](https://julio-salas03.github.io/qr-codes/).

TODO: Add a screenshot of the final designs here.

Please note that I did not create the utility used to generate the codes. The QR code generation is handled by the awesome [qrcode](https://www.npmjs.com/package/qrcode) library. If you're working with QR Codes in JavaScript, definitely check it out. This project aims to provide a user-friendly interface to simplify the code generation process.

This project is still in development. You can check out the issues tab to see the features planned for future releases.

## Technical details

I'm using [solid-ui](https://www.solid-ui.com/docs/introduction) as my components library and [solid-icons](https://solid-icons.vercel.app/) to get the icons in the `src/components/icons` folder.

As mentioned before, I'm using [qrcode](https://www.npmjs.com/package/qrcode) for generating the codes. It provides a flexible yet powerful API that works on both the browser and server. It's also quite small at [24.1kb when minified](https://bundlephobia.com/package/qrcode@1.5.3).
