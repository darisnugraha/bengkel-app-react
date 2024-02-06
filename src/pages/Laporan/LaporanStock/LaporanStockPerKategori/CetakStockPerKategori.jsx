import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakStockPerKategori = (
  row1isi = "",
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
  let finalY = 35;
  let sub_qty = 0;

  doc.setFontSize(15);
  doc.text("LAPORAN STOCK PER KATEGORI", 14, 15);
  doc.setFontSize(10);

  //row 1
  // doc.text(`Tanggal : ${row1isi}`, 14, 25);
  //   row 2
  // doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  let tableColumn = [
    [
      {
        content: `KODE JENIS`,
      },
      {
        content: `AWAL`,
      },
      {
        content: `TAMBAH`,
      },
      {
        content: `RETUR CUST`,
      },

      {
        content: `JUAL`,
      },
      {
        content: `RETUR STOCK`,
      },
      {
        content: `MEKANIK`,
      },
      {
        content: `KELUAR`,
      },
      {
        content: `AKHIR`,
      },
    ],
  ];
  data.forEach((barang, index) => {
    let rows = [
      barang.kode_jenis,
      barang.awal_qty,
      barang.tambah_qty,
      barang.retcust_qty,
      barang.jual_qty,
      barang.retstock_qty,
      barang.mekanik_qty,
      barang.keluar_qty,
      barang.akhir_qty,
    ];
    sub_qty = sub_qty + parseInt(barang.qty);
    tableRows.push(rows);
    console.log(tableRows);
  });
  let footer = [];
  footRows.push(footer);
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    foot: footRows,
    startY: finalY,
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
  finalY = doc.autoTableEndPosY() + 10;
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  doc.text(`User	: ${username}`, 14, finalY + 10);
  doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
  doc.text(`Valid	: ${validby}`, 14, finalY + 22);
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
  doc.setProperties({
    title: "LAPORAN STOCK PER KATEGORI",
  });
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

export default CetakStockPerKategori;
