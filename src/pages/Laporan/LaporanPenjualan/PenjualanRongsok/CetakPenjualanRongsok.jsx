import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDateISO } from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakPenjualanRongsok = (row1isi = "", row2isi = "", data) => {
  // initialize jsPDF
  const doc = new jsPDF("landscape");
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows = [];
  let footRows = [];
  let total = 0;
  let tableColumn = [
    [
      {
        content: `TANGGAL`,
      },
      {
        content: `NO FAKTUR`,
      },
      {
        content: `NAMA BARANG`,
      },
      {
        content: `QTY`,
      },
      {
        content: `SATUAN`,
      },
      {
        content: `HARGA`,
      },
      {
        content: `TOTAL`,
      },
    ],
  ];
  doc.setFontSize(15);
  doc.text("LAPORAN PENJUALAN RONGSOK", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`TANGGAL : ${row1isi} s/d ${row2isi}`, 14, 25);
  //   row 2
  //   doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  data.forEach((item, index) => {
    let rows = [
      formatDateISO(item.tanggal),
      item.no_faktur_jual,
      item.nama_barang,
      item.qty,
      item.satuan,
      parseFloat(item.harga_satuan).toLocaleString("id-ID"),
      parseFloat(item.harga_total).toLocaleString("id-ID"),
    ];
    tableRows.push(rows);
    total = total + parseFloat(item.harga_total);
  });
  let foot = [
    "",
    "",
    "",
    "",
    "",
    "Total",
    `${parseFloat(total).toLocaleString("id-ID")}`,
  ];
  footRows.push(foot);
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

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  doc.setProperties({
    title: "LAPORAN PENJUALAN RONGSOK",
  });
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

export default CetakPenjualanRongsok;
