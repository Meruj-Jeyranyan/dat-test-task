import React, { useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { createEffect, createEvent, createStore } from 'effector';
import CheckBtn from '../CheckBtn/CheckBtn';
import car from "../../assets/car.png"
import './CarDamageShow.css';

interface PluginOptions {
    initializedOptions: string[];
    onPositionChange: (positions: string[]) => void;
    onComplete: (positions: string[]) => void;
    onInit: () => void;
}

const CarDamageShow: React.FC<{ options: PluginOptions }> = ({ options }) => {
    const { initializedOptions, onInit, onPositionChange, onComplete } = options;

    useEffect(() => {
        if (onInit) {
            onInit();
        }
    }, [initializedOptions]);

    const fetchPositionsFx = createEffect<void, string[]>(async () => {
        const response = await axios.get('https://myfailemtions.npkn.net/b944ff/');
        return response.data
    });

    const sendPositionsFx = createEffect<string[], void, Error>(async (positions) => {
        await axios.post('https://myfailemtions.npkn.net/b944ff/', positions);
    });

    const positionClicked = createEvent<{ value: string; active: boolean }>();
    const getPosition = (latter, from, to) => {
        const obj = []
        while (from <= to) {
            const key = `${latter}-${from}`;
            obj.push({ value: key, active: initializedOptions.includes(key) });
            from++
        }
        return obj;
    };

    const defaultOptions = useMemo(() => [
        getPosition('A', 1, 4),
        getPosition('B', 1, 2),
        getPosition('B', 3, 3),
        getPosition('B', 4, 5),
        getPosition('C', 1, 4)
    ], []);

    const getStore = (state) => createStore(defaultOptions.flat())

    const $store = getStore(initializedOptions.map(getPosition))

    $store.on(positionClicked, (state, position) => {
        position.active = !position.active;
        const activeValues = [...state].filter(item => item.active).map(item => item.value);
        onPositionChange(activeValues)
        return state;
    });

    const handleClickSendReq = useCallback(() => {
        const activeValues = $store.getState().filter(item => item.active).map(item => item.value);
        sendPositionsFx(activeValues)
        onComplete(activeValues);
    }, [$store, onComplete, sendPositionsFx]);

    const handleClickReset = useCallback(() => {
        sendPositionsFx([])
        onComplete([]);
    }, [onComplete, sendPositionsFx]);


    return (
        <div className='container'>
            <img src={car} alt='car-photo' className='car-img' />
            {defaultOptions.map((row, index) => (
                <div className={`plugin-container group-${index}`} key={`group-${index}`}>
                    {row.map((position) => (
                        <CheckBtn
                            size={25}
                            key={position.value}
                            label={position.value}
                            active={position.active}
                            onClick={() => positionClicked(position)}
                        />
                    ))}
                </div>
            ))}
            <div>
                <button className='submit-button' onClick={handleClickSendReq}>Rapporto danni</button>
                <button className='reset-button' onClick={handleClickReset}>Reset</button>
            </div>
        </div>
    );
};

export default CarDamageShow;
