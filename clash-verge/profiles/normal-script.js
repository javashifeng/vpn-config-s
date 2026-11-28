// Define main function (script entry)

// 从 url-test 组里剔除的节点（正则，按需追加，如 荷兰|爱沙尼亚|德国|英国）
const EXCLUDE = /荷兰|爱沙尼亚|德国|英国/;

function main(config, profileName) {
  for (const group of config["proxy-groups"] || []) {
    if (group.type === "url-test" && Array.isArray(group.proxies)) {
      group.proxies = group.proxies.filter((name) => !EXCLUDE.test(name));
    }
  }
  return config;
}
