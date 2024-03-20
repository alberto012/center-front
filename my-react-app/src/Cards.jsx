import React from 'react'

function Card({item}) {
  return (
    <>
   
    <section className='hover:scale-110 transition-all duration-150 ease-in'>
       
    <div>
            <video
              src={item.video}
              autoPlay
              loop
              playsInline
              muted
              className='absolute z-0 top-0 rounded-md opacity-0 hover:opacity-50'
            />
            <img src={item.image} alt={`Imagen de ${item.id}`} className='w-auto z-[1] opacity-100' />
    <h2 className='w-[110px] md:w-[260px] text-white
    mt-2'>{item.title}</h2>
          </div>
    </section>

    </>
  )
}

export default Card