import { sendEmailProps } from '@/utils/email/index'
import axios from 'axios'

export const browserPostEmail = async ({
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
        htmlMessage += `${formattedKey}:${data[key]};`
      }
    }
  }

  return await axios.post(
    `http://app.masonmint.com/api/email/sendemail?fromEmail=mark@masonmint.com&subject=${subject}&body=${htmlMessage}&apikey=3A1EFD92-919A-48D3-8762-EB4248F37241`
  )
}
