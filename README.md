# Auto Doc - AI-Powered Document Generation

![Auto Doc Editor](https://i.imgur.com/your-screenshot-url.png) <!-- It's recommended to add a screenshot of the app here -->

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

## 🛠️ Technology Stack

Auto Doc is built with a modern, robust, and performant technology stack.

-   **Frontend**:
    -   **React 19**: For building a fast and interactive user interface.
    -   **TypeScript**: For robust, type-safe code.
    -   **Tailwind CSS**: For a utility-first approach to styling that enables rapid UI development.
-   **Core AI**:
    -   **Google Gemini API (`@google/genai`)**: The engine behind all content generation, analysis, and rewriting tasks.
-   **Document Generation Libraries**:
    -   **`docx`**: For generating Microsoft Word (.docx) files on the client-side.
    -   **`jspdf`**: For creating and customizing PDF (.pdf) documents in the browser.
    -   **`xlsx`**: For building Microsoft Excel (.xlsx) spreadsheets from JSON data.

---

## 📂 Project Structure

The codebase is organized into a modular and maintainable structure:

```
/
├── public/
├── src/
│   ├── components/      # Reusable React components (UI elements)
│   │   ├── icons/       # SVG icon components
│   │   └── ...
│   ├── services/        # API calls and external service interactions (geminiService.ts)
│   ├── utils/           # Helper functions (e.g., fileGenerator.ts)
│   ├── App.tsx          # Main application component, handles views and routing
│   ├── constants.ts     # Static data (templates, pricing, features)
│   ├── types.ts         # TypeScript type definitions
│   └── index.tsx        # Application entry point
├── index.html           # Main HTML file
└── README.md            # You are here!
```

---

## About EDGTEC

**EDGTEC** is a forward-thinking technology company dedicated to creating innovative software solutions that blend cutting-edge AI with exceptional design. We believe that powerful tools should be accessible, intuitive, and inspiring to use. Auto Doc is our flagship product, embodying our commitment to quality, efficiency, and user empowerment.
