import React from 'react'

const Programming = ({data}) => {
    return (
        <div className='skills_seciton_container'>
            <div className="skills__heading">Programming</div>
            <div className="grid-container">

                {data.map(item => (
                    <div key={item.name} className="skills__data">
                        <img src={item.image} alt="" className="skill__icon" />
                        <div>
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