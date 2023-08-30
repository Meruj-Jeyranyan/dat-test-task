import React, { useState } from 'react';
import './CheckBtn.css';

interface CircleProps {
    size: number;
    label: string;
    active: boolean;
    onClick: (label: string) => void;
}

const CheckBtn: React.FC<CircleProps> = ({ size, label, onClick, active }) => {
    const [isActive, setIsActive] = useState(active);

    const handleClick = () => {
        setIsActive(!isActive);
        onClick(label)
    };

    return (
        <div className='container'>
            <div className="label">{label}</div>
            <div
                className={`circle ${isActive ? 'active' : ''}`}
                style={{
                    width: size,
                    height: size,
                }}
                onClick={handleClick}
            ></div>
        </div>
    );
};

export default CheckBtn;
