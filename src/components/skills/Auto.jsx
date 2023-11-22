import React from 'react'

const Programming = ({header,data}) => {
    return (
        <div className='skills_seciton_container'>
            <div className="skills__heading">{header}</div>
            <div className="grid-container">

                {data.map(item => (
                    <div key={item.name} className="skills__data">
                        <img src={item.image} alt="" className="skill__icon" />
                        <div className='skills__name__and__level'>
                            <h3 className="skills_name">{item.name}</h3>
                            <span className="skills__level">{item.diff}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programming