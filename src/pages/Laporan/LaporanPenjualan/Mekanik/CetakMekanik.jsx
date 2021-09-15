import jsPDF from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakMekanik = (
  row1isi = "",
  row2isi = "",
  data
) => {
  // initialize jsPDF
  const doc = new jsPDF();
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  doc.setFontSize(15);
  doc.text("LAPORAN MEKANIK", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`TANGGAL : ${row1isi}`, 14, 25);
  doc.text(`MEKANIK : ${row2isi}`, 14, 30);
  //   row 2
  //   doc.text(`Tanggal	: ${row2isi}`, 120, 25);

  let tableRows = [];

  let sub_total = 0;
  let tableColumn = [
    [
      {
        content: `TANGGAL`,
      },
      {
        content: `MEKANIK`,
      },
      {
        content: `NOMOR FAKTUR`,
      },
      {
        content: `KETERANGAN`,
      },
      {
        content: `TOTAL`,
      },
    ],
  ];
  data.forEach((barang, index) => {
    let tglisi = Moment(barang.tanggal).format('DD/MM/YYYY');
    let rows = [
      tglisi,
      barang.mekanik,
      barang.no_faktur,
      barang.jenis_service,
      parseFloat(barang.total).toLocaleString("id-ID"),
    ];
    sub_total = sub_total + parseFloat(barang.total);
    tableRows.push(rows);
    console.log(tableRows);

    sub_total = 0;
  });
  doc.autoTable({
    head: tableColumn,
    body: tableRows,
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

  // doc.text(`User	: ${username}`, 14, finalY + 10);
  // doc.text(`Cetak	: ${tanggal}`, 14, finalY + 16);
  // doc.text(`Valid	: ${validby}`, 14, finalY + 22);

  // doc.autoPrint();
  // doc.save(`${title}_${dateStr}.pdf`);
  doc.setProperties({
    title: "LAPORAN MEKANIK",
  });
  var string = doc.output("datauristring");
  var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
  var x = window.open();
  x.document.open();
  x.document.write(embed);
  x.document.close();
};

export default CetakMekanik;
