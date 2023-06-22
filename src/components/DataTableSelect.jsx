import { FlareSharp, FlashOnRounded } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


export const DataTableSelect = ({titulo, data, columns, selectedRows }) =>{

    const [state, setState] = useState([]);  
    const dispatch = useDispatch();

    const options = {
        // filterType: 'multiselect',
        responsive: 'standard',
        rowsPerPage: 10,        //Establece los renglones por página (10,15,100)
        download: false,        //Muestra el icono para descargar en .CSV
        print: false,           //Muestra el icono de impresión
        viewColumns: false,     //Muestra el icono de la columnas que se desean mostrar
        filter: false,           //Muestra el icono para filtar contenido
        selectedRows: false,
        searchAlwaysOpen: true, //Muestra siempre abierta la opción de búsqueda
        selectableRowsHeader: false,
        selectableRowsHideCheckboxes: true,
        // fixedHeader: false,
        // filterType: 'dropdown',
        selectableRowsOnClick: true,
        rowsSelected: state.rowsSelected,
        onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
            dispatch(selectedRows(rowsSelected));
        },
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
