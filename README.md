# Luminna

![Lumina Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop&q=80)

**Luminna** is a visual discovery engine clone of Pinterest built for finding inspiration, recipes, style ideas, and more. It features a seamless infinite-scroll interface, a dedicated dark mode aesthetic, and a masonry layout.

## ✨ Features

* **Cinema-Grade UI:** A "Welcome" landing page with an infinite marquee background and glassmorphism effects.
* **Infinite Scroll:** A seamless "TikTok-style" feed that automatically loads more images as you reach the bottom.
* **Smart Masonry Layout:** A responsive grid that fits images of all aspect ratios perfectly, adapting from phones to 4K screens.
  
* **Performance First:**
    * Optimized image loading strategies.
    * Intersection Observer API for efficient scrolling.
    * Debounced inputs to prevent API flooding.

## 🛠️ Tech Stack

* **Frontend:** [React](https://reactjs.org/) (TypeScript)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **UI System:** [Material UI (MUI)](https://mui.com/)
* **Data Source:** [Unsplash API](https://unsplash.com/developers)
* **Animations:** CSS Keyframes & Transitions

## 🚀 Getting Started

Follow these steps to run Lumina locally.

### Prerequisites

* Node.js
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Anuarbekov/luminna.git](https://github.com/Anuarbekov/luminna.git)
    cd lumina
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Keys**
    Create a `.env` file in the root directory and add your Unsplash Access Key:
    ```env
    VITE_ACCESS_KEY=your_unsplash_access_key_here
    ```
    > **Note:** You can get a free key by registering an app on the [Unsplash Developers](https://unsplash.com/developers) portal.

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view it in the browser.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── Header.tsx    # Responsive search bar
│   ├── ImageCard.tsx # Individual image display
│   ├── MainLayout.tsx# Infinite scroll & grid logic
│   └── Welcome.tsx   # Landing page with marquee
├── hooks/            # Custom React Hooks
│   └── useImageSearch.ts # API logic & state management
├── App.tsx           # Theme provider & Routing
└── main.tsx          # Entry point
