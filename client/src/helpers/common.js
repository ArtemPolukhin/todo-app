
export default class Common {
  /**
   * @param {string} time - время в формате yyyy-mm-ddThh:mm
   * @returns {object} объект со свойствами в виде часов, минут и т.д.
   */
  static parseCompletionDateTime = (time) => {
    return {
      year: time.slice(0, 4),
      month: parseInt(time.slice(5, 7)) - 1,
      day: time.slice(8, 10),
      hour: time.slice(11, 13),
      minute: time.slice(14, 17),
    }
  }

  static parseDateTimeLocal = (inputValue) => {
    const value = inputValue.replace('T', '-').replace(':', '-')
    
    return value.split('-')
  }

  static addLeadingZero(item) {
    return item > 9 ? item : item = '0' + item
  }

  static async fetchPost(url, data) {
    await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  static async fetchGet(url) {
    const response = await fetch(url)

    return await response.json()
  }
}
