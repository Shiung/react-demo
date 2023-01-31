function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  theme: {
    screens: {
      'md': '375px',
      'lg': '600px',
      'xl': '1024px'
    },
    boxShadow: {
      DEFAULT: '2px 2px 6px 0 rgba(0, 0, 0, 0.1)',
      1: '1px 1px 6px 0 rgba(0, 0, 0, 0.1)',
      2: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      3: '2px 2px 6px 0 rgba(51, 51, 51, 0.2)',
      4: '4px 4px 16px 0 rgba(51, 51, 51, 0.2)',
      5: '0 -2px 4px 0 rgba(0, 0, 0, 0.05)',
      6: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
      7: '0 0 4px 0 rgba(0, 0, 0, 0.2)',
      8: '3px 3px 6px 0 rgba(0, 0, 0, 0.05)',
      9: '0 0 6px 0 rgba(0, 0, 0, 0.1)',
      10: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',
      11: '0 2px 7px 0 rgba(0, 0, 0, 0.1)',
      'primary-1': '0 4px 16px 0 rgba(76,158,234,0.2)',
      none: 'none'
    },
    extend: {
      colors: {
        primary: withOpacityValue('--portal-wap-primary')
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { bottom: '-5vh', opacity: 0 },
          '100%': { bottom: '0', opacity: 1 }
        }
      },
      animation: {
        sportFadeIn: 'fadeIn .4s',
        sportSlideIn: 'slideIn .4s',
      }
    }
  }
}
