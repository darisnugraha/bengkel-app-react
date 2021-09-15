import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakStockOpname = (row1isi = "", row2isi = "", data) => {
  // initialize jsPDF
  const doc = new jsPDF("landscape");
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows = [];
  let footRows = [];
  let finalY = 40;

  doc.setFontSize(15);
  doc.text("LAPORAN STOCK OPNAME", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`TANGGAL : ${row1isi} s/d ${row2isi}`, 14, 25);
  //   row 2
  //   doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  data.forEach((item, index) => {
    let tableColumn = [
      [
        {
          content: `LOKASI \t: ${item.kode_lokasi_gudang}`,
          colSpan: 2,
        },
        {
          content: `NO STOCK OPNAME\t: ${item.no_stock_opname}`,
          colSpan: 4,
        },
      ],
      [
        {
          content: `KODE_BARCODE`,
        },
        {
          content: `NAMA BARANG`,
        },
        {
          content: `KODE SUPPLIER`,
        },
        {
          content: `STOCK SYSTEM`,
        },
        {
          content: `STOCK FISIK`,
        },
        {
          content: `SELISIH`,
        },
      ],
    ];
    item.detail.forEach((list) => {
      let rows = [
        list.kode_barcode,
        list.nama_barang,
        list.kode_supplier,
        list.stock,
        list.stock_fisik,
        list.selisih,
      ];
      tableRows.push(rows);
    });
    let foot = [
      "",
      "",
      "",
      item.jml_stock,
      item.jml_stock_fisik,
      item.jml_selisih,
    ];
    footRows.push(foot);
    finalY = doc.lastAutoTable.finalY + 10;
    doc.autoTable({
      head: tableColumn,
      body: tableRows,
      foot: footRows,
      startY: index === 0 ? 35 : finalY + 5,
      theme: "plain",
      rowPageBreak: "avoid",
      // pageBreak: "avoid",
      margin: { top: 20 },
      bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
      },
    });
    tableRows = [];
  });

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  // x.document.close();
  // setInterval(() => {
  //   x.close();
  // }, 1000);
};

export default CetakStockOpname;
