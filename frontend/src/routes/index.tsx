import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: lazyRouteComponent(() =>
    import('@/page/flow/flow').then(mod => ({ default: mod.default })),
  ),
})

 
