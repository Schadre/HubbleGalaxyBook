# 🌌 Hubble Galaxy Flipbook  

A **React + Tailwind** interactive flipbook that brings the **Hubble Telescope’s breathtaking images** right to your screen.  
Built with **page-flipping animations**, styled with **TailwindCSS**, and powered by **NASA/Hubble data APIs**.  
Deployed seamlessly with **AWS Amplify**.  

---

## ✨ Features  

📖 **Interactive Flipbook** – Turn pages just like a real book with [react-pageflip](https://www.npmjs.com/package/react-pageflip).  
🎨 **Styled with Tailwind** – Modern and responsive design.  
🪐 **Hubble Images** – Pulls in real NASA/Hubble telescope images and descriptions.  
⚡ **Serverless Backend** – Fetches Hubble data via an **AWS Lambda function**.  
🌐 **REST API** – Exposed through **API Gateway** to connect the frontend with Lambda.  
☁️ **AWS Amplify Hosting** – Free-tier hosting with HTTPS and CI/CD from GitHub.  

---

## 🛠 Tech Stack  

| Area         | Tech Used |
|--------------|-----------|
| 🎨 Frontend  | React, TypeScript, TailwindCSS |
| 📖 Flipbook  | [react-pageflip](https://github.com/Nodlik/react-pageflip) |
| 🔭 Data API  | NASA/Hubble API (via Lambda + REST API / custom `useHubbleMedia` hook) |
| ⚡ Backend   | AWS Lambda, API Gateway |
| ☁️ Hosting   | AWS Amplify (S3 + CloudFront) |
| ⚙️ Build     | Vite |

---

[Hubble Galaxy Book Website](https://main.d1npc29bd61end.amplifyapp.com/)

---

## 🚀 Getting Started  

### 1️⃣ Clone the repo  

```bash
git clone https://github.com/Schadre/HubbleGalaxyBook.git
cd HubbleGalaxyBook
