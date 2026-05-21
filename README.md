# 🍄 Super Mario Bros - Google Apps Script Edition

Welcome to the **Super Mario Bros - GAS Edition**, a complete standalone recreation of the classic NES game, optimized to run entirely within a Google Apps Script Web App!

## ✨ Features

- **Pure GAS Deployment**: Zero external dependencies. All graphics, sounds, and logic are bundled internally as Base64 data within a single `Index.html` file.
- **Level Selector**: Play the first full world (Worlds 1-1, 1-2, 1-3, and 1-4) directly from the authentic retro start menu.
- **Classic Gameplay**: Accurate block-breaking physics, momentum-based jumping, and authentic enemy behaviors.
- **Cross-Platform Controls**:
  - **Keyboard**: Play using the traditional Arrow Keys or WASD for movement. `X` or `K` to Jump. `Z` or `J` to Sprint.
  - **Mobile Touch**: Fully responsive on-screen buttons for touch-screen devices.
- **Modern Rendering**: Uses CSS-based pixel-perfect scaling (`image-rendering: pixelated`) for incredibly fast and crisp performance without the heavy overhead of manual canvas scaling.

## 🚀 How to Deploy to Google Apps Script

1. Go to [script.google.com](https://script.google.com) and create a **New Project**.
2. Replace the contents of the default `Code.gs` with the contents of the **`Code.gs`** file in this repository.
3. Add a new HTML file to your project, name it exactly **`Index`** (with a capital 'I').
4. Copy and paste the entire contents of the **`Index.html`** file from this repository into your new `Index.html` file in GAS.
5. Click **Deploy > New deployment**.
6. Select type **Web app**.
7. Set "Execute as" to **Me** and "Who has access" to **Anyone**.
8. Click **Deploy** and open the provided URL!

## 🎮 Controls

| Action | Primary Key | Secondary Key |
| :--- | :--- | :--- |
| **Move Left** | Left Arrow | `A` |
| **Move Right** | Right Arrow | `D` |
| **Crouch/Pipe** | Down Arrow | `S` |
| **Jump** | `X` | `K` |
| **Sprint / Fire** | `Z` | `J` |

*Touch controls are automatically displayed on the bottom of the screen for mobile users.*

---
*Created for educational and archival purposes.*