import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakKartuStock = (
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
  let finalY = 30;
  let sub_qty = 0;
  let tableColumn = [];
  doc.setFontSize(15);
  doc.text("LAPORAN KARTU STOCK", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`Tanggal : ${row1isi} s/d ${row2isi}`, 14, 20);
  //   row 2
  // doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  data.forEach((item) => {
    tableColumn = [
      [
        {
          content: `NAMA BARANG : ${item.nama_barang}`,
          colSpan: 3,
        },
        {
          content: `LOKASI : GUDANG`,
          colSpan: 3,
        },
      ],
      [
        {
          content: `TANGGAL`,
        },
        {
          content: `NO BON`,
        },
        {
          content: `KETERANGAN`,
        },
        {
          content: `MASUK`,
        },
        {
          content: `KELUAR`,
        },
        {
          content: `SALDO`,
        },
      ],
    ];
    tableRows = [];
    item.detail.forEach((detail) => {
      sub_qty += detail.saldo_barang;
      tableRows.push([
        detail.tanggal,
        detail.no_bon,
        detail.keterangan,
        detail.masuk_qty,
        detail.keluar_qty,
        detail.saldo_barang,
      ]);
    });

    let footer = ["", "", "", "", "Sub Total", `${sub_qty}`];
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
    finalY = doc.autoTableEndPosY() + 5;
    tableRows = [];
    footRows = [];
    sub_qty = 0;
  });
  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

  doc.text(`User	: ${username}`, 14, finalY);
  doc.text(`Cetak	: ${tanggal}`, 14, finalY + 5);
  doc.text(`Valid	: ${validby}`, 14, finalY + 10);
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
    title: "LAPORAN KARTU STOCK",
  });
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  // setInterval(() => {
  //   x.close();
  // }, 1000);
};

export default CetakKartuStock;
