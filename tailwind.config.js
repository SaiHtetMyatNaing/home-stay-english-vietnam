// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' if you prefer OS-based dark mode
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        // ============================================
        // CENTRALIZED COLOR PALETTE – EDIT HERE ONLY
        // ============================================
        primary: {
          DEFAULT: "hsl(140 45% 50%)",      // Light green (same in light/dark)
          foreground: "hsl(30 15% 25%)",    // Dark brown text on primary
        },
        secondary: {
          DEFAULT: "hsl(35 80% 55%)",       // Warm orange/beige
          foreground: "hsl(30 15% 25%)",
        },

        // Light mode
        background: "hsl(40 30% 97%)",
        foreground: "hsl(30 15% 25%)",

        card: "hsl(40 25% 98%)",
        "card-foreground": "hsl(30 15% 25%)",

        popover: "hsl(40 25% 98%)",
        "popover-foreground": "hsl(30 15% 25%)",

        muted: "hsl(40 20% 92%)",
        "muted-foreground": "hsl(30 15% 45%)",

        accent: "hsl(40 30% 88%)",
        "accent-foreground": "hsl(30 15% 25%)",

        border: "hsl(40 20% 85%)",
        input: "hsl(40 20% 92%)",
        ring: "hsl(140 45% 50%)",

        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },

        // Dark mode overrides
        dark: {
          background: "hsl(20 14% 10%)",
          foreground: "hsl(35 25% 95%)",

          card: "hsl(20 14% 12%)",
          "card-foreground": "hsl(35 25% 95%)",

          popover: "hsl(20 14% 12%)",
          "popover-foreground": "hsl(35 25% 95%)",

          muted: "hsl(20 14% 18%)",
          "muted-foreground": "hsl(35 25% 65%)",

          accent: "hsl(20 14% 18%)",
          "accent-foreground": "hsl(35 25% 95%)",

          border: "hsl(20 14% 18%)",
          input: "hsl(20 14% 18%)",
          ring: "hsl(140 45% 50%)",

          destructive: {
            DEFAULT: "hsl(0 62.8% 50%)",
            foreground: "hsl(0 0% 98%)",
          },
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};