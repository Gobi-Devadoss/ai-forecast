# 📊 AI Demand Forecasting Platform

## Overview

AI Demand Forecasting Platform is a modern full-stack business intelligence application designed to help organizations analyze historical sales data and generate accurate future demand predictions using Artificial Intelligence.

Built with powerful technologies like FastAPI, React, and Prophet, the platform provides a complete analytics ecosystem for data-driven business decision-making.

---

# 🌟 Platform Highlights

✅ AI-Based Sales Forecasting
✅ Interactive Analytics Dashboard
✅ CSV & Excel Dataset Upload
✅ PDF & Excel Report Generation
✅ Secure JWT Authentication
✅ Real-Time Business Insights

---

# 🧠 Key Functionalities

## 🔐 Authentication & Security

* User Signup & Login
* JWT Token Authentication
* Protected API Endpoints
* Secure Session Management

---

## 📂 Dataset Management

* Upload CSV / XLSX Files
* Automatic Data Cleaning
* Missing Value Handling
* Duplicate Record Removal
* Smart Dataset Validation

---

## 📈 Business Analytics

* Revenue Analysis
* Sales Trend Monitoring
* KPI Performance Cards
* Product Performance Tracking
* Dynamic Data Visualization

---

## 🤖 AI Forecasting System

* Time-Series Forecasting
* Future Demand Prediction
* Monthly Revenue Forecast
* Product & Category Forecasting
* Forecast Accuracy Evaluation (MAPE)

---

## 📑 Reporting System

* PDF Report Export
* Excel Report Download
* Forecast Summary Reports
* Business Analytics Reports

---

# ⚙️ Technology Stack

## Backend

* FastAPI
* MySQL
* SQLAlchemy
* JWT Authentication
* Pandas
* Scikit-learn
* Prophet
* ReportLab

---

## Frontend

* React
* Tailwind CSS
* Axios
* Recharts
* Framer Motion
* React Hot Toast

---

# 📁 Folder Structure

```bash
AI-Demand-Forecasting/
│
├── backend/
│   ├── app/
│   ├── reports/
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```bash
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

# 🔑 Environment Configuration

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost/ai_forecasting

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 🔄 Forecasting Pipeline

1️⃣ Upload historical business dataset
2️⃣ Clean and preprocess data
3️⃣ Train AI forecasting model
4️⃣ Generate future predictions
5️⃣ Visualize forecast analytics
6️⃣ Export professional reports

---

# 🔒 Security Features

* JWT Authentication
* Protected Frontend Routes
* Secure Backend APIs
* Environment Variable Protection

---

# 🚀 Planned Enhancements

* XGBoost Forecasting
* LSTM Deep Learning Models
* Real-Time Forecast Analytics
* Cloud Deployment
* Role-Based Access Control
* Advanced BI Dashboards

---

# 👨‍💻 Developed By

## Gobinath Devadoss

Full-Stack Developer • Python Developer • AI Enthusiast • Financial Analytics Creator
