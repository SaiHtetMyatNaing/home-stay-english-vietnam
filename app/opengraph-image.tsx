import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'English Homestay Vietnam'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #2563eb, #9333ea)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          English Homestay Vietnam
        </div>
        <div
          style={{
            fontSize: 30,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Bridge the gap between English and Vietnamese speakers
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
