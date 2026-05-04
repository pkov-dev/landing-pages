// Підключення функціоналу "Чортоги Фрілансера"
import { addLoadedAttr, splitElementIntoSpans, copyTextToClipboard } from '@js/common/functions.js'
import { tippyInstances } from '@components/effects/tippy/tippy'
import { counter } from '@js/custom/counter'

addLoadedAttr()
counter.counterInit()
splitElementIntoSpans('.left-about__title', 0.05)
splitElementIntoSpans('.right-about__title', 0.05, 0.3)

copyTextToClipboard(tippyInstances)
