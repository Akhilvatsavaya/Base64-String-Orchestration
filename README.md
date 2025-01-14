# Base64 Text Storage & Orchestration Project

## 📚 Project Overview

This project is a **Full-Stack Web Application** designed to demonstrate advanced skills in **Docker**, **Kubernetes**, and container orchestration. The application allows users to input text, encode it into **Base64**, and store the data in either **MongoDB** or **MySQL** databases based on the user's choice.

The entire infrastructure is containerized and orchestrated using Kubernetes with production-ready features like **StatefulSets**, **Persistent Volumes**, and **Ingress Controllers**.

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js (Express.js)  
- **Databases**: MongoDB (Replica Set with StatefulSet), MySQL (StatefulSet)  
- **Containerization**: Docker  
- **Orchestration**: Kubernetes (Minikube)  
- **Networking**: Kubernetes Ingress, Headless Services  

---

## 🚀 Features

- **Dynamic Data Storage**: Choose to store Base64-encoded text in either **MongoDB** or **MySQL**.  
- **Stateful Databases**: MongoDB and MySQL are deployed as **StatefulSets** for persistent storage.  
- **Replication**: MongoDB uses a **Replica Set** for high availability (Primary-Secondary nodes).  
- **Ingress Controller**: Routes HTTP requests to the correct service using path-based routing.  
- **Persistent Storage**: Data is retained across pod restarts using **Persistent Volumes (PVs)** and **Persistent Volume Claims (PVCs)**.  
- **Scalable Deployment:** Easily scalable using Kubernetes features like Deployments and StatefulSets.  

---

## 🏐 Project Architecture

```plaintext
             +----------------+
             |  Frontend Pod  |
             |  (NodePort)    |
             +-------+--------+
                     |
               +-----v-----+
               |  Ingress  |
               +-----+-----+
               |           |
        +------v-----+ +---v------+
        |  Backend   | | Backend  |
        |  (Mongo)   | | (MySQL)  |
        +------+-----+ +-----+----+
               |              |
       +-------v-----+  +-----v------+
       | MongoDB Pod |  |  MySQL Pod |
       | (Stateful)  |  | (Stateful) |
       +-------------+  +------------+
```

---

## 📝 Setup Instructions

### 1️⃣ Start Minikube Cluster

Start the Minikube cluster to set up a local Kubernetes environment:

```bash
minikube start
```

### 2️⃣ Configure Docker to Use Minikube

Configure Docker to build images directly into the Minikube Docker daemon:

```bash
& minikube docker-env | Invoke-Expression  # For PowerShell
```

### 3️⃣ Build Docker Images

**Frontend:** Builds the frontend image.

```bash
cd frontend
docker build -t frontend-image .
```

**Backend:** Builds the backend image.

```bash
cd backend
docker build -t backend-image .
```

### 4️⃣ Deploy Kubernetes Resources

Deploy all Kubernetes configurations for the frontend, backend, databases, and ingress:

```bash
kubectl apply -f frontend-deployment.yaml  # Deploys the frontend service
kubectl apply -f backend-deployment.yaml   # Deploys the backend service
kubectl apply -f mongo-pv.yaml             # Creates Persistent Volumes for MongoDB
kubectl apply -f mysql-pv.yaml             # Creates Persistent Volumes for MySQL
kubectl apply -f mongodb-statefulset.yaml  # Deploys MongoDB StatefulSet
kubectl apply -f mysql-statefulset.yaml    # Deploys MySQL StatefulSet
kubectl apply -f ingress.yaml              # Configures Ingress routing
```

### 5️⃣ Initialize MongoDB Replica Set

Connect to the MongoDB primary pod and initialize the replica set:

```bash
kubectl exec -it mongodb-0 -- mongosh
```

Inside the Mongo shell, run:

```js
rs.initiate(
  {
    _id: "rs0",
    members: [
      { _id: 0, host: "mongodb-0.mongodb-service.default.svc.cluster.local:27017" },
      { _id: 1, host: "mongodb-1.mongodb-service.default.svc.cluster.local:27017" }
    ]
  }
);
```

### 6️⃣ Access the Application

Start the Minikube tunnel to expose services via the Ingress controller:

```bash
minikube tunnel
```

Access the application through `http://127.0.0.1/`

---

## 🌐 API Endpoints

| **Method** | **Endpoint**     | **Description**                 |
|------------|------------------|---------------------------------|
| `POST`     | `/api/mongo`     | Store text in **MongoDB**       |
| `POST`     | `/api/mysql`     | Store text in **MySQL**         |
| `GET`      | `/api/mongo`     | Fetch data from **MongoDB**     |
| `GET`      | `/api/mysql`     | Fetch data from **MySQL**       |

---

## 🎯 Key Learnings & Skills Demonstrated

- **Docker:** Built and optimized custom images for microservices.
- **Kubernetes:** Implemented Deployments, StatefulSets, Services, and Ingress Controllers.
- **Database Replication:** Configured MongoDB **Replica Set** for redundancy.
- **Persistent Storage:** Used **PVs** and **PVCs** to ensure data persistence.
- **Networking:** Managed secure and efficient traffic routing with Kubernetes **Ingress**.

---

## 📊 Future Improvements

- **CI/CD Pipeline:** Automate builds and deployments using GitHub Actions or Jenkins.
- **Advanced Monitoring:** Integrate tools like Prometheus and Grafana for real-time monitoring.
- **Cloud Deployment:** Deploy to cloud platforms like AWS, GCP, or Azure.
- **Database Replication for MySQL:** Implement master-slave replication for **MySQL**.
- **Security Enhancements:** Add SSL/TLS encryption and Role-Based Access Control (RBAC) for production.

---
