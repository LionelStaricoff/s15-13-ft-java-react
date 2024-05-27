import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import {
  Typography,
  IconButton
} from '@material-tailwind/react'

export default function SimplePagination ({ active, setActive }) {
  const next = () => {
    if (active === 10) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <div className='sm:hidden flex items-center gap-8'>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={prev}
        disabled={active === 1}
      >
        <FaArrowLeftLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
      <Typography color='gray' className='font-normal'>
        Page <strong className='text-gray-900'>{active}</strong> of{' '}
        <strong className='text-gray-900'>10</strong>
      </Typography>
      <IconButton
        size='sm'
        variant='outlined'
        onClick={next}
        disabled={active === 10}
      >
        <FaArrowRightLong strokeWidth={2} className='h-4 w-4' />
      </IconButton>
    </div>
  )
}
