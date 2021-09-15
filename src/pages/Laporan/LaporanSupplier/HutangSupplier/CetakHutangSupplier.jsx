import jsPDF from "jspdf";
import "jspdf-autotable";
import { getToday } from "../../../../components/notification/function";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakHutangSupplier = (row2isi = "", data) => {
  // initialize jsPDF
  const doc = new jsPDF();
  doc.setFontSize(15);
  doc.text("LAPORAN HUTANG SUPPLIER", 14, 15);
  doc.setFontSize(10);
  doc.text(`Tanggal	: ${row2isi}`, 14, 22);
  let tableRows = [];
  let finalY = 40;
  let sub_total = 0;
  let tableColumn = [
    "KODE SUPPLIER",
    "NAMA SUPPLIER",
    "ALAMAT",
    "SALDO HUTANG",
  ];
  data.forEach((item, index) => {
    doc.setFontSize(10);
    let rows = [
      item.kode_supplier,
      item.nama_supplier,
      item.alamat_supplier,
      `${parseFloat(item.saldo_hutang).toLocaleString("id-ID")}`,
    ];
    sub_total = sub_total + parseFloat(item.saldo_hutang);
    tableRows.push(rows);
    let footer = [
      "",
      "",
      "Total : ",
      parseInt(sub_total).toLocaleString("id-ID"),
    ];
    tableRows.push(footer);
    doc.autoTable(tableColumn, tableRows, {
      startY: index === 0 ? 30 : finalY,
      theme: "plain",
      bodyStyles: { lineWidth: 0.02, lineColor: "#000" },
      headStyles: {
        lineWidth: 0.02,
        lineColor: "#000",
        fillColor: [212, 212, 211],
      },
    });
    finalY = doc.lastAutoTable.finalY + 10;
    tableRows = [];
    sub_total = 0;
  });

  doc.text(`Printed on	: ${getToday()}`, 14, finalY + 22);

  doc.setProperties({
    title: "LAPORAN HUTANG SUPPLIER",
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

export default CetakHutangSupplier;
