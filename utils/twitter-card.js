// from https://stackoverflow.com/a/41602636
export default function(
  username = undefined,
  objectType = undefined,
  fullDescription = undefined,
  title = undefined
) {
  return {
    title: title || `Hazy - ${username} ${objectType}`,
    meta: [
      {
        property: 'twitter:card',
        content: !!username ? 'summary' : 'summary_large_image'
      },
      {
        property: 'twitter:image:src',
        content: !!username
          ? `${process.env.BASE_URL}/users/${username}/avatar.jpg`
          : '/hazy_card.png'
      },
      {
        property: 'twitter:title',
        content: title || `Hazy - ${username} ${objectType}`
      },
      {
        property: 'twitter:description',
        content:
          fullDescription || `Look at ${objectType} by ${username} on Hazy!`
      }
    ]
  }
}
