export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number, s: number
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
    }
    h /= 6
  }

  return [h, s, l]
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return [r * 255, g * 255, b * 255]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h: number = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h, s, v]
}

export function srgbTransferFunction(a: number): number {
  return a <= 0.0031308
    ? 12.92 * a
    : 1.055 * Math.pow(a, 0.4166666666666667) - 0.055
}

export function srgbTransferFunctionInv(a: number): number {
  return a > 0.04045 ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92
}

export function linearSrgbToOklab(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ]
}

function oklabToLinearSrgb(
  L: number,
  a: number,
  b: number
): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

export function toe(x: number): number {
  const k1 = 0.206
  const k2 = 0.03
  const k3 = (1 + k1) / (1 + k2)

  return (
    0.5 *
    (k3 * x - k1 + Math.sqrt((k3 * x - k1) * (k3 * x - k1) + 4 * k2 * k3 * x))
  )
}

export function toeInv(x: number): number {
  const k1 = 0.206
  const k2 = 0.03
  const k3 = (1 + k1) / (1 + k2)

  return (x * x + k1 * x) / (k3 * (x + k2))
}

export function computeMaxSaturation(a: number, b: number): number {
  let k0: number, k1: number, k2: number, k3: number, k4: number
  let wl: number, wm: number, ws: number

  if (-1.88170328 * a - 0.80936493 * b > 1) {
    k0 = 1.19086277
    k1 = 1.76576728
    k2 = 0.59662641
    k3 = 0.75515197
    k4 = 0.56771245
    wl = 4.0767416621
    wm = -3.3077115913
    ws = 0.2309699292
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = 0.73956515
    k1 = -0.45954404
    k2 = 0.08285427
    k3 = 0.1254107
    k4 = 0.14503204
    wl = -1.2684380046
    wm = 2.6097574011
    ws = -0.3413193965
  } else {
    k0 = 1.35733652
    k1 = -0.00915799
    k2 = -1.1513021
    k3 = -0.50559606
    k4 = 0.00692167
    wl = -0.0041960863
    wm = -0.7034186147
    ws = 1.707614701
  }

  let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b

  const kL = 0.3963377774 * a + 0.2158037573 * b
  const kM = -0.1055613458 * a - 0.0638541728 * b
  const kS = -0.0894841775 * a - 1.291485548 * b

  const l_ = 1 + S * kL
  const m_ = 1 + S * kM
  const s_ = 1 + S * kS

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  const l_dS = 3 * kL * l_ * l_
  const m_dS = 3 * kM * m_ * m_
  const s_dS = 3 * kS * s_ * s_

  const l_dS2 = 6 * kL * kL * l_
  const m_dS2 = 6 * kM * kM * m_
  const s_dS2 = 6 * kS * kS * s_

  const f = wl * l + wm * m + ws * s
  const f1 = wl * l_dS + wm * m_dS + ws * s_dS
  const f2 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2

  S = S - (f * f1) / (f1 * f1 - 0.5 * f * f2)

  return S
}

export function findCusp(a: number, b: number): [number, number] {
  const S_cusp = computeMaxSaturation(a, b)
  const rgbAtMax = oklabToLinearSrgb(1, S_cusp * a, S_cusp * b)

  const L_cusp = Math.cbrt(1 / Math.max(rgbAtMax[0], rgbAtMax[1], rgbAtMax[2]))
  const C_cusp = L_cusp * S_cusp

  return [L_cusp, C_cusp]
}

// Finds the intersection of the line defined by
// L = L0 * (1 - t) + t * L1;
// C = t * C1;
// a and b must be normalized so a^2 + b^2 === 1
export function findGamutIntersection(
  a: number,
  b: number,
  l1: number,
  c1: number,
  l0: number,
  cusp: [number, number] | null = null
): number {
  if (!cusp) {
    // Find the cusp of the gamut triangle
    cusp = findCusp(a, b)
  }

  // Find the intersection for upper and lower halves separately
  let t: number
  if ((l1 - l0) * cusp[1] - (cusp[0] - l0) * c1 <= 0) {
    // Lower half
    t = (cusp[1] * l0) / (c1 * cusp[0] + cusp[1] * (l0 - l1))
  } else {
    // Upper half

    // First intersect with triangle
    t = (cusp[1] * (l0 - 1)) / (c1 * (cusp[0] - 1) + cusp[1] * (l0 - l1))

    // Then one step of Halley's method
    const dL = l1 - l0
    const dC = c1

    const kL = +0.3963377774 * a + 0.2158037573 * b
    const kM = -0.1055613458 * a - 0.0638541728 * b
    const kS = -0.0894841775 * a - 1.291485548 * b

    const lDt = dL + dC * kL
    const mDt = dL + dC * kM
    const sDt = dL + dC * kS

    // Higher accuracy loop (2–3 iterations can be used for more precision)
    {
      const L = l0 * (1 - t) + t * l1
      const C = t * c1

      const l_ = L + C * kL
      const m_ = L + C * kM
      const s_ = L + C * kS

      const l = l_ ** 3
      const m = m_ ** 3
      const s = s_ ** 3

      const ldt = 3 * lDt * l_ ** 2
      const mdt = 3 * mDt * m_ ** 2
      const sdt = 3 * sDt * s_ ** 2

      const ldt2 = 6 * lDt ** 2 * l_
      const mdt2 = 6 * mDt ** 2 * m_
      const sdt2 = 6 * sDt ** 2 * s_

      const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1
      const r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt
      const r2 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2

      const uR = r1 / (r1 ** 2 - 0.5 * r * r2)
      const tR = -r * uR

      const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1
      const g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt
      const g2 =
        -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2

      const uG = g1 / (g1 ** 2 - 0.5 * g * g2)
      const tG = -g * uG

      const b_ = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1
      const b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt
      const b2 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2

      const uB = b1 / (b1 ** 2 - 0.5 * b_ * b2)
      const tB = -b_ * uB

      tR >= 0 && (t += tR)
      tG >= 0 && (t += Math.min(t, tG))
      tB >= 0 && (t += Math.min(t, tB))
    }
  }

  return t
}

export function getSTMax(
  a_: number,
  b_: number,
  cusp: [number, number] | null = null
): [number, number] {
  if (!cusp) {
    cusp = findCusp(a_, b_)
  }

  const [L, C] = cusp
  return [C / L, C / (1 - L)]
}

function getSTMid(a_: number, b_: number): [number, number] {
  const S =
    0.11516993 +
    1 /
      (7.4477897 +
        4.1590124 * b_ +
        a_ *
          (-2.19557347 +
            1.75198401 * b_ +
            a_ *
              (-2.13704948 -
                10.02301043 * b_ +
                a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))))

  const T =
    0.11239642 +
    1 /
      (1.6132032 -
        0.68124379 * b_ +
        a_ *
          (0.40370612 +
            0.90148123 * b_ +
            a_ *
              (-0.27087943 +
                0.6122399 * b_ +
                a_ * (0.00299215 - 0.45399568 * b_ - 0.14661872 * a_))))

  return [S, T]
}

export function getCs(
  L: number,
  a_: number,
  b_: number
): [number, number, number] {
  const cusp = findCusp(a_, b_)

  const CMax = findGamutIntersection(a_, b_, L, 1, L, cusp)
  const STMax = getSTMax(a_, b_, cusp)

  const SMid =
    0.11516993 +
    1 /
      (7.4477897 +
        4.1590124 * b_ +
        a_ *
          (-2.19557347 +
            1.75198401 * b_ +
            a_ *
              (-2.13704948 -
                10.02301043 * b_ +
                a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))))

  const TMid =
    0.11239642 +
    1 /
      (1.6132032 -
        0.68124379 * b_ +
        a_ *
          (0.40370612 +
            0.90148123 * b_ +
            a_ *
              (-0.27087943 +
                0.6122399 * b_ +
                a_ * (0.00299215 - 0.45399568 * b_ - 0.14661872 * a_))))

  const k = CMax / Math.min(L * STMax[0], (1 - L) * STMax[1])

  const CMid = (() => {
    const CA = L * SMid
    const CB = (1 - L) * TMid

    return 0.9 * k * Math.sqrt(Math.sqrt(1 / (1 / CA ** 4 + 1 / CB ** 4)))
  })()

  const C0 = (() => {
    const CA = L * 0.4
    const CB = (1 - L) * 0.8

    return Math.sqrt(1 / (1 / CA ** 2 + 1 / CB ** 2))
  })()

  return [C0, CMid, CMax]
}

export function okhslToSrgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  if (l === 1) {
    return [255, 255, 255]
  } else if (l === 0) {
    return [0, 0, 0]
  }

  const a_ = Math.cos(2 * Math.PI * h)
  const b_ = Math.sin(2 * Math.PI * h)
  const L = toeInv(l)

  const [C0, CMid, CMax] = getCs(L, a_, b_)

  let C: number
  let t: number
  let k0: number
  let k1: number
  let k2: number

  if (s < 0.8) {
    t = 1.25 * s
    k0 = 0
    k1 = 0.8 * C0
    k2 = 1 - k1 / CMid
  } else {
    t = 5 * (s - 0.8)
    k0 = CMid
    k1 = (0.2 * CMid ** 2 * 1.25 ** 2) / C0
    k2 = 1 - k1 / (CMax - CMid)
  }

  C = k0 + (t * k1) / (1 - k2 * t)

  const rgb = oklabToLinearSrgb(L, C * a_, C * b_)
  return [
    Math.max(0, Math.min(255, 255 * srgbTransferFunction(rgb[0]))),
    Math.max(0, Math.min(255, 255 * srgbTransferFunction(rgb[1]))),
    Math.max(0, Math.min(255, 255 * srgbTransferFunction(rgb[2]))),
  ]
}

export function srgbToOkhsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  const lab = linearSrgbToOklab(
    srgbTransferFunctionInv(r / 255),
    srgbTransferFunctionInv(g / 255),
    srgbTransferFunctionInv(b / 255)
  )

  const C = Math.sqrt(lab[1] ** 2 + lab[2] ** 2)
  const a_ = lab[1] / C
  const b_ = lab[2] / C

  const L = lab[0]
  const h = 0.5 + (0.5 * Math.atan2(-lab[2], -lab[1])) / Math.PI

  const [C0, CMid, CMax] = getCs(L, a_, b_)

  let s: number
  if (C < CMid) {
    const k0 = 0
    const k1 = 0.8 * C0
    const k2 = 1 - k1 / CMid

    const t = (C - k0) / (k1 + k2 * (C - k0))
    s = t * 0.8
  } else {
    const k0 = CMid
    const k1 = (0.2 * CMid ** 2 * 1.25 ** 2) / C0
    const k2 = 1 - k1 / (CMax - CMid)

    const t = (C - k0) / (k1 + k2 * (C - k0))
    s = 0.8 + 0.2 * t
  }

  const l = toe(L)
  return [h, s, l]
}

export function okhsvToSrgb(h: number, s: number, v: number): number[] {
  let a_ = Math.cos(2 * Math.PI * h)
  let b_ = Math.sin(2 * Math.PI * h)

  let ST_max = getSTMax(a_, b_)
  let S_max = ST_max[0]
  let S_0 = 0.5
  let T = ST_max[1]
  let k = 1 - S_0 / S_max

  let L_v = 1 - (s * S_0) / (S_0 + T - T * k * s)
  let C_v = (s * T * S_0) / (S_0 + T - T * k * s)

  let L = v * L_v
  let C = v * C_v

  let L_vt = toeInv(L_v)
  let C_vt = (C_v * L_vt) / L_v

  let L_new = toeInv(L)
  C = (C * L_new) / L
  L = L_new

  let rgb_scale = oklabToLinearSrgb(L_vt, a_ * C_vt, b_ * C_vt)
  let scale_L = Math.cbrt(
    1 / Math.max(rgb_scale[0], rgb_scale[1], rgb_scale[2], 0)
  )

  L = L * scale_L
  C = C * scale_L

  let rgb = oklabToLinearSrgb(L, C * a_, C * b_)
  return [
    255 * srgbTransferFunction(rgb[0]),
    255 * srgbTransferFunction(rgb[1]),
    255 * srgbTransferFunction(rgb[2]),
  ]
}

export function srgbToOkhsv(r: number, g: number, b: number): number[] {
  let lab = linearSrgbToOklab(
    srgbTransferFunctionInv(r / 255),
    srgbTransferFunctionInv(g / 255),
    srgbTransferFunctionInv(b / 255)
  )

  let C = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2])
  let a_ = lab[1] / C
  let b_ = lab[2] / C

  let L = lab[0]
  let h = 0.5 + (0.5 * Math.atan2(-lab[2], -lab[1])) / Math.PI

  let ST_max = getSTMax(a_, b_)
  let S_max = ST_max[0]
  let S_0 = 0.5
  let T = ST_max[1]
  let k = 1 - S_0 / S_max

  let t = T / (C + L * T)
  let L_v = t * L
  let C_v = t * C

  let L_vt = toeInv(L_v)
  let C_vt = (C_v * L_vt) / L_v

  let rgb_scale = oklabToLinearSrgb(L_vt, a_ * C_vt, b_ * C_vt)
  let scale_L = Math.cbrt(
    1 / Math.max(rgb_scale[0], rgb_scale[1], rgb_scale[2], 0)
  )

  L = L / scale_L
  C = C / scale_L

  C = (C * toe(L)) / L
  L = toe(L)

  let v = L / L_v
  let s = ((S_0 + T) * C_v) / (T * S_0 + T * k * C_v)

  return [h, s, v]
}

export function hexToRgb(hex: string): number[] | null {
  if (hex.substr(0, 1) === '#') hex = hex.substr(1)

  if (hex.match(/^([0-9a-f]{3})$/i)) {
    let r = (parseInt(hex.charAt(0), 16) / 15) * 255
    let g = (parseInt(hex.charAt(1), 16) / 15) * 255
    let b = (parseInt(hex.charAt(2), 16) / 15) * 255
    return [r, g, b]
  }
  if (hex.match(/^([0-9a-f]{6})$/i)) {
    let r = parseInt(hex.substr(0, 2), 16)
    let g = parseInt(hex.substr(2, 2), 16)
    let b = parseInt(hex.substr(4, 2), 16)
    return [r, g, b]
  }
  if (hex.match(/^([0-9a-f]{1})$/i)) {
    let a = (parseInt(hex.substr(0), 16) / 15) * 255
    return [a, a, a]
  }
  if (hex.match(/^([0-9a-f]{2})$/i)) {
    let a = parseInt(hex.substr(0, 2), 16)
    return [a, a, a]
  }

  return null
}

export function rgbToHex(r: number, g: number, b: number): string {
  function componentToHex(x: number): string {
    let hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
