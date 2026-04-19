

## 🚀 Kanban Task Management App
A professional, dynamic Kanban board designed for streamlined task management. This application fetches real-time data from a custom API, manages state through `LocalStorage`, and features a fully responsive, theme-aware interface built with modular JavaScript.

### 🔗 Project Links
* **Live Deployment:** [https://kanbanmanagement.netlify.app/]
* **Recorded Presentation:** [https://youtu.be/XZssFwzyU7I]

---

## 🛠️ Tech Stack
* **Frontend:** HTML5 & CSS3 (Custom 1440px Desktop Breakpoints)
* **Styling:** Tailwind CSS / Modern CSS Variables
* **Logic:** Modular JavaScript (ES6 Modules)
* **State Management:** LocalStorage Persistence
* **Deployment:** Netlify

---

## 🏗️ Architecture & Logic Flow
The application follows a **Modular Design Pattern**, separating concerns to ensure the codebase is maintainable and scalable:

* **`api.js`**: Handles asynchronous communication with the JSL Kanban API, including error handling and loading states.
* **`storage.js`**: Manages the synchronization between the application state and the browser's `localStorage`.
* **`ui.js`**: A dedicated layer for DOM manipulation, responsible for rendering task cards, handling modal states, and updating the board dynamically.
* **`theme.js`**: Manages Light/Dark mode transitions and ensures user preferences are saved.

---

## ✨ Key Features

### 1. Task Management & Persistence
* **Dynamic Data Fetching:** On initial load, the app fetches tasks from the external API if no local data exists.
* **CRUD Operations:** Users can create new tasks, edit existing details via a modal, and delete tasks with a safety confirmation prompt.
* **Persistent Storage:** All changes are saved to `localStorage`, ensuring data consistency even after a page refresh.

### 2. Responsive UI/UX
* **Toggleable Sidebar:** A desktop sidebar that hides/shows to maximize workspace, which transforms into a mobile-friendly menu accessible via the app logo.
* **Dark/Light Mode:** A full-theme toggle switch implemented in both desktop and mobile views for consistent accessibility.
* **Loading & Error States:** Visual feedback is provided during data fetching to enhance user experience.

### 3. Priority System (Stretch Goal)
* Implemented a hierarchical sorting system (**High** → **Medium** → **Low**).
* Tasks are visually tagged by priority and automatically sorted within columns so that high-priority items always appear at the top.

---

## 🚀 Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Phuthuma-tech/PHUMAV25567_pto2508_Group-B_Phuthuma-Mavuso_JSL_Portfolio-Piece.git]
    ```
2.  **Open in VS Code:**
    Ensure you use an extension like **Live Server** to run the project, as ES Modules require a server environment to function correctly.
3.  **Deployment:**
    The project is configured for easy deployment on **Netlify**. Simply drag and drop the project folder or connect your GitHub repository.

---

## 🧠 Reflection & Challenges
This project provided a deep dive into managing **asynchronous state**. One of the main challenges was coordinating between the initial API fetch and the local storage updates to prevent data duplication. I addressed this by implementing a check-and-balance logic that prioritizes local storage once the initial data is successfully cached. Additionally, ensuring the sidebar behaved correctly across both desktop and mobile viewports required a robust approach to CSS layout and event listeners.

---

### Author
**[Phuthuma Mavuso]**
*Front-End Developer in Training | Focus on JavaScript & Responsive Design*