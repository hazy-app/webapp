export default {
  _id: {
    type: ['undefined', 'string']
  },
  account_type: {
    type: ['number'],
    default: () => 2
  },
  business_type: {
    type: ['number', 'undefined'],
    formatter: (v, r) => {
      return r.account_type === 2 ? undefined : parseInt(v)
    }
  },
  name: {
    type: ['string'],
    default: () => ''
  },
  sub_title: {
    type: ['string', 'undefined']
  },
  deleted: {
    type: ['boolean'],
    default: () => false
  },
  qr_code: {
    type: ['string', 'undefined']
  },
  profile_picture: {
    type: ['string'],
    default: () => ''
  },
  mobile_phone: {
    type: ['number', 'undefined'],
    formatter: (v, r) => {
      return r.account_type === 2 ? v : undefined
    }
  },
  email: {
    type: ['string', 'undefined'],
    formatter: (v, r) => {
      return r.account_type === 2 ? v : undefined
    }
  },
  applications: {
    type: ['object'],
    default: () => {}
  }
}
