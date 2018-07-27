const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const downloadLink = document.createElement('a')
const tmpImage = new Image()

/**
 * @param {number} width 
 * @param {number} height 
 */
function initCanvas(width, height) {
  canvas.width = width
  canvas.height = height
  ctx.clearRect(0, 0, width, height)
}

/**
 * @param {SVGElement} svg 
 * @return {string} base64
 */
function svgToBase64(svg) {
  const data = new XMLSerializer().serializeToString(svg)
  return 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(data)))
}

/**
 * download
 * @param {string} src
 * @param {string} fileName
 */
function download(src, fileName = 'eyecatch.png') {
  downloadLink.href = src
  downloadLink.download = fileName
  downloadLink.click()
}

export default {
  /**
   * download svg to png
   * @param {SVGElement} svg 
   * @param {number} width 
   * @param {number} height 
   * @param {HTMLImageElement} bgImage 
   */
  svg(svg, width, height, bgImage) {
    initCanvas(width, height)

    tmpImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, width, height)
      ctx.drawImage(tmpImage, 0, 0, width, height)
      download(canvas.toDataURL('image/png'))
    }

    tmpImage.src = svgToBase64(svg)
  }
}