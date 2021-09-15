import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  formatDateISO,
  getToday,
} from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakKartuHutangSupplier = (row2isi = "", row1isi = "", data) => {
  console.log(row2isi);
  // initialize jsPDF
  const doc = new jsPDF();
  doc.setFontSize(15);
  doc.text("LAPORAN KARTU HUTANG SUPPLIER", 14, 15);
  doc.setFontSize(10);
  doc.text(`Tanggal	: ${row2isi}`, 14, 22);
  doc.text(`Supplier	: ${row1isi}`, 14, 29);
  let tableRows = [];
  let finalY = 40;
  let tableColumn = [
    "TANGGAL",
    "REFF",
    "H.AWAL",
    "BAYAR",
    "SALDO",
    "KETERANGAN",
  ];
  data.forEach((item, index) => {
    doc.setFontSize(10);
    let rows = [
      formatDateISO(item.tanggal),
      item.no_ref,
      parseFloat(item.hutang_awal).toLocaleString("id-ID"),
      parseFloat(item.bayar).toLocaleString("id-ID"),
      parseFloat(item.saldo_hutang).toLocaleString("id-ID"),
      item.keterangan,
    ];
    tableRows.push(rows);
  });
  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    theme: "plain",
    bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
    headStyles: {
      lineWidth: 0.02,
      lineColor: "#000",
      fillColor: [212, 212, 211],
    },
  });
  finalY = doc.lastAutoTable.finalY + 10;

  doc.text(`Printed on	: ${getToday()}`, 14, finalY + 22);

  doc.setProperties({
    title: "LAPORAN KARTU HUTANG SUPPLIER",
  });
  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  x.document.close();
};

export default CetakKartuHutangSupplier;
