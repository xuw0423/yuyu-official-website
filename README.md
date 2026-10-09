# 昱宇科技企业官网

北京昱宇科技企业官网：专业音响、舞台灯光、LED 高清显示屏租赁服务展示站。

技术栈为**纯静态站点**（HTML / CSS / JavaScript），无需 Node 构建，适合直接部署到云服务器 Nginx / 宝塔 / OSS + CDN。

## 页面结构

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | Banner 轮播、业务简介、实力数据、优势、场景、案例、咨询引导 |
| 关于我们 | `about.html` | 公司简介、实力、理念、服务范围 |
| 设备中心 | `equipment.html` | 音响 / 灯光 / LED 屏清单与规格 |
| 项目案例 | `cases.html` | 分类筛选案例列表 |
| 服务优势 | `advantages.html` | 四重合作保障 |
| 服务流程 | `process.html` | 六步闭环 + 报价模式 |
| 应用场景 | `scenarios.html` | 六类活动场景 |
| 联系我们 | `contact.html` | 联系方式 + 在线询盘表单 |

文案与 SEO Meta 均按 `docs/昱宇科技网站构架.docx` 落地。

## 本地预览

任意静态服务器即可，例如：

```bash
cd yuyu-official-website
python3 -m http.server 8080
```

浏览器打开：http://127.0.0.1:8080

或使用 VS Code / Cursor 的 Live Server 打开 `index.html`。

## 媒体说明（占位素材）

当前图片来自 [Unsplash](https://unsplash.com/)，视频来自 [Pexels](https://www.pexels.com/)，仅作演示占位。正式上线前请替换为：

- 公司现场实拍 / 案例相册
- 自有设备实拍
- 品牌主视觉与宣传视频

替换方式：直接改各 HTML 中的图片 / 视频 URL，或下载到 `public/` 后改为本地路径。

## 询盘表单（管理员如何收到）

用户在「联系我们」提交后，会**自动发到管理员邮箱**；也可选配推送到微信。

配置文件：`js/form-config.js`

### 1. 邮箱（已默认接入 FormSubmit）

1. 用网站随便提交一次测试询盘  
2. 打开管理员邮箱 `584538661@qq.com`，找到 FormSubmit 发来的**激活确认邮件**并点击确认  
3. 之后每次提交都会自动发到该邮箱（无需访客打开邮件客户端）

如需改收件人，同时修改 `adminEmail` 与 `formSubmitEndpoint` 里的邮箱地址。

### 2. 微信推送（可选，二选一或都开）

**方案 A：个人微信（PushPlus）**

1. 打开 https://www.pushplus.plus ，微信扫码登录  
2. 在「一对一推送」复制自己的 `token`  
3. 填入 `js/form-config.js` 的 `pushPlusToken`

**方案 B：企业微信群机器人**

1. 企业微信建群 → 群设置 → 群机器人 → 添加 → 复制 Webhook  
2. 填入 `js/form-config.js` 的 `wecomWebhook`

> 个人微信无法由网页“直接发私聊”，必须通过 PushPlus / 企业微信机器人这类中转服务。

## 云服务器部署

本站是纯静态文件，**不需要安装 Node、npm、数据库**。二选一即可。

### 方案 A：直接用 Nginx（最简单，推荐）

服务器上通常只装一个 Nginx：

```bash
# Ubuntu / Debian
sudo apt update && sudo apt install -y nginx

# CentOS / Rocky
sudo yum install -y nginx
```

上传网站目录到服务器，例如 `/var/www/yuyu-official-website/`，然后：

```bash
sudo cp nginx.conf.example /etc/nginx/conf.d/yuyu.conf
sudo vim /etc/nginx/conf.d/yuyu.conf   # 改 server_name、root
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx
```

开放安全组 / 防火墙的 `80`（以及 HTTPS 的 `443`）即可。

### 方案 B：Docker（环境更统一，适合已有 Docker 的机器）

服务器需先安装 Docker + Docker Compose（装一次即可）。之后在项目目录执行：

```bash
# 构建并后台启动（默认映射宿主机 80 端口）
docker compose up -d --build

# 查看状态
docker compose ps

# 看日志
docker compose logs -f

# 更新代码后重新发布
docker compose up -d --build

# 停止
docker compose down
```

浏览器访问：`http://服务器IP`

若 80 端口被占用，可改 `docker-compose.yml` 里的端口，例如 `"8080:80"`，再访问 `http://服务器IP:8080`。

#### 什么时候用 Docker 更好？

| | 直接 Nginx | Docker |
|--|--|--|
| 要装的东西 | 只装 Nginx | 要装 Docker |
| 配置量 | 改一份 nginx 配置 | 基本不用改 |
| 适合场景 | 单机官网、宝塔面板 | 多项目共存、想一键启停 |

对这个官网来说，**两种都行**；没有 Docker 经验就用方案 A，已经在用 Docker 就用方案 B。

### 域名与 HTTPS（两种方案通用）

1. 域名 A 记录指向服务器 IP  
2. 证书可用 Let’s Encrypt（`certbot`）或宝塔一键申请  
3. 记得把页脚备案号改成真实 ICP 号  

### 1. 上传网站文件

将整个项目目录上传到服务器，例如：

```text
/var/www/yuyu-official-website/
```

可用 `scp`、`rsync`、宝塔面板「文件」上传，或 Git 拉取：

```bash
# 示例：rsync
rsync -avz --exclude '.git' --exclude 'docs' ./ user@你的服务器IP:/var/www/yuyu-official-website/
```

### 2. 宝塔面板（可选）

1. 新建网站 → 填写域名 → 根目录指向项目目录  
2. 默认文档设为 `index.html`  
3. 申请 SSL 证书并开启强制 HTTPS  
4. 按需开启 Gzip

## 上线前建议检查

- [ ] 替换占位图片 / 视频为真实素材  
- [ ] 将页脚 `京 ICP 备 XXXX 号` 改为真实备案号  
- [ ] 确认电话、微信、邮箱、地址无误（含 `js/form-config.js`）  
- [ ] 配置正式域名与 HTTPS  
- [ ] 手机端逐页检查导航、轮播、表单  
- [ ] 询盘表单首次提交后完成 FormSubmit 邮箱激活  

## 目录结构

```text
yuyu-official-website/
├── index.html
├── about.html
├── equipment.html
├── cases.html
├── advantages.html
├── process.html
├── scenarios.html
├── contact.html
├── css/main.css
├── js/main.js
├── js/form-config.js
├── public/favicon.svg
├── Dockerfile
├── docker-compose.yml
├── nginx.docker.conf
├── nginx.conf.example
├── docs/昱宇科技网站构架.docx
└── README.md
```

## 联系信息（需求文档）

- 电话 / 微信：159-1023-9102  
- 邮箱：584538661@qq.com  
- 地址：北京市朝阳区十里河新华国际广场A1201  
