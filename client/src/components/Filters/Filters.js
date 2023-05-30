import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterCreated, orderName, filterType, filterStr } from "../Redux/actions";
import Search from "../Search/Search";
import Style from '../Filters/Filters.module.css'


const Filters = ({setCurrentPage, setOrder}) => {

    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }

    const handleOrderName = (e) => {
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterType(e.target.value)); 
        setCurrentPage(1);
    };

    const handleFilterStr = (e) => {
        e.preventDefault();
        dispatch(filterStr(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    return (
        <div  className={Style.div}>
            <div>
                <Search/>
            </div>
            <div>
                <h3 className={Style.h3}>Filters</h3>
                <label className={Style.label}>Created - Api</label>
                <select className={Style.select} onChange={e => {handleFilterCreated(e)}}>
                    <option value='all'>ALL</option>
                    <option value='api'>API</option>
                    <option value='db'>CREATED</option>
                </select>

                <label className={Style.label}>Types</label>
                <select className={Style.select} onChange={e => {handleFilterType(e)}}>
                    <option value='all'>ALL</option>
                    {
                        allTypes?.map((e, k) => {
                            return(
                                <option key={k} value={e}> {e} </option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <h3 className={Style.h3}>Order</h3>
                    <label className={Style.label}>Strenght</label>
                <select className={Style.select} onChange={e => {handleFilterStr(e)}} >
                    <option>-</option>
                    <option value="asc" onClick={e => {handleFilterStr(e)}}>ASC</option>
                    <option value="desc" onClick={e => {handleFilterStr(e)}}>DESC</option>
                </select>
                <label className={Style.label}>Alphabetically</label>
                <select className={Style.select} onChange={e=> {handleOrderName(e)}}>
                    <option>-</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
            </div>
        </div>
    )

}

export default Filters;