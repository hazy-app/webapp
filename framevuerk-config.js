const configs = []
const baseConfig = {
  'primary-color': '#000',
  'secondary-color': '#A08C08',
  'danger-color': '#BF2B2B',
  'warning-color': '#BB8A2A',
  'info-color': '#22A4C1',
  'bg-color': '#fff',
  'header-bg-color': '#000',
  'sidebar-bg-color': '#000',
  'footer-bg-color': '#000',
  padding: '0.8em',
  'transition-speed': '0.35s',
  'border-radius': '5px',
  'shadow-size': '6px'
}

configs.push(
  Object.assign(JSON.parse(JSON.stringify(baseConfig)), {
    'config-name': 'ltr',
    direction: 'ltr'
  })
)

module.exports = configs
