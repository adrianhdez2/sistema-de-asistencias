import { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [filters, setFilters] = useState(() => {
        const storedFilters = localStorage.getItem("filters");
        return storedFilters ? JSON.parse(storedFilters) : { type: 'all' };
    });

    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters));
    }, [filters]);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
}