const SITE = {
  phone: '159-1023-9102',
  phoneRaw: '15910239102',
  email: '584538661@qq.com',
  wechat: '159-1023-9102',
  address: '北京市朝阳区十里河新华国际广场A1201',
}

const NAV = [
  { href: 'index.html', label: '首页', key: 'home' },
  { href: 'about.html', label: '关于我们', key: 'about' },
  { href: 'equipment.html', label: '设备中心', key: 'equipment' },
  { href: 'cases.html', label: '项目案例', key: 'cases' },
  { href: 'advantages.html', label: '服务优势', key: 'advantages' },
  { href: 'process.html', label: '服务流程', key: 'process' },
  { href: 'scenarios.html', label: '应用场景', key: 'scenarios' },
  { href: 'contact.html', label: '联系我们', key: 'contact' },
]

function renderHeader(active) {
  const links = NAV.map(
    (item) =>
      `<a href="${item.href}" class="${item.key === active ? 'is-active' : ''}">${item.label}</a>`,
  ).join('')

  return `
  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      <a href="index.html" class="brand">
        <img class="brand__logo" src="public/logo.jpg" alt="中科昱宇" width="48" height="42" />
        <span class="brand__text">
          <strong>昱宇科技</strong>
          <small>音响 · 灯光 · LED</small>
        </span>
      </a>
      <nav class="nav" id="site-nav" aria-label="主导航">
        ${links}
        <a class="nav__phone" href="tel:${SITE.phoneRaw}">${SITE.phone}</a>
      </nav>
      <a href="contact.html" class="btn btn--primary header-cta">立即咨询</a>
      <button type="button" class="menu-toggle" id="menu-toggle" aria-label="打开菜单" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`
}

function renderFooter() {
  const links = NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')
  return `
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <img class="site-footer__logo" src="public/logo.jpg" alt="中科昱宇" width="120" height="105" />
        <h3>昱宇科技</h3>
        <p>专业音响灯光 LED 屏设备租赁服务</p>
        <p class="site-footer__tagline">以设备稳定为根基，以技术专业为核心，以服务可靠为承诺。</p>
      </div>
      <div>
        <h4>快速导航</h4>
        <ul>${links}</ul>
      </div>
      <div>
        <h4>联系方式</h4>
        <ul class="site-footer__contact">
          <li>咨询电话：<a href="tel:${SITE.phoneRaw}">${SITE.phone}</a></li>
          <li>微信：${SITE.wechat}</li>
          <li>邮箱：<a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>地址：${SITE.address}</li>
        </ul>
        <div class="site-footer__qr">
          <img src="public/wechat-qr.jpg" alt="微信二维码" width="112" height="112" loading="lazy" />
          <span>微信扫码咨询</span>
        </div>
      </div>
    </div>
    <div class="site-footer__bar">
      <div class="container">
        <p>昱宇科技｜专业音响灯光 LED 屏设备租赁服务 ©2026 昱宇科技 版权所有｜京 ICP 备 XXXX 号</p>
        <p>咨询：${SITE.phone}｜微信：${SITE.wechat}</p>
      </div>
    </div>
  </footer>`
}

function initLayout() {
  const active = document.body.dataset.page || 'home'
  const headerMount = document.getElementById('site-header-mount')
  const footerMount = document.getElementById('site-footer-mount')
  if (headerMount) headerMount.outerHTML = renderHeader(active)
  if (footerMount) footerMount.outerHTML = renderFooter()

  const header = document.getElementById('site-header')
  const nav = document.getElementById('site-nav')
  const toggle = document.getElementById('menu-toggle')

  const forceSolid = active !== 'home'
  const onScroll = () => {
    if (!header) return
    header.classList.toggle(
      'is-solid',
      forceSolid || window.scrollY > 24 || (nav && nav.classList.contains('is-open')),
    )
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open')
      toggle.classList.toggle('is-open', open)
      toggle.setAttribute('aria-expanded', String(open))
      document.body.style.overflow = open ? 'hidden' : ''
      onScroll()
    })
  }
}

function initReveal() {
  const items = document.querySelectorAll('.reveal')
  if (!items.length) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  )
  items.forEach((item) => observer.observe(item))
}

function initHero() {
  const root = document.querySelector('[data-hero]')
  if (!root) return

  const slides = [
    {
      title: '一站式专业音响・灯光・LED 屏设备租赁服务',
      subtitle:
        '十年行业深耕，为演唱会、年会、发布会、庆典活动提供全套视听设备与现场技术保障',
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
      primary: { label: '立即咨询', href: 'contact.html' },
      secondary: { label: '获取方案', href: 'contact.html' },
    },
    {
      title: '专业舞美设备租赁，让每一场活动声光俱佳',
      subtitle: '自有 3000+ 台套设备库存，技术团队全程现场值守',
      image:
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1920&q=80',
      primary: { label: '查看案例', href: 'cases.html' },
      secondary: { label: '联系我们', href: 'contact.html' },
    },
    {
      title: '大小活动均可承接，按需定制灵活报价',
      subtitle: '从小型会议到万人演出，一站式设备 + 搭建 + 技术全包',
      image:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
      primary: { label: '在线询价', href: 'contact.html' },
    },
  ]

  let index = 0
  const slidesEl = root.querySelector('.hero__slides')
  const contentEl = root.querySelector('.hero__content')
  const dotsEl = root.querySelector('.hero__dots')

  slidesEl.innerHTML = slides
    .map(
      (s, i) =>
        `<div class="hero__slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${s.image}')"></div>`,
    )
    .join('')

  dotsEl.innerHTML = slides
    .map((_, i) => `<button type="button" role="tab" aria-selected="${i === 0}" class="${i === 0 ? 'is-active' : ''}"></button>`)
    .join('')

  const renderContent = () => {
    const s = slides[index]
    contentEl.innerHTML = `
      <p class="hero__brand">昱宇科技</p>
      <h1>${s.title}</h1>
      <p class="hero__subtitle">${s.subtitle}</p>
      <div class="hero__actions">
        <a href="${s.primary.href}" class="btn btn--primary">${s.primary.label}</a>
        ${s.secondary ? `<a href="${s.secondary.href}" class="btn btn--ghost">${s.secondary.label}</a>` : ''}
      </div>`
  }

  const go = (next) => {
    index = next
    ;[...slidesEl.children].forEach((el, i) => el.classList.toggle('is-active', i === index))
    ;[...dotsEl.children].forEach((el, i) => {
      el.classList.toggle('is-active', i === index)
      el.setAttribute('aria-selected', String(i === index))
    })
    renderContent()
  }

  ;[...dotsEl.children].forEach((btn, i) => btn.addEventListener('click', () => go(i)))
  renderContent()
  setInterval(() => go((index + 1) % slides.length), 6500)
}

function initCasesFilter() {
  const tabs = document.querySelectorAll('[data-case-tab]')
  const cards = document.querySelectorAll('[data-case-card]')
  const empty = document.querySelector('[data-case-empty]')
  if (!tabs.length) return

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.caseTab
      tabs.forEach((t) => t.classList.toggle('is-active', t === tab))
      let visible = 0
      cards.forEach((card) => {
        const show = cat === '全部' || card.dataset.category === cat
        card.classList.toggle('is-hidden', !show)
        if (show) visible += 1
      })
      if (empty) empty.classList.toggle('is-show', visible === 0)
    })
  })
}

function buildInquiryPayload(form) {
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim()
  const phone = String(data.get('phone') || '').trim()
  const services = data.getAll('services').join('、') || '未选择'
  const fields = {
    name,
    phone,
    eventName: String(data.get('eventName') || '').trim(),
    eventDate: String(data.get('eventDate') || '').trim(),
    location: String(data.get('location') || '').trim(),
    people: String(data.get('people') || '').trim(),
    services,
    desc: String(data.get('desc') || '').trim(),
  }
  const text = [
    `【昱宇科技官网询盘】`,
    `姓名：${fields.name}`,
    `电话/微信：${fields.phone}`,
    `活动名称：${fields.eventName || '未填写'}`,
    `活动时间：${fields.eventDate || '未填写'}`,
    `活动地点：${fields.location || '未填写'}`,
    `预计人数：${fields.people || '未填写'}`,
    `需要服务：${fields.services}`,
    `需求描述：${fields.desc || '未填写'}`,
  ].join('\n')
  return { fields, text, subject: `【官网询盘】${fields.eventName || fields.name}` }
}

async function sendInquiryEmail(payload, config) {
  const endpoint = config.formSubmitEndpoint
  if (!endpoint) throw new Error('未配置邮箱接口')

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: payload.subject,
      _template: 'table',
      _captcha: 'false',
      姓名: payload.fields.name,
      电话微信: payload.fields.phone,
      活动名称: payload.fields.eventName,
      活动时间: payload.fields.eventDate,
      活动地点: payload.fields.location,
      预计人数: payload.fields.people,
      需要服务: payload.fields.services,
      需求描述: payload.fields.desc,
    }),
  })

  if (!res.ok) throw new Error('邮件发送失败')
  return res.json().catch(() => ({}))
}

async function sendInquiryWeChat(payload, config) {
  const tasks = []

  if (config.pushPlusToken) {
    tasks.push(
      fetch('https://www.pushplus.plus/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: config.pushPlusToken,
          title: payload.subject,
          content: payload.text.replace(/\n/g, '<br/>'),
          template: 'html',
        }),
      }),
    )
  }

  if (config.wecomWebhook) {
    tasks.push(
      fetch(config.wecomWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msgtype: 'text',
          text: { content: payload.text },
        }),
      }),
    )
  }

  if (!tasks.length) return
  await Promise.allSettled(tasks)
}

function initContactForm() {
  const form = document.getElementById('inquiry-form')
  if (!form) return
  const ok = form.querySelector('.form-msg--ok')
  const err = form.querySelector('.form-msg--error')
  const submitBtn = form.querySelector('button[type="submit"]')
  const config = window.YUYU_FORM_CONFIG || {}

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const payload = buildInquiryPayload(form)
    ok?.classList.remove('is-show')
    err?.classList.remove('is-show')

    if (!payload.fields.name || !payload.fields.phone) {
      if (err) {
        err.textContent = '请至少填写姓名与联系电话。'
        err.classList.add('is-show')
      }
      return
    }

    const originalText = submitBtn?.textContent
    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = '提交中…'
    }

    try {
      await sendInquiryEmail(payload, config)
      sendInquiryWeChat(payload, config).catch(() => {})
      if (ok) {
        ok.textContent = `提交成功！我们已通知管理员（${config.adminEmail || SITE.email}），将尽快与您联系。`
        ok.classList.add('is-show')
      }
      form.reset()
    } catch (error) {
      if (err) {
        err.textContent =
          '提交失败，请稍后重试，或直接拨打 / 微信联系 159-1023-9102。若首次使用邮箱通知，请先到管理员邮箱完成 FormSubmit 激活。'
        err.classList.add('is-show')
      }
      console.error(error)
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = originalText || '提交咨询'
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout()
  initReveal()
  initHero()
  initCasesFilter()
  initContactForm()
})
