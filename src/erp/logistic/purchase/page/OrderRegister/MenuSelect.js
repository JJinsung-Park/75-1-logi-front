import React from 'react';
import { MenuItem } from "@material-ui/core";
import Select from "@mui/material/Select"
const MenuSelect = ({ selectValue, selectLabel, selectonChange, menuItemMap, selectName }) => {

    const menuItemList = menuItemMap.map(
        (o) => {
            return <MenuItem value={o.value}>{o.key}</MenuItem>
        }
    )



    return (
        <>
            <Select
                name={selectName}
                value={selectValue}
                onChange={selectonChange}
                label={selectLabel}
            >
                {menuItemList}
            </Select>
        </>
    )
}

export default MenuSelect;