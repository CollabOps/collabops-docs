---
sidebar_position: 1
title: Helm 설치 가이드
description: Kubernetes 환경에서 CollabOps 설치
---

# Helm 설치 가이드

Kubernetes 클러스터에 CollabOps를 Helm으로 설치하는 방법입니다.

## 📋 사전 요구사항

```yaml
시스템_요구사항:
  kubernetes: ">= 1.20"
  helm: ">= 3.8"
  node_count: ">= 3"
  total_cpu: ">= 8 cores"
  total_memory: ">= 16GB"
  storage: ">= 100GB SSD"
```

## 🚀 설치 과정

### 1. Helm Repository 추가
```bash
helm repo add collabops https://charts.collabops.ai
helm repo update
```

### 2. 설정 파일 생성
```yaml
# values.yaml
global:
  domain: "collabops.example.com"
  
database:
  enabled: true
  postgresql:
    auth:
      password: "your-secure-password"
      
redis:
  enabled: true
  auth:
    password: "your-redis-password"
    
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
```

### 3. 설치 실행
```bash
helm install collabops collabops/collabops \
  --namespace collabops \
  --create-namespace \
  --values values.yaml
```

### 4. 상태 확인
```bash
kubectl get pods -n collabops
kubectl get ingress -n collabops
```

## 🔧 설정 옵션

### 고가용성 구성
```yaml
replicaCount: 3
autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  
database:
  replication:
    enabled: true
    readReplicas: 2
```

### 보안 설정
```yaml
security:
  tls:
    enabled: true
  networkPolicy:
    enabled: true
  podSecurityPolicy:
    enabled: true
```

---

**다음 단계**: [Kubernetes 요구사항](/installation/onpremise/kubernetes-requirements) 