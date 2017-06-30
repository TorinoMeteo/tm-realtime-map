import convert from 'color-convert'

export const white2blue = (v, max, min) => {
  let fromMin = v - min
  let scale = 100 / (max - min)
  let n = parseInt(fromMin * scale)

  let startTriplet = convert.rgb.hsv(255, 255, 255)
  let endTriplet = convert.rgb.hsv(0, 0, 255)

  let hsvTriplet = colorTransition(n, 100, startTriplet, endTriplet)
  let triplet = convert.hsv.rgb(hsvTriplet)

  return 'rgba(' + triplet[0] + ', ' + triplet[1] + ', ' + triplet[2] + ', 1)'
}

export const blue2red = (v, max, min) => {
  let fromMin = v - min
  let scale = 100 / (max - min)
  let n = parseInt(fromMin * scale)

  let startTriplet = convert.rgb.hsv(0, 0, 255)
  let endTriplet = convert.rgb.hsv(255, 0, 0)

  let hsvTriplet = colorTransition(n, 100, startTriplet, endTriplet)
  let triplet = convert.hsv.rgb(hsvTriplet)

  return 'rgba(' + triplet[0] + ', ' + triplet[1] + ', ' + triplet[2] + ', 1)'

  /* RGB
  console.log(v, fromMin, scale, n)
  let R = (255 * n) / 100
  let G = 80
  let B = (255 * (100 - n)) / 100
  return 'rgb(' + Math.round(R) + ', ' + Math.round(G) + ', ' + Math.round(B) + ')'
  */
}

export function transition (value, maximum, startPoint, endPoint) {
  return startPoint + (endPoint - startPoint) * value / maximum
}

export function colorTransition (value, maximum, s, e) {
  let r1 = transition(value, maximum, s[0], e[0])
  let r2 = transition(value, maximum, s[1], e[1])
  let r3 = transition(value, maximum, s[2], e[2])
  return [r1, r2, r3]
}
