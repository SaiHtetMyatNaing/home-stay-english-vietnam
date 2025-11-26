// app/reviews/og.tsx
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
                    width={200}
                    height={200}
                    alt="English Homestay Vietnam Logo"
                    style={{ marginBottom: 32 }}
                />

                <h1
                    style={{
                        fontSize: 86,
                        fontWeight: 900,
                        background: 'linear-gradient(to right, #46b96c, #2e8b57)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        marginTop: 20,
                        textAlign: 'center',
                    }}
                >
                    Volunteer Reviews
                </h1>

                <p style={{ fontSize: 42, color: '#1e293b', marginTop: 20, textAlign: 'center' }}>
                    Real stories from volunteers teaching English in Vietnam
                </p>

                {/* 4.8 stars */}
                <div style={{ display: 'flex', gap: 16, marginTop: 30, alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ fontSize: 80 }}>
                            {i < 4 ? '⭐' : '☆'}
                        </span>
                    ))}
                    <span style={{ fontSize: 48, marginLeft: 12, color: '#1e293b', fontWeight: '600' }}>
                        4.8
                    </span>
                </div>

                {/* Flags */}
                <div style={{ display: 'flex', gap: 24, marginTop: 40, fontSize: 60 }}>
                    🇩🇪 🇫🇷 🇺🇸 🇬🇧 🇨🇦 🇻🇳 🇦🇺 🇯🇵 🇹🇭 🇮🇩
                </div>

                <div
                    style={{
                        marginTop: 50,
                        padding: '24px 72px',
                        backgroundColor: '#46b96c',
                        color: 'white',
                        fontSize: 44,
                        fontWeight: 700,
                        borderRadius: 20,
                    }}
                >
                    Read Reviews
                </div>

                <div style={{ position: 'absolute', bottom: 50, fontSize: 36, color: '#46b96c' }}>
                    englishhomestayvietnam.com/reviews
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}