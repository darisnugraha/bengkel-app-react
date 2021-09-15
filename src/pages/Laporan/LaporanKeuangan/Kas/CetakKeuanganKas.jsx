import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  formatDateISO,
  getToday,
} from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakKeuanganKas = (
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
  let totaldebit = 0;
  let totalkredit = 0;
  doc.setFontSize(15);
  doc.text("LAPORAN KEUANGAN CASH", 14, 15);
  doc.setFontSize(10);
  //   row 2
  doc.text(`Tanggal	: ${(row1isi, row2isi)}`, 14, 20);
  let tableColumn = [
    [
      {
        content: `NO BON`,
      },
      {
        content: `TANGGAL`,
      },
      {
        content: `KATEGORI`,
      },
      {
        content: `DESKRIPSI`,
      },
      {
        content: `DEBIT`,
      },
      {
        content: `KREDIT`,
      },
    ],
  ];

  data.forEach((item, index) => {
    console.log(item);
    let rows = [
      item.no_bon,
      item.tanggal === "-" ? "-" : formatDateISO(item.tanggal) || "",
      item.kategori,
      item.deskripsi,
      parseFloat(item.debet_rp).toLocaleString("id-ID"),
      parseFloat(item.kredit_rp).toLocaleString("id-ID"),
    ];
    tableRows.push(rows);
    totaldebit = totaldebit + item.debet_rp;
    totalkredit = totalkredit + item.kredit_rp;
  });
  let total = [
    "",
    "",
    "",
    "Total",
    parseFloat(totaldebit).toLocaleString("id-ID"),
    parseFloat(totalkredit).toLocaleString("id-ID"),
  ];
  footRows.push(total);
  let saldoakhir = [
    "",
    "",
    "",
    "Saldo Akhir",
    "",
    parseFloat(totaldebit - totalkredit).toLocaleString("id-ID"),
  ];
  footRows.push(saldoakhir);
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    foot: footRows,
    startY: 35,
    theme: "plain",
    // rowPageBreak: "avoid",
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
    title: "LAPORAN KEUANGAN KAS",
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

export default CetakKeuanganKas;
