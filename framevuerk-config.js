const configs = []
const baseConfig = {
  'primary-color': '#000',
  'secondary-color': '#A08C08',
  'danger-color': '#BF2B2B',
  'warning-color': '#BB8A2A',
  'info-color': '#22A4C1',
  'bg-color': '#fff',
  'header-bg-color': '#1169C4',
  'sidebar-bg-color': '#16212D',
  'footer-bg-color': '#16212D',
  padding: '1.5em',
  'transition-speed': '0.35s',
  'border-radius': '0',
  'shadow-size': '0'
}

configs.push(
  Object.assign(JSON.parse(JSON.stringify(baseConfig)), {
    'config-name': 'rtl',
    direction: 'rtl'
  })
)

configs.push(
  Object.assign(JSON.parse(JSON.stringify(baseConfig)), {
    'config-name': 'ltr',
    direction: 'ltr'
  })
)

module.exports = configs
