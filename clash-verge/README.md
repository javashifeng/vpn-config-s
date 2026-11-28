# Clash Verge Rev 配置

macOS 上 Clash Verge Rev 的自定义增强配置快照，源目录：
`~/Library/Application Support/io.github.clash-verge-rev.clash-verge-rev/`

> **不入库**：订阅文件（`profiles/<uid>.yaml`，含节点明文密码）、生成的 `clash-verge.yaml`、
> 订阅 URL 中的 token（`profiles.yaml` 已脱敏为 `<REDACTED>`）。

## 文件对照

| 仓库文件 | 源文件 | 作用 |
|---|---|---|
| `profiles/global-merge.yaml` | `profiles/Merge.yaml` | 全局 Merge：TUN 排除 VM 子网、QUIC/TLS 嗅探 |
| `profiles/global-script.js` | `profiles/Script.js` | 全局 Script：dfw-socks 代理、AI 域名分流、直连规则 |
| `profiles/normal-merge.yaml` | `profiles/mulroReojQTS.yaml` | Normal 订阅 DNS（国内主 + 国外回退） |
| `profiles/normal-script.js` | `profiles/sX7sn18iJW5p.js` | Normal 订阅：url-test 组剔除指定地区节点 |
| `profiles/normal-rules.yaml` | `profiles/rqoYDZuJhliJ.yaml` | Normal 订阅：iCloud/Apple/Amazon 走代理 |
| `profiles/oauth-merge.yaml` | `profiles/m9X4t0DnOTl5.yaml` | OAuth 订阅 DNS（全部 Cloudflare DoH 经代理） |
| `profiles/oauth-script.js` | `profiles/sqDOaQB0hqyg.js` | OAuth 订阅脚本（空实现） |
| `profiles.yaml` | `profiles.yaml` | 订阅与增强文件绑定关系（URL 已脱敏） |
| `dns_config.yaml` | `dns_config.yaml` | Verge 内置 DNS 设置 |
| `verge.yaml` | `verge.yaml` | Verge 应用设置 |

还原时按上表复制回源目录，并在 `profiles.yaml` 中填回真实订阅 URL。
