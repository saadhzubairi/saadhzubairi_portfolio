import React from 'react'

const Services = ({ data }) => {
    return (
        <div className='services__container'>
            {data.map(item => (
                <div className="skillls__service">
                    <img src={item.img} alt="" className="service__img" />
                    <div className="service__name">{item.name}</div>
                </div>
            ))}
        </div>
    )
}

export default Services