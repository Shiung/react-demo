// import { getConfig } from '@/config'

const fontFaceMethod = () => {
  const url = '/' //`${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/fe-font/YouSheBiaoTiHei-2.ttf`
  const style = document.createElement('style')
  style.innerHTML = `
    @font-face {
      font-family: YouSheBiaoTiHei;
      src: url('${url}');
    }
  `

  document.getElementsByTagName('head')[0].appendChild(style)
}

export {
  fontFaceMethod
}
