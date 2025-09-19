/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Luxury Design System Colors
        luxury: {
          gold: "hsl(var(--luxury-gold))",
          "gold-dark": "hsl(var(--luxury-gold-dark))",
          navy: "hsl(var(--luxury-navy))",
          "navy-light": "hsl(var(--luxury-navy-light))",
        },
      },
      fontFamily: {
        luxury: ["Lora", "serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-luxury": "var(--gradient-luxury)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        luxury: "var(--shadow-luxury)",
        gold: "var(--shadow-gold)",
        soft: "var(--shadow-soft)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "luxury-fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "luxury-slide-up": {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "luxury-scale": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gold-glow": {
          "0%": { textShadow: "0 0 10px hsl(var(--luxury-gold) / 0.5)" },
          "100%": {
            textShadow:
              "0 0 20px hsl(var(--luxury-gold) / 0.8), 0 0 30px hsl(var(--luxury-gold) / 0.6)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "luxury-fade-in":
          "luxury-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "luxury-slide-up":
          "luxury-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "luxury-scale":
          "luxury-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gold-glow": "gold-glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "slide-in-left":
          "slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":
          "slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
