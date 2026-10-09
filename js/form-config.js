/**
 * 询盘表单通知配置
 *
 * 【邮箱】使用 FormSubmit（适合静态站，无需自建后端）
 * 首次提交后，请到 584538661@qq.com 查收确认邮件并点击激活，之后即可自动收信。
 *
 * 【微信】任选其一（填了才会推送）：
 * 1) PushPlus：https://www.pushplus.plus 微信扫码 → 一对一推送 → 复制 token
 * 2) 企业微信群机器人：群设置 → 机器人 → 添加 → 复制 Webhook 地址
 */
window.YUYU_FORM_CONFIG = {
  // 管理员邮箱（测试临时邮箱，上线前改回 584538661@qq.com）
  adminEmail: '584538661@qq.com',

  // FormSubmit 收信地址（一般与 adminEmail 相同）
  formSubmitEndpoint: 'https://formsubmit.co/ajax/584538661@qq.com',

  // PushPlus token（个人微信推送）。留空则不推微信
  pushPlusToken: '',

  // 企业微信机器人 Webhook。留空则不推
  wecomWebhook: '',
}
