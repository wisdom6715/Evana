// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Site Verification Meta Tag */}
          <meta
            name="google-site-verification"
            content="OGaaYFm668af2bmYFTuK_EPHZRjA0BzvyYsXSH3lMH4"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;