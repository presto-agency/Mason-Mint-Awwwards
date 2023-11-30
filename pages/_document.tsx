import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/images/open-graph.jpg" />
      </Head>
      <body>
        <div className="wrapper">
          <Main />
          <NextScript />
        </div>
        <script
          id="acsbapp-scipt"
          dangerouslySetInnerHTML={{
            __html:
              "(function () { var s = document.createElement('script'); var h = document.querySelector('head') || document.body; s.src = 'https://acsbapp.com/apps/app/dist/js/app.js'; s.async = true; s.onload = function () { acsbJS.init({ statementLink: '', footerHtml: '', hideMobile: false, hideTrigger: false, disableBgProcess: false, language: 'en', position: 'right', leadColor: '#146FF8', triggerColor: '#146FF8', triggerRadius: '50%', triggerPositionX: 'right', triggerPositionY: 'bottom', triggerIcon: 'people', triggerSize: 'bottom', triggerOffsetX: 20, triggerOffsetY: 20, mobile: { triggerSize: 'small', triggerPositionX: 'right', triggerPositionY: 'bottom', triggerOffsetX: 10, triggerOffsetY: 10, triggerRadius: '20' } }); }; h.appendChild(s); })();",
          }}
        />
      </body>
    </Html>
  )
}
