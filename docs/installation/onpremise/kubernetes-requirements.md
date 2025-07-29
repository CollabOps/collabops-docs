---
sidebar_position: 2
title: Kubernetes 요구사항
description: CollabOps 운영을 위한 Kubernetes 클러스터 요구사항
---

# Kubernetes 요구사항

CollabOps를 안정적으로 운영하기 위한 Kubernetes 환경 요구사항입니다.

## 🎯 최소 요구사항

### 클러스터 사양
```yaml
kubernetes_version: ">= 1.20"
nodes:
  master: 1개 (최소)
  worker: 2개 (최소)
  
node_specs:
  cpu: 4 cores (노드당)
  memory: 8GB (노드당)
  storage: 100GB SSD (노드당)
```

### 필수 컴포넌트
- **Container Runtime**: Docker, containerd, CRI-O
- **CNI Plugin**: Calico, Flannel, Weave
- **Ingress Controller**: NGINX, Traefik
- **Storage Class**: Dynamic provisioning 지원

## 🚀 권장 사양

### 프로덕션 환경
```yaml
권장_클러스터:
  master_nodes: 3개 (HA)
  worker_nodes: 5개 이상
  
노드_사양:
  cpu: 8+ cores
  memory: 16GB+
  storage: 500GB+ SSD
  network: 10Gbps
```

### 고가용성 구성
- **Control Plane**: 3개 마스터 노드
- **etcd**: 별도 클러스터 또는 외부 서비스
- **Load Balancer**: 다중 가용 영역 분산
- **Storage**: 복제된 스토리지 시스템

---

**다음 단계**: [보안 설정 가이드](/installation/onpremise/security-configuration) 