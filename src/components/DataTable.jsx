import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


export const DataTable = ({titulo, data, columns, deleteRows }) =>{

    const [state, setState] = useState([]);  
    const dispatch = useDispatch();

    const options = {
        // filterType: 'multiselect',
        responsive: 'standard',
        rowsPerPage: 10,
        filterType: 'dropdown',
        selectableRowsOnClick: true,
        rowsSelected: state.rowsSelected,
        onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
            console.log(rowsSelected);
            dispatch(deleteRows(rowsSelected));
        },
        // onRowClick: (rowData, rowState) => {
        // console.log(rowData, rowState);
        // },
        // onCellClick: (cellData, cellMeta) => {
        //     console.log(cellData, cellMeta);
        //   },
    
    };
    return(
        <MUIDataTable
        title = {titulo}
        data={data}
        columns={columns}
        options={options}
        />
    );
}
