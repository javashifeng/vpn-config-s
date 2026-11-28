// Clash Verge 全局规则增强，Normal 和 OAuth 订阅都会应用。

const FALLBACK_FILTER_DOMAINS = ["+.jianguoyun.com", "+.dav.jianguoyun.com"];
const FAKE_IP_FILTER = ["+.dtzhejiang.com"];

const DFW_SOCKS_PROXY = {
  name: "dfw-socks",
  type: "socks5",
  server: "127.0.0.1",
  port: 1080,
  udp: false,
};

// OpenSSH 动态 SOCKS 只支持 TCP。先拒绝 Claude / ChatGPT / Groq / Grok 的 QUIC/UDP，
// 浏览器会降级到 HTTP/2 或 HTTP/1.1，再通过 dfw-socks 连接。
const DFW_RULES = [
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,groq.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,grok.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,x.ai)),REJECT",
  "DOMAIN-SUFFIX,groq.com,dfw-socks",
  "DOMAIN-SUFFIX,grok.com,dfw-socks",
  "DOMAIN-SUFFIX,x.ai,dfw-socks",

  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,anthropic.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,claude.ai)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,claude.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,claudeusercontent.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,openai.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,chatgpt.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,oaistatic.com)),REJECT",
  "AND,((NETWORK,UDP),(DOMAIN-SUFFIX,oaiusercontent.com)),REJECT",

  "DOMAIN-SUFFIX,anthropic.com,dfw-socks",
  "DOMAIN-SUFFIX,claude.ai,dfw-socks",
  "DOMAIN-SUFFIX,claude.com,dfw-socks",
  "DOMAIN-SUFFIX,claudeusercontent.com,dfw-socks",
  "DOMAIN,servd-anthropic-website.b-cdn.net,dfw-socks",
  "DOMAIN-SUFFIX,openai.com,dfw-socks",
  "DOMAIN-SUFFIX,chatgpt.com,dfw-socks",
  "DOMAIN-SUFFIX,oaistatic.com,dfw-socks",
  "DOMAIN-SUFFIX,oaiusercontent.com,dfw-socks",
];

// 本机网络与公司环境所需的既有直连规则。
const PREPEND_RULES = [
  // CLIProxyAPI VPS 直连，避免访问代理入口时再次绕进 Clash 代理链。
  "IP-CIDR,216.128.134.241/32,DIRECT,no-resolve",
  "DST-PORT,22,DIRECT",
  "PROCESS-NAME,ssh,DIRECT",
  "DOMAIN-SUFFIX,dtzhejiang.com,DIRECT",
  "DOMAIN-SUFFIX,deepseek.com,DIRECT",
  "DOMAIN-SUFFIX,minimaxi.com,DIRECT",
  "DOMAIN-SUFFIX,dingtalkapps.com,DIRECT",
  "DOMAIN-KEYWORD,dingtalk,DIRECT",
  "DOMAIN-SUFFIX,qq.com,DIRECT",
  "DOMAIN-KEYWORD,workbuddy.cn,DIRECT",
  "DOMAIN-SUFFIX,yuque.com,DIRECT",
  "IP-CIDR,192.168.43.12/32,DIRECT,no-resolve",
  "IP-CIDR,192.168.43.116/32,DIRECT,no-resolve",
  "IP-CIDR,192.168.46.50/32,DIRECT,no-resolve",
  "IP-CIDR,192.168.40.217/32,DIRECT,no-resolve",
  "IP-CIDR,192.168.40.195/32,DIRECT,no-resolve",
  "IP-CIDR,8.154.32.210/32,DIRECT,no-resolve",
  "IP-CIDR,120.26.111.83/32,DIRECT,no-resolve",
  "IP-CIDR,116.62.86.31/32,DIRECT,no-resolve",
  "IP-CIDR,8.149.137.11/32,DIRECT,no-resolve",
  "IP-CIDR,8.149.143.77/32,DIRECT,no-resolve",
  "IP-CIDR,8.136.33.115/32,DIRECT,no-resolve",
  "IP-CIDR,8.154.36.50/32,DIRECT,no-resolve",
  "IP-CIDR,8.149.244.224/32,DIRECT,no-resolve",
  "IP-CIDR,47.110.139.98/32,DIRECT,no-resolve",
  "IP-CIDR,8.154.44.222/32,DIRECT,no-resolve",
  "IP-CIDR,47.99.206.114/32,DIRECT,no-resolve",
  "IP-CIDR,47.98.174.164/32,DIRECT,no-resolve",
  "IP-CIDR,47.110.154.132/32,DIRECT,no-resolve",
  "IP-CIDR,121.43.210.231/32,DIRECT,no-resolve",
  "IP-CIDR,47.96.174.236/32,DIRECT,no-resolve",
  "IP-CIDR,47.98.158.234/32,DIRECT,no-resolve",
  "IP-CIDR,8.154.19.15/32,DIRECT,no-resolve",
];

function appendUnique(list, items) {
  const result = Array.isArray(list) ? list : [];
  for (const item of items) {
    if (!result.includes(item)) result.push(item);
  }
  return result;
}

function main(config, profileName) {
  config.proxies = [
    DFW_SOCKS_PROXY,
    ...(config.proxies || []).filter((proxy) => proxy.name !== DFW_SOCKS_PROXY.name),
  ];

  config.rules = [
    ...DFW_RULES,
    ...PREPEND_RULES,
    ...(config.rules || []).filter(
      (rule) => !DFW_RULES.includes(rule) && !PREPEND_RULES.includes(rule),
    ),
  ];

  const dns = (config.dns = config.dns || {});
  dns["fallback-filter"] = dns["fallback-filter"] || {};
  dns["fallback-filter"].domain = appendUnique(
    dns["fallback-filter"].domain,
    FALLBACK_FILTER_DOMAINS,
  );
  dns["fake-ip-filter"] = appendUnique(dns["fake-ip-filter"], FAKE_IP_FILTER);
  return config;
}
