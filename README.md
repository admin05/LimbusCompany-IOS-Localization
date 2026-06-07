<h1 align="center">LimbusCompany-IOS-Localization</h1>
<p align="center">
  边狱公司 IOS客户端 中文本地化
</p>
<p align="center">
  <a href=https://github.com/admin05/LimbusCompany-IOS-Localization><img src="https://img.shields.io/github/v/release/ghcruise/LimbusCompany-IOS-Localization?label=Upstream%20Version&style=for-the-badge" /></a>
  <a href=https://creativecommons.org/licenses/by-nc-sa/4.0><img src="https://img.shields.io/badge/Licence-CC_BY--NC--SA_4.0-blue?style=for-the-badge" /></a>
  <a href="https://t.me/+EqcZfY8aKAo1ZWE1"><img src="https://img.shields.io/badge/Telegram-group-blue?style=for-the-badge&logo=telegram&logoColor=white" /></a>
</p>
<p align="center">
  <a href=https://github.com/ghcruise/LimbusCompany-IOS-Localization><img src="https://img.shields.io/github/stars/ghcruise/LimbusCompany-IOS-Localization?label=Upstream%20Stars&logo=github&color=CD7F32&style=for-the-badge" /></a>
</p>

边狱公司 iOS 客户端中文本地化配置。本仓库提供可直接导入 Loon 的插件文件，不再依赖 Script-Hub 在线转换。

## 说明

- **前提：有其他代理工具（如Shadowrocket、Stash、~~Surge~~等）**
  - 如果您所在的地区有通畅的国际互联网连接，可以使用 Shadowrocket ，无需节点  
- 汉化资源来自 [LocalizeLimbusCompany](https://github.com/LocalizeLimbusCompany/LocalizeLimbusCompany)，遵循 [**CC BY-NC-SA 4.0 协议**](https://creativecommons.org/licenses/by-nc-sa/4.0/)   
- 包含战斗气泡，文本来自 [Bilibili调爪](https://space.bilibili.com/485880984)
- 关键词彩色高亮
- 剧情故事中的人物名和称号**完全汉化**
- 本项目实现的是对游戏内**日语**替换，因此选择**日语**才可以看到汉化效果。同样地，可以参考下文 [详细原理](#原理简介) 实现对韩语或英语的替换，同样可以达到本项目的效果
- 由于IOS客户端字库限制，本项目在尽可能保留原意的前提下对汉化资源中的部分简体文本进行了替换  

本仓库基于 [ghcruise/LimbusCompany-IOS-Localization](https://github.com/ghcruise/LimbusCompany-IOS-Localization) 整理，感谢原作者 ghcruise 对 iOS 汉化方案、代理配置和资源分发方式的工作。

汉化资源来自 [LocalizeLimbusCompany/LocalizeLimbusCompany](https://github.com/LocalizeLimbusCompany/LocalizeLimbusCompany)，并遵循 `CC BY-NC-SA 4.0` 协议。请仅在协议允许的范围内使用。

## 是否依赖原项目

当前配置不依赖原项目的 release 下载地址。Loon 插件会把游戏请求重定向到本仓库中的文件：

- `manifest.json`
- `localize_jp.zip`

因此，本仓库必须保持公开，并且上述两个文件必须保留在 `main` 分支根目录。只要这两个文件存在，Loon 插件就不需要通过 Script-Hub，也不需要访问原项目 release。

## Loon 一键导入

安装并信任 MitM 证书后，点击下方链接导入：

[导入 Loon 插件](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Fadmin05%2FLimbusCompany-IOS-Localization%2Frefs%2Fheads%2Fmain%2FLimbusCompanyIOSLocalization.plugin)

也可以手动复制插件地址导入：

```text
https://raw.githubusercontent.com/admin05/LimbusCompany-IOS-Localization/refs/heads/main/LimbusCompanyIOSLocalization.plugin
```

## 插件文件区别

- `LimbusCompanyIOSLocalization.plugin`：正式版 Loon 插件，建议日常使用。
- `LimbusCompanyIOSLocalization-pre-release.plugin`：预发布版 Loon 插件。目前它和正式版使用相同的重写规则、相同的资源地址，区别只有插件名称和描述，方便以后单独测试预发布资源。

如果只是想玩汉化版，使用正式版即可。

## MitM 配置

需要在 Loon 中启用 HTTPS MitM，并安装、信任 Loon 生成的 CA 证书。

插件会声明需要 MitM 的域名：

```text
*.limbuscompanycdn.org
```

## 工作原理

插件拦截游戏客户端请求的日语本地化资源，并将其重定向到本仓库提供的中文本地化资源：

```text
localize_jp.zip -> 本仓库 localize_jp.zip
LocalizePatchInfo.json -> 本仓库 manifest.json
```

进入游戏后请在游戏内选择日语。首次生效时，游戏会重新下载本地化资源。

## 维护

如需从 Surge module 重新生成 Loon plugin，可运行：

```bash
node scripts/generate-loon-plugin.js
```

该脚本会从以下文件生成对应的 Loon 插件：

- `LimbusCompanyIOSLocalization.module`
- `LimbusCompanyIOSLocalization-pre-release.module`

本仓库还提供 GitHub Actions 自动同步上游更新：

- 工作流文件：`.github/workflows/sync-upstream.yml`
- 默认每天自动检查一次 `ghcruise/LimbusCompany-IOS-Localization`
- 也可以在 GitHub Actions 页面手动运行 `Sync upstream`

同步流程会合并上游 `main`，重新把运行时资源地址指向本仓库，并重新生成 Loon plugin。运行时 URL 审计失败时，工作流会中止，避免把依赖上游 release 或 Script-Hub 的配置推送出去。

## 致谢

- 感谢 [ghcruise/LimbusCompany-IOS-Localization](https://github.com/ghcruise/LimbusCompany-IOS-Localization) 提供 iOS 代理汉化方案与原始仓库结构。
- 感谢 [LocalizeLimbusCompany/LocalizeLimbusCompany](https://github.com/LocalizeLimbusCompany/LocalizeLimbusCompany) 提供汉化资源。

## 许可证

本仓库保留原项目许可证声明，详见 [LICENCE](./LICENCE)。
