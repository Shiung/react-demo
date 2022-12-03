import style from './toast.module.scss'


const Toast = (message: string) => {
  const rootElement = document.getElementById('sports')

  const newEl: HTMLDivElement = document.createElement('div')
  newEl.className = style.wrapper

  const childEl: HTMLDivElement = document.createElement('div')
  childEl.className = style.child
  childEl.innerText = message

  newEl.appendChild(childEl)
  rootElement && rootElement.appendChild(newEl)

  setTimeout(() => {
    rootElement && rootElement.removeChild(newEl)
  }, 3000)
}

export default Toast