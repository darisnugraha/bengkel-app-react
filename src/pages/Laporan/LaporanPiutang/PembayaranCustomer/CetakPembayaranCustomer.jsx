import jsPDF from "jspdf";
import "jspdf-autotable";
import Moment from "moment";
// Date Fns is used to format the dates we receive

// define a generatePDF function that accepts a tickets argument
const CetakPembayaranPiutang = (tgl_awal, tgl_akhir, data) => {
  // initialize jsPDF
  const doc = new jsPDF("landscape");
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows = [];
  let footRows = [];
  let total = 0;
  let tglawal = Moment(tgl_awal).format('DD/MM/YYYY');
  let tglakhir = Moment(tgl_akhir).format('DD/MM/YYYY');
  let tableColumn = [
    [
      {
        content: `NO FAKTUR JUAL`,
      },
      {
        content: `NAMA CUSTOMER`,
      },
      {
        content: `TANGGAL BAYAR`,
      },
      {
        content: `NO FAKTUR BAYAR`,
      },
      // {
      //   content: `PIUTANG AWAL`,
      // },
      {
        content: `BAYAR`,
      },
      {
        content: `TOTAL BAYAR`,
      },
    ],
  ];
  doc.setFontSize(15);
  doc.text("LAPORAN PEMBAYARAN PIUTANG", 14, 15);
  doc.setFontSize(10);
  //row 1
  doc.text(`TANGGAL : ${tglawal} s/d ${tglakhir}`, 14, 25);
  //   row 2
  //   doc.text(`Tanggal	: ${row2isi}`, 120, 25);
  data.forEach((item, index) => {
    let tglbayar = Moment(item.tanggal_bayar).format('DD/MM/YYYY');
    let rows = [
      item.no_nota,
      item.nama_customer,
      tglbayar,
      item.no_faktur_bayar,
      // item.no_nota,
      item.jenis_pembayaran,
      parseFloat(item.total_bayar).toLocaleString("id-ID"),
    ];
    tableRows.push(rows);
    total = total + parseFloat(item.total_bayar);
  });

  let foot = [
    "",
    "",
    "",
    "",
    // "",
    "Grand Total",
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

  doc.setProperties({
    title: "LAPORAN PEMBAYARAN PIUTANG",
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

export default CetakPembayaranPiutang;
