import { sendEmailProps } from '@/utils/email/index'

export const browserSendEmail = async ({
  subject,
  htmlMessage,
  data,
}: sendEmailProps) => {
  if (data) {
    htmlMessage += '<br/>'
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const words = key.split(/(?=[A-Z])/)
        const capitalizedWords = words.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        const formattedKey = capitalizedWords.join(' ')
        htmlMessage += `<br/> <b>${formattedKey}</b>: ${data[key]}; <br/>`
      }
    }
  }
  return await fetch(`${window.location.origin}/api/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, htmlMessage }),
  })
}
