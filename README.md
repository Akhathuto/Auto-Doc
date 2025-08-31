<p align="center">
  <img src="https://i.imgur.com/9A2C0g5.jpeg" alt="EdgTec Promotional Banner" />
</p>

# Auto Doc - AI-Powered Document Generation by EDGTEC

**Auto Doc** is a futuristic, AI-powered document creation suite designed to streamline your workflow and enhance productivity. By leveraging the advanced capabilities of the Google Gemini AI, Auto Doc allows users to generate, analyze, rewrite, and customize professional documents in seconds.

Developed by **EDGTEC**, our mission is to build intelligent, user-centric tools that push the boundaries of technology and design.

---

## ✨ Key Features

Auto Doc is packed with features designed for professionals, students, and anyone who needs to create high-quality documents quickly.

-   **🤖 Powerful AI Generation**: Utilizes the Google Gemini API (`gemini-2.5-flash`) to generate high-quality, contextually relevant documents from simple text prompts.
-   **📄 Multi-Format Export**: Seamlessly download your generated documents in popular formats, including **PDF**, **Word (.docx)**, **Excel (.xlsx)**, and **Plain Text (.txt)**.
-   **🎨 Full Customization**: Tailor your documents to match your brand. Add custom **headers**, **footers**, upload **artwork/logos**, and choose from a selection of professional **fonts** and **sizes**.
-   **🧠 AI-Powered Analysis & Rewrite**: Go beyond generation.
    -   **Analyze**: Get an AI-powered summary, a clarity check, or actionable suggestions for improvement.
    -   **Rewrite**: Instantly shorten, lengthen, simplify, or make your document's tone more formal.
-   **💾 Persistent Version History**: Never lose a good draft. Every document you generate is automatically saved to your browser's local storage. You can view, compare, and restore any previous version with a single click.
-   **🌐 Multi-Language & Tone Support**: Generate documents in over 10 languages and specify the exact tone you need—from professional and academic to casual and creative.
-   **🚀 Extensive Template Library**: Get started in seconds with a curated collection of professional templates for business proposals, resumes, reports, and more.
-   **🔮 Futuristic UI/UX**: A sleek, modern dark theme with vibrant cyan accents and glassmorphism UI elements creates an immersive and enjoyable user experience.

---

## 🌟 Latest Update: The Futura Release

This version marks a complete aesthetic and functional overhaul of the Auto Doc application, focusing on a cutting-edge user experience and powerful new features.

-   **Complete UI Redesign**: Implemented a sophisticated dark theme with vibrant cyan accents and "frosted glass" UI elements.
-   **Enhanced Landing Page**: Added new "How It Works," "Testimonials," and "FAQ" sections to better inform new users.
-   **Advanced AI Tools**: Introduced the **Analyze** and **Rewrite** tabs, allowing for post-generation refinement of documents.
-   **Full Document Customization**: Users can now add headers, footers, logos, and specify fonts for professional-grade documents.
-   **Expanded Capabilities**: Added multi-language and tone selection to give users granular control over the AI's output.

---

## 🚀 Getting Started: Installation & Running

This project is a client-side application built with React and Vite, using an import map for dependencies. No complex build step is required to run it locally.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Edge).
-   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://ai.google.dev/).

### Running the Application

**1. Set up your API Key:**

The application is configured to use an environment variable (`process.env.API_KEY`), but in a simple client-side setup, you need to add your key directly.

-   Open the file: `src/services/geminiService.ts`
-   Find the line: `const API_KEY = process.env.API_KEY;`
-   **Replace `process.env.API_KEY` with your actual Gemini API key in quotes**, like this:
    ```typescript
    const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
    ```
    > **Warning**: Do not commit your API key to a public repository. This method is for local development only.

**2. Serve the Project Files:**

Since the app uses ES modules, you need to serve the files from a local web server. You cannot just open `index.html` from your file system.

**Easy Method (for VS Code users):**
1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in Visual Studio Code.
2.  Open the project folder in VS Code.
3.  Right-click the `index.html` file and select "Open with Live Server".
4.  Your browser will open with the application running.

**Alternative Method (using Python - any OS):**
1.  Open a terminal or command prompt in the project's root directory.
2.  If you have Python 3, run: `python -m http.server`
3.  Open your browser and navigate to `http://localhost:8000`.

**Alternative Method (using Node.js - any OS):**
1.  Open a terminal or command prompt.
2.  Install the `serve` package globally: `npm install -g serve`
3.  Navigate to the project's root directory.
4.  Run the command: `serve`
5.  Open your browser to the local address provided in the terminal (usually `http://localhost:3000`).

---

## 🛠️ Technology Stack

-   **Frontend**: React 19, TypeScript, Tailwind CSS
-   **Core AI**: Google Gemini API (`@google/genai`)
-   **Document Libraries**: `docx`, `jspdf`, `xlsx`, `file-saver`

---

## 📂 Project Structure

```
/
├── src/
│   ├── components/      # Reusable React components
│   ├── services/        # API calls (geminiService.ts)
│   ├── utils/           # Helper functions (fileGenerator.ts)
│   ├── App.tsx          # Main application component
│   ├── constants.ts     # Static data (templates, pricing)
│   └── types.ts         # TypeScript type definitions
├── index.html           # Main HTML file
└── README.md            # You are here!
```

---

## About EDGTEC

**EDGTEC** is a forward-thinking technology company dedicated to creating innovative software solutions that blend cutting-edge AI with exceptional design. We believe that powerful tools should be accessible, intuitive, and inspiring to use. Auto Doc is our flagship product, embodying our commitment to quality, efficiency, and user empowerment.
