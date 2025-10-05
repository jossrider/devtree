import type { Handle, SocialNetwork } from '../types'

type Props = {
  data: Handle
}

export default function HandleData({ data }: Props) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled === true)

  return (
    <div className='space-y-6 text-white'>
      <p className='text-5xl font-black text-center'>{data.handle}</p>
      {data.image && <img src={data.image} className='max-w-[180px] mx-auto' />}
      <p className='text-lg font-bold text-center'>{data.description}</p>
      <div className='mt-20 flex flex-col gap-6'>
        {links.length ? (
          links.map((link) => (
            <a key={link.id} href={link.url} target='_blank' rel='noreferrer noopener' className='bg-white px-5 py-2 items-center gap-5 rounded-lg flex'>
              <img className='w-12' src={`/social/icon_${link.name}.svg`} alt="imagen red social" />
              <p className='text-black capitalize font-bold text-lg'>Visita mi: {link.name}</p>
            </a>
          ))
        ) : (
          <p className='text-center'>No hay enlaces activos!!</p>
        )}
      </div>
    </div>
  )
}
