const queue = []
let active = 0
const MAX_CONCURRENT = 2

export function loadHlsPrioritized(loadFn) {
  return new Promise((resolve) => {
    queue.push({ loadFn, resolve })
    runQueue()
  })
}

function runQueue() {
  if (active >= MAX_CONCURRENT) return
  if (!queue.length) return

  const job = queue.shift()
  active++

  job.loadFn().then((res) => {
    job.resolve(res)
    active--
    runQueue()
  })
}