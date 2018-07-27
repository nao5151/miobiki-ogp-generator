const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

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
  const downloadLink = document.createElement('a')
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
    const tmpImage = new Image()
    initCanvas(width, height)

    tmpImage.onload = () => {
      /**
       * safariだと背景のみの画像がダウンロードされる場合がある
       * tmpImageには文字が入っていたため、drawImageで入れ替わってしまっていると予測
       * そのため、以下の処理になった
       */
      new Promise(resolve => {
        ctx.drawImage(bgImage, 0, 0, width, height)
        setTimeout(resolve, 0)
      }).then(() => {
        ctx.drawImage(tmpImage, 0, 0, width, height)
        return true
      }).then(() => {
        download(canvas.toDataURL('image/png'))
    })
    }
    
    tmpImage.src = svgToBase64(svg)
  }
}