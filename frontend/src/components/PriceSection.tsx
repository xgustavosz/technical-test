'use client';

import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

export default function PriceSection() {
    const [values, setValues] = useState([0, 10000]);
    const MIN = 0;
    const MAX = 10000;

    const handleChange = (values: number[]) => {
        setValues(values);
    };

    return (
        <div className="w-full max-w-[290px] min-h-[184px] p-4 gap-2 bg-[#F9FAFB] rounded-t-lg">
            <div className="w-full max-w-[258px] h-auto min-h-[152px] rounded-lg p-4 gap-4 bg-white">
                <p className="font-semibold mb-4 text-base sm:text-lg">Preço</p>
                <Range
                    values={values}
                    step={1}
                    min={MIN}
                    max={MAX}
                    onChange={handleChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="h-1 w-full rounded-lg"
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', '#FF7600', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            className="h-4 w-4 rounded-full bg-primary-orange shadow-md"
                        />
                    )}
                />
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <input
                        type="number"
                        placeholder="Mínimo"
                        value={values[0]}
                        min={MIN}
                        max={values[1]}
                        onChange={(e) =>
                            setValues([Math.min(Number(e.target.value), values[1]), values[1]])
                        }
                        className="bg-gray-100 text-sm px-4 h-10 w-full sm:w-[calc(50%-8px)] rounded-lg focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Máximo"
                        value={values[1]}
                        min={values[0]}
                        max={MAX}
                        onChange={(e) =>
                            setValues([values[0], Math.max(Number(e.target.value), values[0])])
                        }
                        className="bg-gray-100 text-sm px-4 h-10 w-full sm:w-[calc(50%-8px)] rounded-lg focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
