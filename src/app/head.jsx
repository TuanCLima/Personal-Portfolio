import Script from 'next/script'

export default function Head() {
  return (
    <>
      <title>Tuan Candido Lima</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Tuan Lima's portfolio" />
      <link rel="icon" href="/_favicon.ico" />
      <Script defer src="/fontawesome/js/brands.js"></Script>
      <Script defer src="/fontawesome/js/solid.js"></Script>
      <Script defer src="/fontawesome/js/fontawesome.js"></Script>
    </>
  )
}
