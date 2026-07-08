let isPinned = false
    let isSwiched = false
    const pinned = []

    function randomHex() {
      const chars = "abcdef0123456789"
      let hex = "#"
      for (let i = 0; i < 6; i++) {
        const rand = Math.floor(Math.random() * 16)
        const newchar = chars[rand]

        hex = hex + newchar
      }
      return hex
    }
    function randCircle() {
      const container = document.getElementById('circles')
      const square = document.getElementById('square')
      for (let i = 0; i < 6; i++) {
        const hex = randomHex()
        const circle = document.createElement('div')
        circle.style.backgroundColor = hex
        circle.dataset.hex = hex
        circle.classList.add('rounded-full', 'w-[30px]', 'aspect-square', 'cursor-pointer', 'circle', 'hover:scale-125', 'active:scale-95', 'transition-all', 'duration-200', 'relative')
        container.append(circle)

        let bg = circle.dataset.hex
        const text = getTextColor(bg)
        circle.addEventListener('mouseenter', () => {
          square.style.backgroundColor = bg
          square.innerText = bg
          square.style.color = text
        })
        circle.addEventListener('mouseleave', () => {
          square.style.backgroundColor = "#f1f5f9"
          square.innerText = "Hover for Hex codes"
          square.style.color = "black"
        })
        circle.addEventListener('click', () => {
          if (circle.dataset.pinned === "true" && isPinned) {
            const span = circle.querySelector('span')
            span.remove()
            circle.dataset.pinned = "false"
            square.innerText = "Color Unpinned"
          }
          else if (isPinned) {
            circle.classList.remove('circle-pulse')
            const pin = document.createElement('span')
            pin.classList.add('absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'pointer-events-none')
            pin.innerHTML = '<i data-lucide="pin" style="width:16px; height:16px;"></i>'

            circle.appendChild(pin)
            lucide.createIcons()
            circle.dataset.pinned = "true"
            pin.style.color = text
            square.innerText = "Color Pinned!"
            togglePinMode()
          } else if (isSwiched) {
            const newColor = randomHex()
            circle.style.backgroundColor = newColor
            circle.dataset.hex = newColor
            bg = newColor
            square.style.backgroundColor = newColor
            square.innerText = newColor
            square.style.color = getTextColor(newColor)
            toggleSwitchMode()
          }
          else {
            navigator.clipboard.writeText(bg).then(() => {
              square.innerText = "Copied!"
            })
          }
        })
      }
    }
    randCircle()

    let paletteCount = 0
    function savePalette() {
      const palette = document.getElementById('palettes')
      paletteCount++
      const container = document.createElement('div')
      container.classList.add('flex', 'flex-col', 'relative', 'group')
      palette.appendChild(container)
      const label = document.createElement('label')
      label.classList.add('text-xs', 'text-slate-800', 'tracking-widest', 'uppercase', 'mb-1', 'pl-1')
      container.appendChild(label)
      label.innerText = "Palette " + paletteCount
      const container2 = document.createElement('div')
      container2.classList.add('flex', 'flex-row', 'rounded-md', 'overflow-hidden')
      container.appendChild(container2)
      const circles = document.querySelectorAll('.circle')
      circles.forEach(circle => {
        const bg = circle.dataset.hex
        const text = getTextColor(bg)
        const swatch = document.createElement('div')
        swatch.classList.add('h-[120px]', 'w-[33px]', 'tracking-widest', 'text-sm', 'p-2', '[writing-mode:vertical-rl]', 'rotate-180', 'self-center', 'text-center', 'cursor-pointer')
        swatch.style.backgroundColor = bg
        swatch.innerText = bg
        swatch.style.color = text
        container2.appendChild(swatch)
      })
      const del = document.createElement('button')
      del.classList.add('absolute', 'top-0', 'right-0', 'mt-[-10px]', 'text-slate-400', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'text-2xl', 'cursor-pointer', 'hover:text-red-400')
      del.innerText = '×'
      container2.appendChild(del)
      del.addEventListener('click', () => {
        if (confirm('Delete this Palette?')) {
          container.remove()
          paletteCount--
        }
      })

    }

    function newPalette() {
      const circles = document.querySelectorAll('.circle')
      circles.forEach((circle, index) => {
        if (circle.dataset.pinned === "true") {
          pinned[index] = circle.dataset.hex
        }
      })
      const container = document.getElementById('circles')
      container.innerHTML = ""
      randCircle()
      const newCircles = document.querySelectorAll('.circle')
      newCircles.forEach((circle, index) => {
        if (pinned[index]) {
          circle.style.backgroundColor = pinned[index]
          circle.dataset.hex = pinned[index]
          circle.dataset.pinned = "true"
          const pin = document.createElement('span')
          pin.classList.add('absolute', 'inset-0', 'flex', 'items-center', 'justify-center', 'pointer-events-none')
          pin.innerHTML = '<i data-lucide="pin" style="width:16px; height:16px;"></i>'

          circle.appendChild(pin)
          lucide.createIcons()
          circle.dataset.pinned = "true"
          pin.style.color = getTextColor(pinned[index])

        }

      })
      pinned.length = 0
      if (isPinned) togglePinMode()
      if (isSwiched) toggleSwitchMode()
    }

    function getTextColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)

      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      if (brightness < 128) {
        return "white"
      }
      else {
        return "black"
      }
    }

    function togglePinMode() {
      const pin = document.getElementById('pin')
      const circles = document.querySelectorAll('.circle')
      const pinbtn = document.getElementById('pinbtn')

      isPinned = !isPinned

      if (isPinned) {
        pinbtn.classList.remove('text-slate-600', 'bg-slate-100')
        pinbtn.classList.add('text-red-600', 'bg-red-100')
        circles.forEach(circle => {
          circle.classList.add('circle-pulse')
        })
      } else {
        pinbtn.classList.remove('text-red-600', 'bg-red-100')
        pinbtn.classList.add('text-slate-600', 'bg-slate-100')
        circles.forEach(circle => {
          circle.classList.remove('circle-pulse')
        })
      }
    }
    function toggleSwitchMode() {
      const swi = document.getElementById('switch')
      const circles = document.querySelectorAll('.circle')
      const swibtn = document.getElementById('switchbtn')
      isSwiched = !isSwiched

      if (isSwiched) {
        swibtn.classList.remove('text-slate-600', 'bg-slate-100')
        swibtn.classList.add('text-purple-600', 'bg-purple-100')
        circles.forEach(circle => {
          circle.classList.add('circle-pulse')
        })
      } else {
        swibtn.classList.remove('text-purple-600', 'bg-purple-100')
        swibtn.classList.add('text-slate-600', 'bg-slate-100')
        circles.forEach(circle => {
          circle.classList.remove('circle-pulse')
        })
      }
    }
    lucide.createIcons();