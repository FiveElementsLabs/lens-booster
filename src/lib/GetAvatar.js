var randomHex = require('random-hex');

export const getAvatar = (name, color1, color2) => {
    if(!color1 || !color2) {
      const color1 = randomHex.generate().substring(3, 6);
      const color2 = randomHex.generate().substring(1, 4);
      return `https://ui-avatars.com/api/?name=${name}&size=256&rounded=true&bold=true&color=${color1}&background=${color2}`;
    } else {
      return `https://ui-avatars.com/api/?name=${name}&size=256&rounded=true&bold=true&color=${color1}&background=${color2}`;
    }
}