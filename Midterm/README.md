# Web Technologies (CSC336) - Lab Mid Term Exam
**COMSATS University Islamabad, Lahore Campus**

---

### Student Details
* **Student Name:** Abdullah Saleem
* **Registration / Roll Number:** FA24-BCS-141
* **Personal Number $N$:** 41 (last two digits of FA24-BCS-141)
* **Breakpoint ($BP$):** $600 + N = 600 + 41 = \mathbf{641\text{px}}$
* **Accent Hue ($H$):** $(N \times 7) \pmod{360} = (41 \times 7) \pmod{360} = \mathbf{287^\circ}$  
  **Accent Colour:** `hsl(287, 70%, 45%)`
* **Category Columns ($K$):** $(N \pmod 3) + 3 = (41 \pmod 3) + 3 = \mathbf{5\text{ columns}}$
* **Product Max Limit:** $(N \pmod 4) + 2 = (41 \pmod 4) + 2 = \mathbf{3\text{ items}}$
* **AI Tools Used:** Google Antigravity (Gemini)

---

### Files Changed / Added
1. `index.html` — Updated navbar with "Shop by Category" mega-menu, cart toggle, mini-cart panel, and linked `script.js`.
2. `product.html` — Updated navbar for consistency across pages and linked cart to `checkout.html`.
3. `checkout.html` — Created checkout page with Contact and Delivery fieldsets and HTML5 validation.
4. `css/style.css` — Added styles for Task 1 (mega-menu & accordion), Task 2 (checkout grid & validation), and Task 3 (mini-cart & limit button).
5. `script.js` — Added plain JavaScript for cart state, badge count, mini-cart render, `reduce()` total calculation, and max-limit disabling.

---

### Summary of Tasks

#### Task 1: Mega-Menu in Existing Navbar
* **What was changed:** Added a "Shop by Category" dropdown inside the `<nav>` with $K = 5$ columns of 4 links each, using semantic `<details>` and `<summary>` tags.
* **Why:** On desktop ($\ge 641\text{px}$), `:hover` and `:focus-within` open a full-width panel above page content without pushing elements down. On mobile ($< 641\text{px}$), it transforms into an independent accordion with zero custom JavaScript.

#### Task 2: Checkout Form with HTML5 Validation Only
* **What was changed:** Created `checkout.html` with two `<fieldset>` elements ("Contact" and "Delivery"), phone regex `03[0-9]{2}-[0-9]{7}`, and delivery date limits (`min="2026-10-29"` to `max="2026-12-09"`).
* **Why:** Leveraged native HTML5 form validation and CSS `:user-invalid` so errors appear only after user interaction. At $\ge 641\text{px}$, CSS Grid places the fieldsets side by side with left-aligned labels.

#### Task 3: JavaScript Cart Badge & Mini-Cart
* **What was changed:** Implemented `script.js` to manage the cart array, reading card title and price directly from DOM elements upon clicking "Add to Cart".
* **Why:** The cart badge updates dynamically, a togglable mini-cart calculates total price via `reduce()`, and products reaching the limit of 3 are disabled with "Limit reached" until an item is removed.
