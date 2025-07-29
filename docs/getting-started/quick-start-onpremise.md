---
sidebar_position: 2
title: 빠른 시작 (온프레미스 설치형)
description: 온프레미스 환경에서 CollabOps 설치 및 설정
---

# 빠른 시작 (온프레미스 설치형)

온프레미스 설치는 완전한 데이터 제어와 보안이 필요한 조직에 적합합니다.

## 📋 사전 요구사항

### 시스템 요구사항
- **OS**: Ubuntu 20.04 LTS, CentOS 8, RHEL 8 이상
- **CPU**: 최소 4 cores (권장 8 cores)
- **메모리**: 최소 8GB RAM (권장 16GB)
- **저장소**: 최소 100GB SSD (권장 500GB)
- **네트워크**: 인터넷 연결 (초기 설정용)

### 필수 소프트웨어
- **Docker**: 20.10 이상
- **Kubernetes**: 1.20 이상 (선택사항)
- **Helm**: 3.7 이상 (Kubernetes 사용 시)
- **PostgreSQL**: 13 이상
- **Redis**: 6.0 이상

## 🚀 설치 방법

### 옵션 1: Docker Compose (개발/테스트용)

```bash
# 1. CollabOps 다운로드
curl -O https://releases.collabops.ai/latest/docker-compose.yml
curl -O https://releases.collabops.ai/latest/.env.example

# 2. 환경 변수 설정
cp .env.example .env
nano .env  # 필요한 값들 설정

# 3. 실행
docker-compose up -d

# 4. 상태 확인
docker-compose ps
```

**환경 변수 설정 예시:**
```bash
# .env 파일
POSTGRES_HOST=localhost
POSTGRES_DB=collabops
POSTGRES_USER=collabops
POSTGRES_PASSWORD=secure-password

REDIS_URL=redis://localhost:6379

# 외부 접근 도메인
DOMAIN=collabops.yourcompany.com

# 이메일 설정 (선택사항)
SMTP_HOST=smtp.yourcompany.com
SMTP_PORT=587
SMTP_USER=notifications@yourcompany.com
SMTP_PASSWORD=smtp-password
```

### 옵션 2: Helm Chart (프로덕션 권장)

```bash
# 1. Helm 레포지토리 추가
helm repo add collabops https://helm.collabops.ai
helm repo update

# 2. 네임스페이스 생성
kubectl create namespace collabops

# 3. 설정 파일 생성
cat > values.yaml << EOF
global:
  domain: collabops.yourcompany.com
  
database:
  host: postgres.yourcompany.com
  name: collabops
  user: collabops
  password: "your-secure-password"

redis:
  host: redis.yourcompany.com

storage:
  size: 100Gi
  storageClass: fast-ssd

ingress:
  enabled: true
  className: nginx
  tls:
    enabled: true
    secretName: collabops-tls
EOF

# 4. 설치
helm install collabops collabops/collabops \
  --namespace collabops \
  --values values.yaml

# 5. 상태 확인
kubectl get pods -n collabops
```

### 옵션 3: 바이너리 설치 (단일 서버)

```bash
# 1. 바이너리 다운로드
wget https://releases.collabops.ai/latest/collabops-linux-amd64.tar.gz
tar -xzf collabops-linux-amd64.tar.gz

# 2. 설정 파일 생성
./collabops init

# 3. 데이터베이스 마이그레이션
./collabops migrate

# 4. 서비스 시작
./collabops start --port=8080
```

## ⚙️ 초기 설정

### 1. 관리자 계정 생성
```bash
# Docker Compose 사용 시
docker-compose exec collabops collabops admin create \
  --email admin@yourcompany.com \
  --password "secure-password" \
  --name "System Admin"

# Kubernetes 사용 시
kubectl exec -n collabops deployment/collabops -- \
  collabops admin create \
  --email admin@yourcompany.com \
  --password "secure-password" \
  --name "System Admin"

# 바이너리 설치 시
./collabops admin create \
  --email admin@yourcompany.com \
  --password "secure-password" \
  --name "System Admin"
```

### 2. 라이선스 등록
1. 웹 브라우저에서 `https://your-collabops-domain.com` 접속
2. 관리자 계정으로 로그인
3. **Settings → License** 메뉴에서 라이선스 키 입력

### 3. 기본 설정
- **이메일 서버 설정**: SMTP 구성
- **외부 인증 연동**: LDAP, SSO 설정
- **Git 저장소 연결**: 내부 GitLab, Gitea 등
- **백업 정책 설정**: 자동 백업 스케줄

## 🔒 보안 설정

### SSL/TLS 인증서
```bash
# Let's Encrypt 사용 시
certbot certonly --webroot \
  -w /var/www/html \
  -d collabops.yourcompany.com

# 인증서 경로를 설정 파일에 반영
echo "TLS_CERT_PATH=/etc/letsencrypt/live/collabops.yourcompany.com/fullchain.pem" >> .env
echo "TLS_KEY_PATH=/etc/letsencrypt/live/collabops.yourcompany.com/privkey.pem" >> .env
```

### 방화벽 설정
```bash
# 필요한 포트만 오픈
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (리다이렉션용)
ufw allow 443/tcp   # HTTPS
ufw allow from 10.0.0.0/8 to any port 5432  # 내부 DB 접근
ufw enable
```

### 데이터베이스 보안
```sql
-- PostgreSQL 보안 설정
CREATE USER collabops WITH ENCRYPTED PASSWORD 'secure-password';
CREATE DATABASE collabops OWNER collabops;
GRANT ALL PRIVILEGES ON DATABASE collabops TO collabops;

-- 네트워크 접근 제한 (/etc/postgresql/13/main/pg_hba.conf)
host    collabops    collabops    10.0.0.0/8    md5
```

## 📊 모니터링 및 로깅

### 헬스 체크
```bash
# 서비스 상태 확인
curl https://collabops.yourcompany.com/health

# 데이터베이스 연결 확인
curl https://collabops.yourcompany.com/health/db

# Redis 연결 확인
curl https://collabops.yourcompany.com/health/redis
```

### 로그 확인
```bash
# Docker Compose
docker-compose logs -f collabops

# Kubernetes
kubectl logs -n collabops deployment/collabops -f

# 바이너리 설치
tail -f /var/log/collabops/app.log
```

### Prometheus 메트릭
CollabOps는 `/metrics` 엔드포인트에서 Prometheus 형식의 메트릭을 제공합니다:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'collabops'
    static_configs:
      - targets: ['collabops.yourcompany.com:8080']
    metrics_path: '/metrics'
```

## 🔄 업데이트 및 백업

### 백업
```bash
# 데이터베이스 백업
pg_dump collabops > backup_$(date +%Y%m%d).sql

# 파일 백업 (Git 저장소, 업로드 파일 등)
tar -czf files_backup_$(date +%Y%m%d).tar.gz /var/lib/collabops/

# 설정 파일 백업
cp -r /etc/collabops/ backup_config_$(date +%Y%m%d)/
```

### 업데이트
```bash
# Helm Chart 업데이트
helm upgrade collabops collabops/collabops \
  --namespace collabops \
  --values values.yaml

# Docker Compose 업데이트
docker-compose pull
docker-compose up -d

# 바이너리 업데이트
wget https://releases.collabops.ai/latest/collabops-linux-amd64.tar.gz
tar -xzf collabops-linux-amd64.tar.gz
systemctl stop collabops
cp collabops /usr/local/bin/
systemctl start collabops
```

## 🚨 고가용성 (HA) 구성

### 로드 밸런서 설정
```nginx
# nginx.conf
upstream collabops_backend {
    server collabops-1.internal:8080;
    server collabops-2.internal:8080;
    server collabops-3.internal:8080;
}

server {
    listen 443 ssl;
    server_name collabops.yourcompany.com;
    
    location / {
        proxy_pass http://collabops_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 데이터베이스 복제
```bash
# PostgreSQL Primary-Secondary 설정
# Primary 서버
echo "wal_level = replica" >> /etc/postgresql/13/main/postgresql.conf
echo "max_wal_senders = 3" >> /etc/postgresql/13/main/postgresql.conf

# Secondary 서버
pg_basebackup -h primary-db.internal -D /var/lib/postgresql/13/main -U replicator -v -P
```

## 🆘 문제 해결

### 자주 발생하는 문제

#### 데이터베이스 연결 실패
- **증상**: `database connection failed` 오류
- **해결**: 
  - 데이터베이스 서비스 상태 확인
  - 연결 정보 검증
  - 방화벽 설정 확인

#### 메모리 부족
- **증상**: 서비스 응답 지연, OOM 에러
- **해결**:
  - 시스템 리소스 모니터링
  - 메모리 할당량 조정
  - 인스턴스 스케일업

#### SSL 인증서 오류
- **증상**: HTTPS 연결 실패
- **해결**:
  - 인증서 유효성 확인
  - 인증서 갱신
  - DNS 설정 확인

### 성능 튜닝
```bash
# PostgreSQL 튜닝
shared_buffers = 256MB
effective_cache_size = 1GB
random_page_cost = 1.1

# Redis 튜닝
maxmemory 512mb
maxmemory-policy allkeys-lru
```

## 📞 지원 받기

### 엔터프라이즈 지원
- **[온프레미스 설치 가이드](/installation/onpremise/helm-guide)** - 상세 설치 문서
- **[보안 설정 가이드](/security/network-configuration)** - 보안 강화 방법
- **[엔터프라이즈 지원](/support/enterprise-channel)** - 전문 기술 지원

### 커뮤니티 지원
- **[GitHub Issues](https://github.com/collabops/collabops/issues)** - 기술 문의
- **[Discord 커뮤니티](/support/community)** - 실시간 질문

---

**다음 단계**: [워크스페이스 만들기](/getting-started/create-workspace) 