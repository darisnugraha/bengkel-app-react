import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  formatDateISO,
  getToday,
} from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakReturnSupplierRekap = (
  row1isi = "",
  row2isi = "",
  username = "",
  tanggal = "",
  validby = "",
  data
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows = [];
  let footRows = [];
  let qty = 0;

  let tableColumn = [
    [
      {
        content: `FAKTUR`,
      },
      {
        content: `TANGGAL TERIMA`,
      },
      {
        content: `NO BON`,
        styles: { cellWidth: 20 },
      },
      {
        content: `KODE SUPPLIER`,
      },
      {
        content: `ITEM`,
      },
      {
        content: `QTY`,
      },
      {
        content: `TOTAL`,
      },
      {
        content: `DISKON`,
      },
      {
        content: `BERSIH`,
      },
    ],
  ];
  doc.setFontSize(15);
  doc.text("LAPORAN REKAP RETURN SUPPLIER", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`Supplier : ${row1isi}`, 14, 25);
  //   row 2
  doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  data.forEach((item, index) => {
    item.detail_barang.forEach((hasil) => {
      qty = qty + hasil.qty;
    });
    let rows = [
      item.no_retur_supplier,
      formatDateISO(item.tanggal_retur) || "",
      item.no_bon,
      item.kode_supplier,
      Object.keys(item.detail_barang).length,
      qty,
      parseFloat(item.jml_bruto_rp).toLocaleString("id-ID"),
      parseFloat(item.diskon_rp).toLocaleString("id-ID"),
      parseFloat(item.jml_netto_rp).toLocaleString("id-ID"),
    ];
    tableRows.push(rows);
    console.log(tableRows);
    qty = 0;
  });
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    foot: footRows,
    startY: 35,
    theme: "plain",
    rowPageBreak: "avoid",
    pageBreak: "avoid",
    margin: { top: 20 },
    bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
    headStyles: {
      lineWidth: 0.02,
      lineColor: "#000",
      fillColor: [212, 212, 211],
    },
  });
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Print on	: ${getToday()}`, 14, finalY + 10);
  //   doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
  //   doc.text(`Valid	: ${validby}`, 14, finalY + 22);
  const pages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width; //Optional
  const pageHeight = doc.internal.pageSize.height; //Optional
  doc.setFontSize(10); //Optional
  for (let j = 1; j < pages + 1; j++) {
    let horizontalPos = pageWidth / 2; //Can be fixed number
    let verticalPos = pageHeight - 10; //Can be fixed number
    doc.setPage(j);
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: "center",
    });
  }
  doc.autoPrint();
  // doc.save(`PenerimaanSUpplier.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  // setInterval(() => {
  //   x.close();
  // }, 1000);
};

export default CetakReturnSupplierRekap;
