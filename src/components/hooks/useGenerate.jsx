import * as XLSX from 'xlsx'

export const useGenerate = (data, nombreAlumno, titulo) => {
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, titulo);
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, `${nombreAlumno}.xlsx`);
    }

    return { downloadExcel }
}