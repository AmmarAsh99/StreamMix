# StreamMix V1

A full stack video streaming application built as a hands on DevOps learning project. The goal was not just to build an app — but to take it through the full lifecycle: containerization, CI/CD, Kubernetes deployment, GitOps, and observability the same workflow used in production environments.

---

## What I Built

**Backend — NestJS**

- User module — registration via `/user` endpoint
- Auth module — login with JWT token issuance via `/auth/login`
- Stream module — fetches video from source URL and pipes it as a stream to the client via `/stream`

**Frontend — Angular**

- Three standalone components: Sign Up, Sign In, and Stream page
- Route guards protecting the stream page using JWT
- Communicates with the backend via HTTP services

---

## DevOps Journey

### 1. Containerization

- Dockerized the NestJS backend and Angular frontend (served via Nginx)
- Used the official MySQL image
- Wrote optimized Dockerfiles with **multi-stage builds** and **layer caching** to reduce image size and improve build speed
- Orchestrated all containers using **Docker Compose**
- Configured **Docker Compose Watch** to sync local changes into running containers during development

### 2. CI/CD Pipeline — GitHub Actions

- Built a pipeline that builds Docker images, logs into Docker Hub, and pushes images on every merge to main
- Refactored into **parallel jobs** — frontend and backend build simultaneously, reducing pipeline execution time by ~70%
- Pipeline automatically updates image tags in the GitOps repository and commits the changes to trigger deployment

### 3. Kubernetes — Minikube

- Provisioned a local Kubernetes cluster using Minikube
- Wrote manifests for all workloads:
  - Deployments for NestJS, Angular, and MySQL
  - ClusterIP Services for internal communication
  - ConfigMaps for environment configuration
  - Secrets for sensitive credentials (encrypted)
- Configured an **Nginx Ingress Controller** with path-based routing:
  - `streammix.com` → Angular frontend
  - `streammix.com/api` → NestJS backend

### 4. GitOps — ArgoCD

- Implemented the **two-repo GitOps pattern**:
  - `StreamMix-V1` — application source code
  - `streammix-gitops` — Kubernetes manifests (separate repo)
- Configured ArgoCD to watch the GitOps repository as the **single source of truth**
- Any merge to main triggers the CI pipeline → updates image tags → ArgoCD detects the change → syncs the cluster automatically

### 5. Observability — Prometheus + Grafana

- Deployed the `kube-prometheus-stack` Helm chart into the cluster
- Configured Grafana dashboards for:
  - Real-time CPU and memory usage per pod
  - Pod health and restart counts
  - Node-level resource utilization

---

## Tech Stack

| Category            | Tool                     |
| ------------------- | ------------------------ |
| Backend             | NestJS                   |
| Frontend            | Angular                  |
| Database            | MySQL                    |
| Containerization    | Docker                   |
| Local Orchestration | Docker Compose           |
| Kubernetes          | Minikube + kubectl       |
| CI/CD               | GitHub Actions           |
| GitOps              | ArgoCD                   |
| Monitoring          | Prometheus + Grafana     |
| Ingress             | Nginx Ingress Controller |
| Registry            | Docker Hub               |

---

## What I Learned

- How Docker layer caching and multi-stage builds reduce image size and build time
- The difference between CI (build + test) and CD (deploy) and how to separate them cleanly
- Why the two repo GitOps pattern exists and how it gives you a clean audit trail of every deployment
- How Kubernetes Ingress routes external traffic internally using path based rules
- How Prometheus scrapes metrics and how Grafana visualizes them for real observability
- The full deployment loop: code change → pipeline → image → manifest update → ArgoCD sync → cluster

---

## What I Would Improve

- Add TLS certificate using cert-manager + Let's Encrypt for HTTPS
- Provision infrastructure using Terraform (IaC) instead of manual setup

---

## Author

**Ammar Alshari**
[GitHub](https://github.com/AmmarAlshari) · [LinkedIn](#)
