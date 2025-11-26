// app/reviews/write-review/og.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f8fff9 0%, #e8f7ed 100%)',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Your logo */}
                <img
                    src="https://www.englishhomestayvietnam.com/logo.svg"
                    width={180}
                    height={180}
                    alt="English Homestay Vietnam Logo"
                    style={{ marginBottom: 32 }}
                />

                <h1
                    style={{
                        fontSize: 82,
                        fontWeight: 900,
                        background: 'linear-gradient(to right, #46b96c, #2e8b57)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        marginTop: 20,
                        textAlign: 'center',
                    }}
                >
                    Share Your Experience
                </h1>

                <p style={{ fontSize: 40, color: '#1e293b', marginTop: 20, textAlign: 'center', maxWidth: 800 }}>
                    Help future volunteers — write a review of your stay in Vietnam
                </p>

                {/* Stars */}
                <div style={{ display: 'flex', gap: 16, marginTop: 30 }}>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ fontSize: 80 }}>
                            {i < 4 ? '⭐' : '☆'}
                        </span>
                    ))}
                </div>

                {/* Flags */}
                <div style={{ display: 'flex', gap: 20, marginTop: 30, fontSize: 50 }}>
                    🇺🇸 🇬🇧 🇨🇦 🇻🇳 🇦🇺 🇩🇪 🇫🇷 🇯🇵 🇹🇭 🇮🇩
                </div>

                <div
                    style={{
                        marginTop: 50,
                        padding: '28px 80px',
                        backgroundColor: '#46b96c',
                        color: 'white',
                        fontSize: 48,
                        fontWeight: 700,
                        borderRadius: 20,
                        boxShadow: '0 10px 30px rgba(70, 185, 108, 0.3)',
                    }}
                >
                    Write a Review
                </div>

                <div style={{ position: 'absolute', bottom: 50, fontSize: 36, color: '#46b96c' }}>
                    englishhomestayvietnam.com/reviews/write-review
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}