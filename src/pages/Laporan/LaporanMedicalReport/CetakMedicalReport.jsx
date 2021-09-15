import jsPDF from "jspdf";
import "jspdf-autotable";
import { getToday } from "../../../components/notification/function";
import { getUserData } from "../../../components/notification/notification";
import Moment from "moment";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakMedicalReport = (row1isi = "", row2isi = "", row3isi = "", data) => {
  console.log(row3isi);
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows = [];
  let finalY = 40;
  let tableColumn = [
    [
      {
        content: `TANGGAL`,
      },
      {
        content: `KM`,
      },
      {
        content: `KETERANGAN SERVICE`,
      },
      {
        content: `SPAREPART`,
      },

      {
        content: `QTY`,
      },

      {
        content: `SATUAN`,
      },

      {
        content: `MEKANIK`,
      },
    ],
  ];
  doc.setFontSize(15);
  doc.text("MEDICAL REPORT", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`Tanggal : ${row1isi} s/d ${row2isi}`, 14, 25);
  doc.text(`Nomor Polisi : ${row3isi}`, 14, 30);
  data.forEach((item, index) => {
    let tgl = Moment(item.tanggal).format("DD/MM/YYYY");
    let rows = [
      tgl,
      item.km,
      item.keterangan_service,
      item.sparepart,
      item.qty,
      item.satuan,
      item.mekanik,
    ];
    tableRows.push(rows);
  });
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: 35,
    theme: "plain",
    rowPageBreak: "avoid",
    margin: { top: 20 },
    bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
    headStyles: {
      lineWidth: 0.02,
      lineColor: "#000",
      fillColor: [212, 212, 211],
    },
  });
  finalY = doc.autoTableEndPosY() + 10;

  doc.text(`User	: ${getUserData().user_name}`, 14, finalY + 10);
  doc.text(`Cetak	: ${getToday()}`, 14, finalY + 16);
  doc.text(`Valid	: ${getUserData().user_name}`, 14, finalY + 22);
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
    title: "LAPORAN MEDICAL REPORT",
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

export default CetakMedicalReport;
