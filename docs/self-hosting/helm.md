---
sidebar_position: 1
title: Helm Chart Installation
description: Deploy CollabOps on Kubernetes using Helm charts
---

# CollabOps Helm Chart Installation

Deploy CollabOps on your Kubernetes cluster using our official Helm chart for production-ready, scalable installations.

## 📋 Prerequisites

### Kubernetes Cluster
- **Kubernetes**: Version 1.20 or higher
- **Helm**: Version 3.8 or higher
- **Storage**: Dynamic volume provisioning (recommended)
- **Ingress Controller**: NGINX or Traefik (for external access)

### System Requirements
- **CPU**: Minimum 2 cores, recommended 4+ cores
- **Memory**: Minimum 4GB RAM, recommended 8GB+ RAM
- **Storage**: 20GB+ persistent storage
- **Network**: HTTPS/TLS termination capability

### Prerequisites Check

```bash
# Check Kubernetes version
kubectl version --short

# Check Helm version
helm version --short

# Verify cluster access
kubectl cluster-info

# Check available storage classes
kubectl get storageclass
```

## 🚀 Quick Installation

### 1. Add Helm Repository

```bash
# Add CollabOps Helm repository
helm repo add collabops https://charts.collabops.ai

# Update repository
helm repo update

# Verify repository
helm search repo collabops
```

### 2. Create Namespace

```bash
# Create dedicated namespace
kubectl create namespace collabops

# Set as default namespace (optional)
kubectl config set-context --current --namespace=collabops
```

### 3. Install with Default Values

```bash
# Install CollabOps with default settings
helm install collabops collabops/collabops \
  --namespace collabops \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=collabops.yourdomain.com
```

### 4. Verify Installation

```bash
# Check deployment status
kubectl get pods -n collabops

# Check services
kubectl get services -n collabops

# Check ingress
kubectl get ingress -n collabops
```

## ⚙️ Configuration

### Custom Values File

Create a `values.yaml` file for customization:

```yaml
# values.yaml
global:
  domain: collabops.yourdomain.com
  environment: production

# Application configuration
app:
  image:
    repository: collabops/collabops
    tag: "latest"
    pullPolicy: IfNotPresent
  
  replicas: 2
  
  resources:
    requests:
      cpu: 500m
      memory: 1Gi
    limits:
      cpu: 2
      memory: 4Gi

# Database configuration
database:
  type: postgresql
  postgresql:
    enabled: true
    auth:
      postgresPassword: "your-secure-password"
      database: collabops
    primary:
      persistence:
        enabled: true
        size: 10Gi

# Redis configuration (for caching)
redis:
  enabled: true
  auth:
    enabled: true
    password: "your-redis-password"

# Ingress configuration
ingress:
  enabled: true
  className: "nginx"
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: collabops.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: collabops-tls
      hosts:
        - collabops.yourdomain.com

# Persistence
persistence:
  enabled: true
  storageClass: ""  # Use default storage class
  size: 20Gi
  accessMode: ReadWriteOnce

# Environment variables
env:
  - name: NODE_ENV
    value: "production"
  - name: LOG_LEVEL
    value: "info"

# Secrets (for sensitive data)
secrets:
  jwt_secret: "your-jwt-secret-key"
  encryption_key: "your-encryption-key"
```

### Install with Custom Values

```bash
# Install with custom configuration
helm install collabops collabops/collabops \
  --namespace collabops \
  --values values.yaml

# Or upgrade existing installation
helm upgrade collabops collabops/collabops \
  --namespace collabops \
  --values values.yaml
```

## 🔒 Security Configuration

### TLS/SSL Setup

#### Option 1: Cert-Manager (Recommended)

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@yourdomain.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

#### Option 2: Manual Certificate

```bash
# Create TLS secret manually
kubectl create secret tls collabops-tls \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key \
  --namespace collabops
```

### Network Policies

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: collabops-network-policy
  namespace: collabops
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: collabops
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: collabops
    ports:
    - protocol: TCP
      port: 5432  # PostgreSQL
    - protocol: TCP
      port: 6379  # Redis
```

## 📊 Monitoring & Observability

### Prometheus Integration

```yaml
# In values.yaml
serviceMonitor:
  enabled: true
  namespace: monitoring
  labels:
    release: prometheus

metrics:
  enabled: true
  port: 9090
  path: /metrics
```

### Grafana Dashboard

```bash
# Import CollabOps dashboard
kubectl create configmap collabops-dashboard \
  --from-file=dashboard.json \
  --namespace monitoring
```

### Health Checks

```yaml
# Health check configuration
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## 🔄 Backup & Recovery

### Database Backup

```bash
# Create backup job
cat <<EOF | kubectl apply -f -
apiVersion: batch/v1
kind: CronJob
metadata:
  name: collabops-db-backup
  namespace: collabops
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            command:
            - /bin/bash
            - -c
            - |
              pg_dump -h postgresql -U postgres collabops > /backup/collabops-\$(date +%Y%m%d).sql
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgresql-secret
                  key: postgres-password
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: backup-pvc
          restartPolicy: OnFailure
EOF
```

### Persistent Volume Backup

```bash
# Create volume snapshot
kubectl create -f - <<EOF
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: collabops-data-snapshot-$(date +%Y%m%d)
  namespace: collabops
spec:
  source:
    persistentVolumeClaimName: collabops-data
EOF
```

## 🛠️ Maintenance

### Updating CollabOps

```bash
# Update Helm repository
helm repo update

# Check available versions
helm search repo collabops/collabops --versions

# Upgrade to latest version
helm upgrade collabops collabops/collabops \
  --namespace collabops \
  --values values.yaml

# Rollback if needed
helm rollback collabops 1 --namespace collabops
```

### Scaling

```bash
# Scale application pods
kubectl scale deployment collabops \
  --replicas=3 \
  --namespace collabops

# Or update via Helm
helm upgrade collabops collabops/collabops \
  --namespace collabops \
  --set app.replicas=3
```

### Resource Monitoring

```bash
# Check resource usage
kubectl top pods -n collabops
kubectl top nodes

# Check persistent volume usage
kubectl get pv
kubectl describe pvc -n collabops
```

## 🚨 Troubleshooting

### Common Issues

#### Pods Not Starting

```bash
# Check pod logs
kubectl logs -n collabops deployment/collabops

# Check pod events
kubectl describe pod -n collabops <pod-name>

# Check resource constraints
kubectl get events -n collabops --sort-by='.lastTimestamp'
```

#### Database Connection Issues

```bash
# Test database connectivity
kubectl run --rm -i --tty debug \
  --image=postgres:15 \
  --restart=Never \
  --namespace collabops \
  -- psql -h postgresql -U postgres

# Check database pod status
kubectl get pods -n collabops -l app.kubernetes.io/name=postgresql
```

#### Ingress Issues

```bash
# Check ingress controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Verify ingress configuration
kubectl describe ingress -n collabops collabops

# Test internal service
kubectl port-forward -n collabops service/collabops 8080:3000
```

### Debug Mode

```bash
# Enable debug mode
helm upgrade collabops collabops/collabops \
  --namespace collabops \
  --set env[0].name=LOG_LEVEL \
  --set env[0].value=debug \
  --reuse-values
```

## 📋 Uninstallation

```bash
# Uninstall CollabOps
helm uninstall collabops --namespace collabops

# Remove namespace (optional)
kubectl delete namespace collabops

# Remove PVCs (if needed)
kubectl delete pvc --all -n collabops
```

## 🔗 Related Documentation

- **[Getting Started](/docs/getting-started)** - Initial setup and configuration
- **[API Authentication](/docs/api/authentication)** - API access configuration
- **[Docker Installation](/docs/self-hosting/docker)** - Alternative Docker setup
- **[Configuration Reference](/docs/self-hosting/configuration)** - Advanced configuration options

---

**Need help?** Join our [community discussions](https://github.com/collabops/collabops/discussions) or check our [troubleshooting guide](/docs/faq). 