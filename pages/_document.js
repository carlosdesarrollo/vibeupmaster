import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='author' content='@AlmeydaDev' />
        <meta name='description' content='VibeUp Website' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id='vibeup-portals' />
      </body>
    </Html>
  )
}
