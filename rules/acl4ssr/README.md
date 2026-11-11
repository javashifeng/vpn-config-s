# ACL4SSR 规则快照

本目录是 [ACL4SSR](https://github.com/ACL4SSR/ACL4SSR) `master/Clash/` 规则碎片的 vendored 快照。`shadowrocket.conf` 通过本仓 raw URL 拉取这里的文件,不再直接引用上游地址。

- 快照日期:2026-11-11
- 上游 commit:`bdc102fc54ba`(2026-11-06,"[AutoUpdate] Update GFWList rules and mrs files")
- **请勿手改**:本目录是上游镜像;自定义增删一律放 `rules/ChinaDirect.list` / `rules/Reject.list`(手改唯一数据源)

## 权衡

自托管后不再跟随上游每日 AutoUpdate,换来的是规则集内容稳定、可审查、不受上游改名/删库影响。需要跟进上游时按下方步骤手动刷新快照。

## 更新方法

重新下载覆盖全部 9 个文件,并把本 README 的快照日期与上游 commit 更新为当次值:

```bash
cd rules/acl4ssr
for f in LocalAreaNetwork UnBan Apple BanAD BanProgramAD ChinaDomain ChinaMedia ChinaCompanyIp ChinaIp; do
  curl -sL -o "$f.list" "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/$f.list"
done
curl -sL "https://api.github.com/repos/ACL4SSR/ACL4SSR/commits/master" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['sha'][:12], d['commit']['committer']['date'])"
```

更新后必须 commit 并 push 到 `main`,否则设备端 raw URL 拉到的仍是旧版。
